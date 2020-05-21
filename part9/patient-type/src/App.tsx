import React from "react";
import { AppProps } from './index'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const App: React.FC<AppProps> = ({ courseName, courseParts }) => {

  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
  
  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total total={total} />
    </div>
  )
};

export default App