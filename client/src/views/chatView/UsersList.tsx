import React, { useEffect } from 'react';
import ScrollableFeed from 'components/ScrollableContainer/ScrollableContainer';

import { User } from './ChatScreen';
import useChatScreenStyles from './ChatScreenStyles';

import { animateScroll as scroll } from 'react-scroll';

interface UserListProps {
  users: User | undefined;
}

const UserList: React.FC<UserListProps> = (props) => {
  useEffect(() => {
    scroll.scrollToBottom({
      containerId: 'userlist',
      duration: 200,
      delay: 0,
      ignoreCancelEvents: true,
    });
  }, props.users?.users);
  const { classes } = useChatScreenStyles();
  return (
    <div id='userlist' className={classes.ScrollingLeftPortion}>
      {props.users
        ? props.users.users.map((eachUser) => {
            return (
              <li className={classes.userListItems} key={eachUser.id}>
                {eachUser.name}
              </li>
            );
          })
        : undefined}
    </div>
  );
};

export default UserList;
