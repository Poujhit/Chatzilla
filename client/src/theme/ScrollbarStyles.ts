export const scrollBarStyle = () => ({
  '*::-webkit-scrollbar': {
    width: '10px',
  },
  '*::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '*::-webkit-scrollbar-thumb': {
    background: '#C2C0C0',
    borderRadius: '10px',
    '&:hover': {
      background: '#7C7A7A',
    },
  },
  // changing the styling of emoji picker
  '.EmojiPickerReact.epr-dark-theme': {
    position: 'absolute !important',
    zIndex: 5,
    bottom: '18%',
    right: '10%',
  },
});
