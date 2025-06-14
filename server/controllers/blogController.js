import blogModel from "../models/blogModel.js";


class BlogController

 {
     static getAllBlogs = async(req, res)=>{        
          try{
               const fetchAllBlogs= await blogModel.find({user: req.user._id})
          return res.status(200).json(fetchAllBlogs)
          }catch(error){
          return res.status(400).json({message: error.message})
          }
     }

     static addNewBlog= async(req,res)=>{
          const {title, category, description} = req.body;
          try{
                if(title && category && description){
                  const addBlog = new blogModel({
                    title:title,
                    description:description,
                    category:category,
                    thumbnail:req.file.filename,
                    user: req.user._id,
                  })

                  const savedblog = await addBlog.save();
                  if(savedblog){
          return res.status(200).json({message: "blog added succesfull"})
                  }
                } else{
          return res.status(400).json({message: "all fields are required"})
                }
          }catch(error){
          return res.status(400).json({message: error.message})
          }
     }

     static getSingleBlog=async(req,res)=>{
     const {id} = req.params;
     try{
           if(id){
              const fetchBlogsByID = await blogModel.findById(id);
          return res.status(200).json(fetchBlogsByID)

           }else{
          return res.status(400).json({message: "invalid url"})
           }
     }catch(error){
           return res.status(400).json({message: error.message})
     }}



     static deleteBlog = async (req, res) => {
          const { id } = req.params;
          try {
            if (id) {
              const deletedBlog = await blogModel.findByIdAndDelete(id);
              if (deletedBlog) {
                return res.status(200).json({ message: "blog deleted successfully" });
              } else {
                return res.status(404).json({ message: "blog not found" });
              }
            } else {
              return res.status(400).json({ message: "invalid url" });
            }
          } catch (error) {
            return res.status(400).json({ message: error.message });
          }
        };

      
        static updateBlog = async (req, res) => {
          const { id } = req.params;
          const { title, description, color } = req.body;
          const updateData = { title, description, color };
        
          if (req.file) {
            updateData.thumbnail = req.file.filename;
          }
        
          try {
            const updatedBlog = await blogModel.findByIdAndUpdate(id, updateData, { new: true });
            if (updatedBlog) {
              return res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
            } else {
              return res.status(404).json({ message: "Blog not found" });
            }
          } catch (error) {
            return res.status(400).json({ message: error.message });
          }
        };
        
        
        

 }

 export default BlogController