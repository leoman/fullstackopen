import React from "react";

const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return (
    <div>
      {courseName}
    </div>
  )
};

export default Header