import React from "react";
import Part from './Part'
import { CoursePart } from '../types'

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => {
 

  return (
    <div>
      {courseParts.map(part => (
          <Part key={part.name} course={part} />
      ))}
    </div>
  );
};

export default Content