import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Header from './Components/Header';
import AddBlog from './Pages/AddBlog';
import AddCategory from './Pages/AddCategory';
import SingleBlog from './Pages/SingleBlog';
import ProtectedRoute from './Pages/ProtectedRoute';
import EditBlog from './Pages/EditBlog';

function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Hide Header on /login and /register pages
  const hideHeader = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      {!hideHeader && token && <Header />}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="blog/:id" element={<SingleBlog />} />
          <Route path="edit-blog/:id" element={<EditBlog />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
