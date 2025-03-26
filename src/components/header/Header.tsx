import './Header.css';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

type HeaderProps = {
  description: string;
  handleMenuIconClick(): void;
  handleExportButtonClick(): void;
  handleImportButtonClick(): void;
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
            <HomeIcon />
          </IconButton>
          <IconButton 
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={() => props.handleMenuIconClick()}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <p className='title'>Forget Me Not</p>
        <div className='backup-buttons'>
          <IconButton color='inherit' onClick={props.handleExportButtonClick}>
            <FileUploadIcon/>
          </IconButton>
          <IconButton color='inherit' onClick={props.handleImportButtonClick}>
            <FileDownloadIcon />
          </IconButton>
        </div>
      </AppBar>
    </header>
  );
}

export default Header;