import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './Context/Notes/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';


function App() {

  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/About' element={<About />} />
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/Signup' element={<Signup />} />
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;