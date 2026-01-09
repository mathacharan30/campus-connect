import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { useNotifications } from '../slices/notifications';
import { notify } from '../slices/notificationSlice';

export const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useNotifications();
  const [form, setForm] = useState({ name:'', year:'', company:'', salary:'', headline:'', content:'' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/blogs/getBlog/${id}`);
        const b = res.data || {};
        setForm({ name:b.name||'', year:b.year||'', company:b.company||'', salary:b.salary||'', headline:b.headline||'', content:b.content||'' });
      } catch (e) {}
      setLoading(false);
    })();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/blogs/update/${id}`, form);
      dispatch(notify({ message: 'Blog updated', type: 'success' }));
      navigate('/blogs');
    } catch (e) {
      dispatch(notify({ message: 'Failed to update blog', type: 'error' }));
    }
  };

  if (loading) return null;
  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto bg-slate-800 border border-slate-700 p-8 shadow-md rounded my-10">
      <h2 className="text-xl mb-4 text-white">Edit Blog</h2>
      <input className="bg-slate-700 border border-slate-600 text-white w-full mb-3 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} placeholder="Full Name" />
      <input className="bg-slate-700 border border-slate-600 text-white w-full mb-3 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.year} onChange={(e)=>setForm({...form, year:e.target.value})} placeholder="Year of Passout" />
      <input className="bg-slate-700 border border-slate-600 text-white w-full mb-3 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.company} onChange={(e)=>setForm({...form, company:e.target.value})} placeholder="Company" />
      <input className="bg-slate-700 border border-slate-600 text-white w-full mb-3 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.salary} onChange={(e)=>setForm({...form, salary:e.target.value})} placeholder="Salary" />
      <input className="bg-slate-700 border border-slate-600 text-white w-full mb-3 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.headline} onChange={(e)=>setForm({...form, headline:e.target.value})} placeholder="Headline" />
      <textarea className="bg-slate-700 border border-slate-600 text-white w-full mb-4 p-2 rounded focus:border-blue-500 focus:outline-none" rows={10} value={form.content} onChange={(e)=>setForm({...form, content:e.target.value})} placeholder="Content" />
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
};

export default EditBlog;
