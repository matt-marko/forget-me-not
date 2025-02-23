import './Header.css';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  description: string;
  handleMenuIconClick(): void;
}

function Header(props: HeaderProps) {
  const navigate = useNavigate();

  return(
    <header>
      <AppBar className='app-bar'>
        <div className='button-container'>
          <IconButton 
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <HomeIcon></HomeIcon>
          </IconButton>
          <IconButton 
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => props.handleMenuIconClick()}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
        </div>
        <p className='title'>Forget Me Not</p>
        <p className='group-name-text'>{props.description}</p>
      </AppBar>
    </header>
  );
}

export default Header;