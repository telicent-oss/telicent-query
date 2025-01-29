import { TeliButton } from '@telicent-oss/ds';
import React, { useState } from 'react';

const ScrollToTop = () => {
  const [hovered, setHovered] = useState(false);
  const onClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <TeliButton
      style={{
        position: 'fixed',

        bottom: '25px',
        right: '50px',
        backgroundColor: hovered ? 'rgba(255, 162, 47, 0.75)' : 'rgba(255, 162, 47, 0.2)',
        padding: '12px',
        borderRadius: '16px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      Return to top
    </TeliButton>
  );
};

export default ScrollToTop;
