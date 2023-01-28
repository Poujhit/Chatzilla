import React from 'react';
import ScrollableFeed from 'components/ScrollableContainer/ScrollableContainer';

import { User } from './ChatScreen';
import useChatScreenStyles from './ChatScreenStyles';

interface UserListProps {
  users: User | undefined;
}

const UserList: React.FC<UserListProps> = (props) => {
  const { classes } = useChatScreenStyles();
  return (
    <div className={classes.ScrollingLeftPortion}>
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
