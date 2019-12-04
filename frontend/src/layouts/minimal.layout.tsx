import React from 'react';

const Minimal: React.FC = props => {
  const {children} = props;

  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Minimal;
