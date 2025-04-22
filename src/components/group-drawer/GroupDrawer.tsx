import './GroupDrawer.css';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Group } from '../../interfaces/group';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import { isGroupCompleted } from '../../util/GroupHelpers';
import { useContext } from 'react';
import { GroupsContext } from '../../services/Context';

type GroupDrawerProps = {
  handleCloseDrawerClick(): void;
  isOpen: boolean;
}

function GroupDrawer(props: GroupDrawerProps) {
  const navigate = useNavigate();
  const groups = useContext(GroupsContext);

  return(
    <Drawer
      variant='persistent'
      anchor='left'
      open={props.isOpen}
    >
      <div className='drawer-header'>
        <p className='drawer-title'>Groups</p>
        <IconButton className='close-drawer-button' onClick={() => props.handleCloseDrawerClick()}>
          <ChevronLeftIcon/>
        </IconButton>
      </div>
      <Divider />
      {
        groups.length > 0
          ?
            <List>
              {
                groups.map((group: Group) => (
                  <ListItem 
                    key={group.id} 
                    disablePadding
                    onClick={() => navigate(`/groups/${group.id}`)}
                  >
                    <ListItemButton>
                      <ListItemText className={isGroupCompleted(group) ? 'completed-group-item' : ''}>
                        {group.name}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))
              }
            </List>
          :
            <p className='no-groups-text'>No groups</p>
      }
    </Drawer>
  );
}

export default GroupDrawer;