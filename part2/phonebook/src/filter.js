import React from 'react'

const Filter = ({ filter, handleFilter }) => (
  <form>
      <div>filter shown with: <input type="text" value={filter} onChange={(e) => handleFilter(e.target.value)} /></div>
  </form>
);

export default Filter;