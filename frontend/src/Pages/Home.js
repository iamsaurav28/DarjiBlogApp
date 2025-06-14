

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css'; // Import custom CSS

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/v1/get/allblogs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlogs(res.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to fetch blogs. Please try again later.');
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/v1/delete/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error('Error deleting blog:', err);
      setError('Failed to delete blog. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1>Blog Posts</h1>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row">
          {blogs.map((blog) => (
            <div className="col-md-4" key={blog._id}>
              <div className="card mb-4">
                <img
              src={`http://localhost:9000/uploads/${blog.thumbnail}`}

                  className="card-img-top"
                  alt="thumbnail"
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: blog.color || '#000000' }}>
                    {blog.title}
                  </h5>
                  <p className="card-text">
                    {blog.description.replace(/(<([^>]+)>)/gi, '').substring(0, 100)}...
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link to={`/blog/${blog._id}`} className="btn btn-primary">
                      Read More
                    </Link>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleDelete(blog._id)}
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
