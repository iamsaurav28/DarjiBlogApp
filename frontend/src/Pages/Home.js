import React,{ useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

  const [blogs, setBlogs] = useState([]);
         

  useEffect(()=>{
           const fetchAllBlogs = async()=>{
            const res = await axios.get("http://localhost:9000/api/v1/get/allblogs", {             
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },

            })
            setBlogs(res.data)
           }    
           fetchAllBlogs();
  },[])


  const Delete=(i)=>{
       const newblog =  blogs.filter((elem, id)=>{ 
         return i!== id
        
       }) 
       
       setBlogs(newblog)
        
  }

  return (
    <div>
      <main className="my-5">
        <div className="container shadow-lg">
          <section className="text-center">
            <h2 className="mb-5 my-3">
              <strong>Latest post</strong>
            </h2>

            <div className="row">

              {
                blogs && blogs.length > 0   ? 
                blogs.map((item,i)=>{
                  return (
                    <>

                    <div className="col-lg-4 col-md-12 mb-4">
                    <div className="card">
                      <div
                        className="bg-image hover-overlay ripple"
                        data-mdb-ripple-color="light"
                      >
                        <img src={`http://localhost:9000/${item.thumbnail}`} alt='thumbnail' class="img-fluid" />
                        <Link>
                          <div
                            className="mask"
                            style={{ backgroundColor: 'rgba(251, 251,0.15)' }}
                          ></div>
                        </Link>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                        <Link to={`/blog/${item._id}`}>Read More</Link>

                        
                      </div>
                      <button onClick={()=> Delete(i)}>Delete</button>
                    </div>
                  </div>
               
                  </>

                  )
                })

                : <h2>Loading....</h2> 
              }
             
            </div>
          </section>
        </div>
      </main>


      <footer className="bg-primary text-lg-start">
      <div className="text-center p-3 text-white" style={{backgroundColor: "rgba(0,0,0,0.2"}} >
       2023 copyright: 
       < Link className="text-white mx-2" href='https://mdbootstrap.com/' >Darji Saurav</Link>
      </div>
      </footer>





    </div>
  );
};

export default Home;
