import connectToDb from "@/database";
import blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";
const addNewBlog = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required()
})
export async function POST(req) {
        try{
            console.log('api hit');
            await connectToDb();
            const extractBlogHere = await req.json();
            const {title,description} = extractBlogHere;

            const {error} = addNewBlog.validate({
                title,description
            })

            if(error){
                return NextResponse.json({
                    success:false,
                    message:error.details[0].message
                })
            }
            const newlyCreatedBlogData = await blog.create(extractBlogHere);
            if(newlyCreatedBlogData){
                return NextResponse.json({
                    message:'blog added successfully',
                    success:true
                })
            }else{
                return NextResponse.json({
                    message:'try again!!',
                    success:false
                })
            }
     
        }catch(e){
            console.log(e);
            return NextResponse.json({
                success:false,
                message:'something went wrong!!! please try again'
            })
        }
}