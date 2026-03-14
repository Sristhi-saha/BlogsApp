import { NextResponse } from "next/server";
import connectToDb from "@/database";
import blog from "@/models/blog";

export async function PUT(req) {
  try {
    const { title, description, _id } = await req.json(); // use _id for MongoDB

    await connectToDb();

    const updatedData = await blog.findByIdAndUpdate(
      _id,
      { title, description },
      { new: true }
    );

    if (updatedData) {
      return NextResponse.json({
        success: true,
        data: updatedData,
        message: "Blog updated successfully"
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Blog not found"
      });
    }

  } catch (e) {
    return NextResponse.json({
      success: false,
      message: e.message
    });
  }
}