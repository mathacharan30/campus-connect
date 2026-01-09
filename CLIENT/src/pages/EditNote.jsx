import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { useNotifications } from '../slices/notifications';
import { notify } from '../slices/notificationSlice';
import PageContainer from '../components/ui/PageContainer';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';

export const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useNotifications();
  const [form, setForm] = useState({ subject:'', chapter:'', link:'', type:'Notes', sem:1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/notes/getNote/${id}`);
        const n = res.data || {};
        setForm({ subject:n.subject||'', chapter:n.chapter||'', link:n.link||'', type:n.type||'Notes', sem:n.sem||1 });
      } catch (e) {}
      setLoading(false);
    })();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // basic URL + Google Drive validation
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
      await axios.put(`/api/notes/update/${id}`, form);
      dispatch(notify({ message: 'Note updated', type: 'success' }));
      navigate('/viewnotes');
    } catch (e) {
      dispatch(notify({ message: 'Failed to update note', type: 'error' }));
    }
  };

  if (loading) return null;
  return (
    <PageContainer>
      <SectionHeader title="Edit Material" />
      <Card className="max-w-xl mx-auto p-6">
        <form onSubmit={onSubmit}>
          <input className="bg-slate-700 border border-slate-600 text-white w-full mb-3 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.subject} onChange={(e)=>setForm({...form, subject:e.target.value})} placeholder="Subject" />
          <input className="bg-slate-700 border border-slate-600 text-white w-full mb-3 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.chapter} onChange={(e)=>setForm({...form, chapter:e.target.value})} placeholder="Chapter" />
          <select className="bg-slate-700 border border-slate-600 text-white w-full mb-3 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.type} onChange={(e)=>setForm({...form, type:e.target.value})}>
            <option value="Notes">Notes</option>
            <option value="Textbook">Textbook</option>
          </select>
          <input className="bg-slate-700 border border-slate-600 text-white w-full mb-3 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.sem} onChange={(e)=>setForm({...form, sem:e.target.value})} placeholder="Semester" />
          <input type="url" className="bg-slate-700 border border-slate-600 text-white w-full mb-4 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.link} onChange={(e)=>setForm({...form, link:e.target.value})} placeholder="https://drive.google.com/file/d/<id>/view" pattern="https?://.*" />
          <PrimaryButton type="submit" className="w-full">Save</PrimaryButton>
        </form>
      </Card>
    </PageContainer>
  );
};

export default EditNote;
