import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import currentUser from '../utils/user'

let component;
let mockHandler;

const user = {
  username: "Root",
  name: "Admin",
  id: "1",
};

const blogs = [{
  author: 'Peter',
  title: 'Best blog ever',
  url: 'www.thebest.com',
  likes: 2,
  user: user
}]

const [blog] = blogs;

describe("Testing the Blog component", () => {

  beforeEach(() => {
    currentUser.setCurrentUser({
      token: '12345'
    })
    mockHandler = jest.fn()
    component = render(<Blog blog={blog} blogs={blogs} setBlogs={mockHandler} />);
  });

  test("renders title and hides author, likes and url by default", () => {
    const title = component.container.querySelector(".title");
    const author = component.container.querySelector(".author");
    const url = component.container.querySelector(".url");
    const likes = component.container.querySelector(".likes");

    expect(title).toHaveTextContent(blog.title);
    expect(author).toBeNull();
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test("renders all when show button is clicked", () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const title = component.container.querySelector(".title");
    const author = component.container.querySelector(".author");
    const url = component.container.querySelector(".url");
    const likes = component.container.querySelector(".likes");

    expect(title).toHaveTextContent(blog.title);
    expect(author).toHaveTextContent(blog.author);
    expect(url).toHaveTextContent(blog.url);
    expect(likes).toHaveTextContent(blog.likes);
  });

  test("calls the setBlogs each time a like button is clicked", () => {
    const button = component.getByText('View')
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(0);
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2);
  });

});