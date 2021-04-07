import ScrollToBottom from 'react-scroll-to-bottom';

import './Scroll.css';

const ScrollingComponent = ({ children }) => {
	return (
		<ScrollToBottom className='Scroll' followButtonClassName='Scrollbutton'>
			{children}
		</ScrollToBottom>
	);
};

export default ScrollingComponent;
