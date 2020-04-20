import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'
import currentUser from '../utils/user'

describe("Testing the BlogForm component", () => {

  test("the right props are returned when submitted", () => {
    currentUser.setCurrentUser({
      token: '12345'
    })
    const handleBlogSubmitMockHandler = jest.fn()
    const toggleShowBlogFormMockHandler = jest.fn()
    const component = render(<BlogForm handleBlogSubmit={handleBlogSubmitMockHandler} toggleShowBlogForm={toggleShowBlogFormMockHandler} />);
  
    const form = component.container.querySelector("form");
    const title = component.container.querySelector(".title");
    const author = component.container.querySelector(".author");
    const url = component.container.querySelector(".url");

    fireEvent.change(title, {
      target: { value: "The best book number 2" },
    });
    fireEvent.change(author, {
      target: { value: "Peter" },
    });
    fireEvent.change(url, {
      target: { value: "www.thebest.com" },
    });
    fireEvent.submit(form);

    expect(handleBlogSubmitMockHandler.mock.calls[0][0].title).toBe("The best book number 2");
    expect(handleBlogSubmitMockHandler.mock.calls[0][0].author).toBe("Peter");
    expect(handleBlogSubmitMockHandler.mock.calls[0][0].url).toBe("www.thebest.com");
    expect(handleBlogSubmitMockHandler.mock.calls).toHaveLength(1);
  });

});