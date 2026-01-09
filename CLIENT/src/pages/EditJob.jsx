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

export const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useNotifications();
  const [form, setForm] = useState({ job_role:'', job_link:'' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/jobs/getJob/${id}`);
        const j = res.data || {};
        setForm({ job_role:j.job_role||'', job_link:j.job_link||'' });
      } catch (e) {}
      setLoading(false);
    })();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const u = new URL(form.job_link);
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
      await axios.put(`/api/jobs/update/${id}`, form);
      dispatch(notify({ message: 'Job updated', type: 'success' }));
      navigate('/jobs');
    } catch (e) {
      dispatch(notify({ message: 'Failed to update job', type: 'error' }));
    }
  };

  if (loading) return null;
  return (
    <PageContainer>
      <SectionHeader title="Edit Job" />
      <Card className="max-w-xl mx-auto p-6">
        <form onSubmit={onSubmit}>
          <input className="bg-slate-700 border border-slate-600 text-white w-full mb-3 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.job_role} onChange={(e)=>setForm({...form, job_role:e.target.value})} placeholder="Job Role" />
          <input type="url" className="bg-slate-700 border border-slate-600 text-white w-full mb-4 p-2 rounded focus:border-blue-500 focus:outline-none" value={form.job_link} onChange={(e)=>setForm({...form, job_link:e.target.value})} placeholder="https://example.com/job" pattern="https?://.*" />
          <PrimaryButton type="submit" className="w-full">Save</PrimaryButton>
        </form>
      </Card>
    </PageContainer>
  );
};

export default EditJob;
