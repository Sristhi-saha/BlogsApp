import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title:String,
    description:String
})


const blog = mongoose.models.blog || mongoose.model("blog", BlogSchema)
export default blog;