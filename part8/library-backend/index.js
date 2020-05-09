const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://part8:io0GPCAobbl7kk8V@cluster0-lu1eo.mongodb.net/books-app?retryWrites=true&w=majority'

const JWT_SECRET = 'MY_SUPER_SECRET_KEY'

mongoose.set('useCreateIndex', true)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookcount: Int!
    born: Int
    id: ID!
  }

  type Query {
    bookCount : Int!
    authorCount : Int!
    allBooks(author: String, genre: String) : [Book!]!
    allAuthors : [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

      if (!args.author && !args.genre) {
        const allBooks = await Book.find({})
        return getAuthorDetails(allBooks)
      }

      else if (!args.author && args.genre) {
        const allBooks = await Book.find({ genres: { $in: args.genre } })
        return getAuthorDetails(allBooks)
      }

      /* Filter by author only */
      else if (args.author && !args.genre) {
        const authorId = await authorNameToId(args.author)
        const allBooks = await Book.find({ author: { $in: [authorId] } })
        return getAuthorDetails(allBooks)
      }

      /* filter by author & genre */
      else if (args.author && args.genre) {
        const authorId = await authorNameToId(args.author)
        const allBooks = await Book.find({
          author: { $in: [authorId] },
          genres: { $in: args.genre }
        })
        return getAuthorDetails(allBooks)
      }
    },
    allAuthors: (root, args) => Author.find({}).populate('books'),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookcount: (root) => Book.countDocuments({ author: { $in: root.id } })
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('Not Authenticated, please sign in')
      }

      let author = await Author.findOne({ name: args.author })
      
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const book = new Book({ ...args, author })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
  
      return book
    },
    editAuthor: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('Not Authenticated, please sign in')
      }

      let author = await Author.findOne({ name: args.name })
      
      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const authorNameToId = async (name) => {
  const authorByName = await Author.findOne({ name: name })
  if (authorByName === null) { return null }
  else { return authorByName._id }
}

const getAuthorDetails = (booklist) => {
  return booklist.map(book => {
    const { title, published, genres, author } = book
    return {
      title,
      published,
      genres,
      author: Author.findById(author)
    }
  })
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})