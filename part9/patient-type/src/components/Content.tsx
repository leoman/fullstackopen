import React from "react";

import { CoursePart } from '../index'

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => {
 

  return (
    <div>
      {courseParts.map(part => (
        <p>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content