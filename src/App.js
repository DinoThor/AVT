import logo from './logo.svg';
import './App.css';
import NavBar from './components/navbar/Navbar';
import 'rsuite/dist/rsuite.min.css';
import UserPicker from './components/userPicker/UserPicker';

function App() {
  return (
    <div>
      <NavBar/>
      <UserPicker/>
    </div>
  );
}

export default App;
