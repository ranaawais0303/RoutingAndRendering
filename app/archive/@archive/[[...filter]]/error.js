"use client";
//it's a client component because it may be occured not only server but client
const FilterError = ({ error }) => {
  return (
    <div id="error">
      <h2>An error occured</h2>
      <p>{error.message}</p>
    </div>
  );
};

export default FilterError;
