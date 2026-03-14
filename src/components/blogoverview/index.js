
'use client'

import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";

import {

    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";

function BlogOverview() {

    const initialBlogFromData = {
        title: '',
        description: ''
    }

    const [openBlogDialog, setOpenBlogDialog] = useState(false);
    const [blogFormData, setBlogFormData] = useState(initialBlogFromData)
    const [loading, setLoading] = useState(false);
    const [allBlog, setAllBlog] = useState([])
    console.log(blogFormData, allBlog);

    const handlesavealldata = async () => {
        try {
            const url = blogFormData._id?"/api/update-blog":"/api/add-blog";
            const method = blogFormData._id?"PUT":"POST";
            console.log(url,method)
            setLoading(true)
            const apiResponse = await fetch(url, {
                method: method,
                body: JSON.stringify(blogFormData)
            })
            const result = await apiResponse.json();
            if (result.success) {
                setOpenBlogDialog(false)
                getAllData()
                setLoading(false)
                setBlogFormData(initialBlogFromData);
            }
            console.log(result)

        } catch (e) {
            console.log(e);
            setLoading(false);
            setBlogFormData(initialBlogFromData)
        }
    }

    const getAllData = async () => {
        const apiResponse = await fetch('/api/get-blog', {
            method: "GET",
        })
        const result = await apiResponse.json();
        console.log(result)
        if (result.success) {
            setAllBlog(result.data)
        }
    }

    const handleDelete = async(id)=>{
        console.log(id);
        const apiResponse = await fetch('/api/delete-blog',{
            method:"DELETE",
            body:JSON.stringify({id})
        })
        const result = await apiResponse.json();
        if(result){
            getAllData();
        }
        console.log(result)
    }

    const updateData = async(item)=>{
        setBlogFormData({
            title:item.title,
            description:item.description,
            _id:item._id
        })
        setOpenBlogDialog(true);

        
    }

    useEffect(() => {
        getAllData();
    }, [])

    return (
        <div className="min-h-screen flex-col gap-10 justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600">
            <div>
                <div className="text-center">
                    <Button onClick={() => { setOpenBlogDialog(true) }} className="mt-4 text-center font-bold text-2xl p-6">Add New Blog</Button>
                </div>
                <Dialog open={openBlogDialog} onOpenChange={setOpenBlogDialog}>

                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add New Blog:</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center gap-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={blogFormData.title}
                                    onChange={(e) => setBlogFormData({
                                        ...blogFormData,
                                        title: e.target.value
                                    })}
                                />

                            </div>
                        </div>
                        <DialogHeader>
                            <DialogTitle>description:</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center gap-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                    Description
                                </Label>
                                <Input
                                    name="description"
                                    id="description"
                                    value={blogFormData.description}
                                    onChange={(e) => setBlogFormData({
                                        ...blogFormData,
                                        description: e.target.value
                                    })}
                                />

                            </div>
                        </div>
                        <DialogFooter className="sm:justify-start">

                            <Button onClick={() => handlesavealldata()} type="button">{loading ? "Saving changes...." : "save changes"}</Button>

                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                {
                    allBlog ? allBlog.map((item, index) => {
                        return (
                            <ul className="p-4">
                                <li className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition duration-300">
                                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <div className="flex gap-4 mt-4">
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"onClick={()=>handleDelete(item._id)}>
                                            Delete
                                        </button>

                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"onClick={()=>{updateData(item)}}>
                                            Edit
                                        </button>
                                    </div>
                                </li>
                            </ul>)
                    }) : null
                }
            </div>
        </div>
    )
}

export default BlogOverview;