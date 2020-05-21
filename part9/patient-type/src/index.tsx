import React from "react";
import ReactDOM from "react-dom";
import App from './App'

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface AppProps {
  courseName: string;
  courseParts: Array<CoursePart>
}



const courseName = "Half Stack application development";
const courseParts = [
  {
    name: "Fundamentals",
    exerciseCount: 10
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14
  }
];

ReactDOM.render(<App courseName={courseName} courseParts={courseParts} />, document.getElementById("root"));