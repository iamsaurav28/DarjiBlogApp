import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Header from './Components/Header';
import AddBlog from './Pages/AddBlog';
import AddCategory from './Pages/AddCategory';
import SingleBlog from './Pages/SingleBlog';
import ProtectedRoute from './Pages/ProtectedRoute';

function App() {
  return (
    
    <div className="App">

      <Header />
      <Routes>
     
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />

      <Route path='/' element={<ProtectedRoute/>}>
      <Route path="/" element={<Home/>} />
      <Route path="/add-blog" element={<AddBlog/>} />
      <Route path="/add-category" element={<AddCategory/>} />
      <Route path="/blog/:id" element={<SingleBlog/>} />
      </Route>
      

      </Routes>
      
    </div>

  );
}

export default App;
