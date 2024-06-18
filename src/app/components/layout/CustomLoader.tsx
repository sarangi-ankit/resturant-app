import React from 'react';

const CustomLoader = () => {
  return (
    <div className="loader__wrap" role="alertdialog" aria-busy="true" aria-live="polite" aria-label="Loading…">
      <div className="loader" aria-hidden="false">
        <div className="loader__sq"></div>
        <div className="loader__sq"></div>
      </div>
    </div>
  );
};

export default CustomLoader;
