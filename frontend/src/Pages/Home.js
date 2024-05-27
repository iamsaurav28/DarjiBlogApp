import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get("https://mern-blog-app-lhql.onrender.com/api/v1/get/allblogs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error.response?.data?.message || error.message);
      }
    };
    fetchAllBlogs();
  }, []);

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <main className="my-5">
        <div className="container shadow-lg">
          <section className="text-center">
            <h2 className="mb-5 my-3">
              <strong>Latest post</strong>
            </h2>

            <div className="row">
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => (
                  <div className="col-lg-4 col-md-12 mb-4" key={item._id}>
                    <div className="card">
                      <div className="bg-image hover-overlay ripple">
                        <img src={`https://mern-blog-app-lhql.onrender.com/${item.thumbnail}`} alt='thumbnail' className="img-fluid" />
                        <Link to={`/blog/${item._id}`}>
                          <div className="mask" style={{ backgroundColor: 'rgba(251, 251,0.15)' }}></div>
                        </Link>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                        <Link to={`/blog/${item._id}`}>Read More</Link>
                        <button onClick={() => handleDeleteBlog(item._id)} className="btn btn-danger mt-2">Delete Blog</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2>Create A Blog Click On Category</h2>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-primary text-lg-start">
        <div className="text-center p-3 text-white" style={{ backgroundColor: "rgba(0,0,0,0.2" }}>
          2023 copyright:
          <Link className="text-white mx-2" href='https://mdbootstrap.com/' >Darji Saurav</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
