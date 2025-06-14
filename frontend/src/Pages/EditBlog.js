// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles
// import '../styles/EditBlog.css'; // Import custom CSS

// const EditBlog = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [formData, setFormData] = useState({ title: '', description: '', color: '#000000' });
//   const [thumbnail, setThumbnail] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await axios.get(`http://localhost:9000/api/v1/get/blog/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setFormData({
//           title: res.data.title,
//           description: res.data.description,
//           color: res.data.color || '#000000'
//         });
//         setThumbnail(res.data.thumbnail); // Set initial thumbnail
//       } catch (err) {
//         setError('Blog post not found or an error occurred.');
//       }
//     };
//     fetchBlog();
//   }, [id]);

//   const handleChange = (name, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0];
//     setThumbnail(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('description', formData.description);
//     data.append('color', formData.color);
//     if (thumbnail instanceof File) {
//       data.append('thumbnail', thumbnail);
//     }

//     try {
//       await axios.put(`http://localhost:9000/api/v1/update/blog/${id}`, data, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       navigate('/');
//     } catch (err) {
//       setError('Failed to update the blog post.');
//     }
//   };

//   if (error) {
//     return <div className="alert alert-danger">{error}</div>;
//   }

//   return (
//     <div className="container">
//       <h1>Edit Blog</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             className="form-control"
//             value={formData.title}
//             onChange={(e) => handleChange(e.target.name, e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <ReactQuill
//             value={formData.description}
//             onChange={(value) => handleChange('description', value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="color">Font Color:</label>
//           <input
//             type="color"
//             id="color"
//             name="color"
//             className="form-control"
//             value={formData.color}
//             onChange={(e) => handleChange(e.target.name, e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="thumbnail">Thumbnail:</label>
//           <input
//             type="file"
//             id="thumbnail"
//             name="thumbnail"
//             className="form-control"
//             onChange={handleThumbnailChange}
//           />
//         </div>
//         <div className="image-preview">
//           {thumbnail && (
//             <img
//               src={thumbnail instanceof File ? URL.createObjectURL(thumbnail) : `http://localhost:9000/${thumbnail}`}
//               alt="Preview"
//             />
//           )}
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditBlog;


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import '../styles/EditBlog.css'; // Import custom CSS

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({ title: '', description: '', color: '#000000' });
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/v1/get/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFormData({
          title: res.data.title,
          description: res.data.description,
          color: res.data.color || '#000000'
        });
        setThumbnail(res.data.thumbnail); // Set initial thumbnail
      } catch (err) {
        setError('Blog post not found or an error occurred.');
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('color', formData.color);
    if (thumbnail instanceof File) {
      data.append('thumbnail', thumbnail);
    }

    try {
      await axios.put(`http://localhost:9000/api/v1/update/blog/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate('/');
    } catch (err) {
      setError('Failed to update the blog post.');
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      [{ 'color': [] }, { 'background': [] }], // Adding color and background options
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background' // Adding color and background formats
  ];

  return (
    <div className="container">
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <ReactQuill
            value={formData.description}
            onChange={(value) => handleChange('description', value)}
            modules={modules}
            formats={formats}
          />
        </div>
      
        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail:</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            className="form-control"
            onChange={handleThumbnailChange}
          />
        </div>
        <div className="image-preview">
          {thumbnail && (
            <img
              src={thumbnail instanceof File ? URL.createObjectURL(thumbnail) : `http://localhost:9000/${thumbnail}`}
              alt="Preview"
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
