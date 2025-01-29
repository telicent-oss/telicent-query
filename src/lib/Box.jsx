import React from 'react';
import classNames from 'classnames';

const Box = ({ children }) => (
  <div
    className={classNames('bg-black-300 bg-opacity-95', {
      'p-2': Boolean(children.type() !== null),
    })}
  >
    {children}
  </div>
);

export default Box;
