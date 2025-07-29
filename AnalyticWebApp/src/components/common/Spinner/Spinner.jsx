// ../Spinner/Spinner.jsx
import React from 'react';

const Spinner = ({ size = 30, color = "border-blue-500" }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${color}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  );
};

export default Spinner;
