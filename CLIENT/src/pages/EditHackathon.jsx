import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { useNotifications } from '../slices/notifications';
import { notify } from '../slices/notificationSlice';

export const EditHackathon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useNotifications();
  const [form, setForm] = useState({ name:'', date:'', link:'' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/hackathons/getHackathon/${id}`);
        const h = res.data || {};
        setForm({ name:h.name||'', date:h.date||'', link:h.link||'' });
      } catch (e) {}
      setLoading(false);
    })();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const u = new URL(form.link);
      if (!(u.protocol === 'http:' || u.protocol === 'https:')) throw new Error('protocol');
      const host = u.hostname.toLowerCase();
      if (host.includes('drive.google.com')) {
        const isDriveShare = (
          u.pathname.includes('/file/d/') ||
          u.pathname.includes('/drive/folders/') ||
          u.searchParams.has('id')
        );
        if (!isDriveShare) {
          dispatch(notify({ message: 'Please enter a valid Google Drive share link (file or folder). Example: https://drive.google.com/file/d/<id>/view', type: 'error' }));
          return;
        }
      }
    } catch (_) {
      dispatch(notify({ message: 'Please enter a valid URL (e.g., https://example.com)', type: 'error' }));
      return;
    }
    try {
      await axios.put(`/api/hackathons/update/${id}`, form);
      dispatch(notify({ message: 'Hackathon updated', type: 'success' }));
      navigate('/jobs');
    } catch (e) {
      dispatch(notify({ message: 'Failed to update hackathon', type: 'error' }));
    }
  };

  if (loading) return null;
  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto bg-slate-800 border border-slate-700 p-8 shadow-md rounded my-10">
      <h2 className="text-xl mb-4 text-white">Edit Hackathon</h2>
      <input className="bg-slate-700 border border-slate-600 text-white w-full mb-3 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} placeholder="Name" />
      <input type="date" className="bg-slate-700 border border-slate-600 text-white w-full mb-3 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.date ? String(form.date).slice(0,10) : ''} onChange={(e)=>setForm({...form, date:e.target.value})} placeholder="Date" />
      <input type="url" className="bg-slate-700 border border-slate-600 text-white w-full mb-4 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.link} onChange={(e)=>setForm({...form, link:e.target.value})} placeholder="https://example.com/register" pattern="https?://.*" />
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
};

export default EditHackathon;
