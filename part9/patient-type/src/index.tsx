import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import { CoursePart } from './types'

const courseName: string = "Half Stack application development";
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  }
];

ReactDOM.render(<App courseName={courseName} courseParts={courseParts} />, document.getElementById("root"));