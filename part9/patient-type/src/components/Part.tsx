import React from "react";

import { CoursePart } from '../types'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const switchParts = (course: CoursePart) => {
  switch (course.name) {
    case "Fundamentals":
      console.log(course)
      return `${course.name} ${course.description} ${course.exerciseCount}`
    case "Using props to pass data":
      return `${course.name} ${course.groupProjectCount} ${course.exerciseCount}`
    case "Deeper type usage":
      return `${course.name} ${course.description} ${course.exerciseSubmissionLink} ${course.exerciseCount}`
    case "So deep":
      return `${course.name} ${course.description} ${course.whatEvenIsThisProp}`
    default:
      return assertNever(course)
  }
}

const Part: React.FC<{ course: CoursePart }> = ({ course }) => {
  return (
    <div>
      {switchParts(course)}
    </div>
  );
};

export default Part