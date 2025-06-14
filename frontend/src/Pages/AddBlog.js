import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Import delete icon
import "../styles/AddBlog.css"

const AddBlog = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: '',
    description: '',
    category: '',
  });

  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/v1/get/categories",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error.response?.data?.message || error.message);
      }
    };
    fetchAllCategories();
  }, []);

  const formdata = new FormData();
  formdata.append("title", input.title);
  formdata.append("category", input.category);
  formdata.append("description", input.description);
  formdata.append("thumbnail", file);

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9000/api/v1/add/blog",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/v1/category/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(categories.filter(category => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <div className="container shadow">
        <h2 className="text-center my-3">Add a New Blog</h2>
        <div className="col-xl-12 my-3 d-flex items-center justify-content-center">
          <div className="row">
            <form onSubmit={handleAddBlog}>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Blog Title"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Category
                </label>
                <select
                  className="form-control"
                  name="category"
                  value={input.category}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  value={input.description}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  placeholder="Blog description"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Thumbnail
                </label>
                <input
                  name="thumbnail"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Select thumbnail"
                />
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Add Blog
                </button>
              </div>


              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Category
                </label>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category._id}>
                          <td>{category.title}</td>
                          <td>
                            <button type="button" className="btn btn-danger" onClick={() => handleDeleteCategory(category._id)}>
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
