export const scrollBarStyle = () => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '10px',
      color: '#ffffff',
    },
    '*::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '*::-webkit-scrollbar-thumb': {
      background: 'transparent',
      '&:hover': {
        background: '#4A4A4A',
      },
    },
  },
});
