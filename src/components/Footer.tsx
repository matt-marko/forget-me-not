function Footer() {
  const footerStyle = {
    position: 'fixed',
    bottom: '0', 
    backgroundColor: '#1976d2',
    width: '100%',
    height: '40px',
    boxShadow: '5px 10px',
  }

  return(
    <footer style={footerStyle}></footer>
  );
}

export default Footer;