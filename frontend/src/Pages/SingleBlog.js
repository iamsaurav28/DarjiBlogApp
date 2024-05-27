import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SingleBlog = () => {

  const navigate = useNavigate();

  const {id}= useParams();

  const [blog, setBlog] = useState({})


  useEffect(()=>{
      const fetchSingleBlog = async()=>{
        const res = await axios.get(`https://mern-blog-app-lhql.onrender.com/api/v1/get/blog/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      setBlog(res.data)
      }
      fetchSingleBlog();
  },[id])


  return (
    <div>
      <div className="container shadow my-3">
        <div className="col-md-12 my-3 d-flex items-center justify-content-center bg-light">
          <div className="row">
               <h1 className='my-3'>{blog.title}</h1>
               <p>Published Date: </p>
               <img  src={`https://mern-blog-app-lhql.onrender.com/${blog.thumbnail}`}  
                 className='img img-responsive img-rounded my-3'
                 alt='thmbnail'
               />
               <p className='my-3'>{blog.description}</p>
               </div>
               </div>

            
                <button onClick={()=> navigate("/")} className="btn btn-primary btn-block">
                  Back To Post
                </button>
          
          </div>
        </div>
  );
};

export default SingleBlog;
