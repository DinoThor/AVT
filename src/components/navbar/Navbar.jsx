import { Navbar, Nav } from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';
import MinusIcon from '@rsuite/icons/Minus';
import QrcodeIcon from '@rsuite/icons/Qrcode';
import './titleBar.css'

function NavBar() {
  return (
    <Navbar className='title-bar' appearance='inverse'>
      <Navbar.Brand className='button'>AVT MANAGER</Navbar.Brand>
      <Nav>
        <Nav.Item
          className='button'
          icon={<QrcodeIcon />}
          onSelect={() => {
            console.log("press")
          }}
        >
          QR
        </Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item onSelect={() => console.log("lmao")} className='button' icon={<MinusIcon />} />
        <Nav.Item className='button' icon={<CloseIcon />} />
      </Nav>
    </Navbar>
  );
}

export default NavBar;