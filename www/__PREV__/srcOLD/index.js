import React from 'react';
import ReactDOM from 'react-dom/client';
import 'rsuite/dist/rsuite.min.css'

import Titlebar from './components/Titlebar';
import Slidebar from './components/Sidenav';

import { Container, Content } from 'rsuite';

function App() {
  return (
    <div className="sidebar-page">
      <Container>
        <Slidebar />
        <Container>
          <Titlebar />
          <Content>
            Carlos
          </Content>
        </Container>
      </Container>
    </div>
  );
};



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />, root);
