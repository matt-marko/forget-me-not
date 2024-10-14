import AppBar from "@mui/material/AppBar";

const headerStyle: React.CSSProperties = {
  fontSize: '26px',
  textAlign: 'center',
};

function Header() {
  return(
    <header>
      <AppBar style={headerStyle}>Forget Me Not</AppBar>
    </header>
  );
}

export default Header;