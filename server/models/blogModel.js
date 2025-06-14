// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema({
//      title:{
//           type:String,
//      },

//      category:{
//           type:  mongoose.Schema.Types.ObjectId,
//           refer:"categories",
//      },
//      description:{
//           type:String,
//      },
//      thumbnail:{
//           type:String,
//      },
//      user:{
//           type: mongoose.Schema.Types.ObjectId,
//           refer: "users",
//      }
// })


// const blogModel = mongoose.model("blogs", blogSchema);
// export default blogModel;




import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories", // Fix typo: should be "ref", not "refer"
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Fix typo: should be "ref", not "refer"
  }
}, { timestamps: true }); // ✅ This adds createdAt and updatedAt automatically



const blogModel = mongoose.model("blogs", blogSchema);
export default blogModel;
