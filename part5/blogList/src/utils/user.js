const setCurrentUser = user => window.localStorage.setItem('blog-list-user', JSON.stringify(user))
const getCurrentUser = () => JSON.parse(window.localStorage.getItem('blog-list-user'))
const removeCurrentUser = () => window.localStorage.removeItem('blog-list-user')

export default { setCurrentUser, getCurrentUser, removeCurrentUser }