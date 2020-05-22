export interface AppProps {
  courseName: string;
  courseParts: Array<CoursePart>
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CourseWithDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends CourseWithDescription {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CourseWithDescription {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CourseWithDescription {
  name: "So deep";
  whatEvenIsThisProp: string;
}


export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;