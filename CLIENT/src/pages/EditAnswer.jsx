import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { useNotifications } from '../slices/notifications';
import { notify } from '../slices/notificationSlice';

export const EditAnswer = () => {
  const { qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useNotifications();
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/answers/getAns/${qid}`);
        setAnswer(res.data?.answer || '');
      } catch (e) {}
      setLoading(false);
    })();
  }, [qid]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/answers/update/${qid}`, { answer });
      dispatch(notify({ message: 'Answer updated', type: 'success' }));
      navigate(`/viewanswer/${qid}`);
    } catch (e) {
      dispatch(notify({ message: 'Failed to update answer', type: 'error' }));
    }
  };

  if (loading) return null;
  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto bg-slate-800 border border-slate-700 p-8 shadow-md rounded my-10">
      <h2 className="text-xl mb-4 text-white">Edit Answer</h2>
      <textarea className="bg-slate-700 border border-slate-600 text-white w-full mb-4 p-2 rounded focus:border-blue-500 focus:outline-none" rows={10} value={answer} onChange={(e)=>setAnswer(e.target.value)} placeholder="Answer" />
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
};

export default EditAnswer;
