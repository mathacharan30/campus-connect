import React from 'react';


import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import axios from '../axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from "@material-tailwind/react";
export const BlogPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const userId = useSelector(state=>state.authUser.user?._id);
  const [blog, setblog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/blogs/getBlog/${id}`);
        setblog(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) return <p>Error: {error.message}</p>;
  if (loading) {
    return <Loading />
  }

  const isOwner = blog?.user_id && String(blog.user_id) === String(userId);
  const onDelete = async ()=>{
    if(!confirm('Delete this blog?')) return;
    try{ await axios.delete(`/api/blogs/delete/${id}`); navigate('/blogs'); }catch(e){ console.error(e); }
  }
  return (
    <div className="max-w-4xl mx-auto p-4 bg-slate-900 min-h-screen pb-20">

      <div className="bg-slate-800 shadow-md rounded-lg overflow-hidden border border-slate-700">

        {blog.image &&
          <img className="w-full h-64 object-cover" src={blog.image} alt="image" />
        }
        <div className="p-6"> 
          <div className="text-3xl mt-4 text-gray-300 leading-relaxed">
            {blog.headline}
          </div>
          <h6 className="text-xl font-bold text-white">@{blog.name}</h6>
          <p className="text-gray-400 mt-2">
            <span className="font-semibold">Company:</span> {blog.company}
          </p>
          <p className="text-gray-400 mt-2">
            <span className="font-semibold">Year of Pass Out:</span> {blog.year}
          </p>
          <p className="text-gray-400 mt-2">
            <span className="font-semibold">Salary:</span> {blog.salary}
          </p>
          <div className="mt-4 text-gray-300 leading-relaxed">
            {blog.content}
          </div>
          {isOwner && (
            <div className="mt-6 flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={()=>navigate(`/edit-blog/${id}`)}>Edit</Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={onDelete}>Delete</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

