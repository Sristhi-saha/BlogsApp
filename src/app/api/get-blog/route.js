import connectToDb from "@/database";
import blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function GET() {
    try{
        connectToDb();
        const getAllData = await blog.find({});
        if(getAllData){
            return NextResponse.json({
                success:true,
                data:getAllData
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"Something went wrong! please try again.."
            })
        }
    }catch(e){
        return NextResponse.json({
            success:false,
            message:"Something went wrong! please try again.."
        })
    }
}