import './Header.css';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const headerStyle: React.CSSProperties = {
  fontSize: '26px',
  textAlign: 'center',
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

type HeaderProps = {
  description: string;
}

function Header(props: HeaderProps) {
  const navigate = useNavigate();

  return(
    <header>
      <AppBar style={headerStyle}>
          <p className='groupNameText'>{props.description}</p>
          <p className='title'>Forget Me Not</p>
          <IconButton 
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
      </AppBar>
    </header>
  );
}

export default Header;