import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { useNotifications } from '../slices/notifications';
import { notify } from '../slices/notificationSlice';

export const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useNotifications();
  const [form, setForm] = useState({ subject: '', question: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/questions/getQn/${id}`);
        setForm({ subject: res.data.subject || '', question: res.data.question || '' });
      } catch (e) {}
      setLoading(false);
    })();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/questions/update/${id}`, form);
      dispatch(notify({ message: 'Question updated', type: 'success' }));
      navigate('/questions');
    } catch (e) {
      dispatch(notify({ message: 'Failed to update question', type: 'error' }));
    }
  };

  if (loading) return null;
  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto bg-slate-800 border border-slate-700 p-8 shadow-md rounded my-10">
      <h2 className="text-xl mb-4 text-white">Edit Question</h2>
      <input className="bg-slate-700 border border-slate-600 text-white w-full mb-3 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.subject} onChange={(e)=>setForm({...form, subject:e.target.value})} placeholder="Subject" />
      <textarea className="bg-slate-700 border border-slate-600 text-white w-full mb-4 p-2 rounded focus:border-blue-500 focus:outline-none" rows={6} value={form.question} onChange={(e)=>setForm({...form, question:e.target.value})} placeholder="Question" />
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
};

export default EditQuestion;
