import Home from './components/Home';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { Buffer } from 'buffer';

window.Buffer = Buffer;



const App = () => {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>

  );
};

export default App;
