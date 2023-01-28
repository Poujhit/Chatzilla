export const scrollBarStyle = () => ({
  '*::-webkit-scrollbar': {
    width: '10px',
  },
  '*::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '*::-webkit-scrollbar-thumb': {
    background: '#C2C0C0',
    'border-radius': '10px',
    '&:hover': {
      background: '#7C7A7A',
    },
  },
});
