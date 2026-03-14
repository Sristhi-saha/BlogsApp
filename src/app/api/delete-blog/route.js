import { NextResponse } from "next/server";
import connectToDb from "@/database";
import blog from "@/models/blog";

export async function DELETE(req) {
  try {
    const { id } = await req.json();   // ✅ correct way
    console.log(id)
    await connectToDb();

    const deletedata = await blog.findByIdAndDelete(id);

    if (deletedata) {
      return NextResponse.json({
        success: true,
        message: "Blog deleted successfully"
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