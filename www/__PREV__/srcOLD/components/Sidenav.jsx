import React from 'react';

import { Sidebar, Sidenav, Nav, Navbar, Avatar } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import defAvatar from '../assets/defaultAvatar.png'

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const Slidebar = () => {
  const [expand, setExpand] = React.useState(true);
  return (
    <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={expand ? 240 : 80}
          collapsible
        >
          <Sidenav.Header style={{ margin: 20, textAlign: 'center' }}>
            <Avatar circle src={defAvatar} />
            <h6>dev</h6>
          </Sidenav.Header>
          <Sidenav expanded={expand} appearance="subtle">
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
                  Dashboard
                </Nav.Item>
                <Nav.Menu
                  eventKey="2"
                  trigger="hover"
                  title="Settings"
                  icon={<GearCircleIcon />}
                  placement="rightStart"
                >
                  <Nav.Item eventKey="2-1"></Nav.Item>
                  <Nav.Item eventKey="2-2">Parámetros</Nav.Item>
                  <Nav.Item eventKey="2-3">Etc.</Nav.Item>
                  <Nav.Item eventKey="2-4">Cambiar de usuario</Nav.Item>
                  <Nav.Item eventKey="2-5">Registrar nuevo usuario</Nav.Item>
                </Nav.Menu>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>
  );
}

export default Slidebar;