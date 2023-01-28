import React from 'react';

interface BottomBarProps {}

const BottomBar: React.FC<BottomBarProps> = () => {
  return (
    <div
      style={{
        position: 'fixed',
        color: 'white',
        left: '50%',
        cursor: 'pointer',
        bottom: '20px',
        transform: 'translate(-50%, -50%)',
        margin: '0 auto',
      }}
      onClick={() => {
        window.open(
          'https://www.github.com/Poujhit',
          '_blank',
          'noopener,noreferrer'
        );
      }}
    >
      Made by Poujhit
    </div>
  );
};
export default BottomBar;
