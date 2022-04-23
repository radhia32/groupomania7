import React from 'react';
import { Route,Routes, BrowserRouter,} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Posts from './pages/Posts';
import './App.css';

const App = () => {
 
  return (
<BrowserRouter>
<Routes>
  <Route exact path="/login" element={<Login />} />
  <Route exact path="/signup" element={<Signup />} />
  <Route exact path="/" element={<Posts />} />

</Routes>
</BrowserRouter>
  )
}

export default App;

