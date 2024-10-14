const footerStyle: React.CSSProperties  = {
  position: 'fixed',
  bottom: '0', 
  backgroundColor: '#1976d2',
  width: '100%',
  height: '40px',
}

function Footer() {
  return(
    <footer style={footerStyle}></footer>
  );
}

export default Footer;