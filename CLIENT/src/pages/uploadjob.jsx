import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useNotifications } from '../slices/notifications';
import {notify} from '../slices/notificationSlice';
import axios from '../axios';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageContainer from '../components/ui/PageContainer';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
const JobUpload = () => {
  const [jobRole, setJobRole] = useState('');
  const [jobLink, setJobLink] = useState('');
  const user_id=useSelector(state=>state.authUser.user._id);
  
  useNotifications();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    // basic URL + Google Drive validation for job link
    try {
      const u = new URL(jobLink);
      if (!(u.protocol === 'http:' || u.protocol === 'https:')) throw new Error('protocol');
      const host = u.hostname.toLowerCase();
      if (host.includes('drive.google.com')) {
        const isDriveShare = (
          u.pathname.includes('/file/d/') ||
          u.pathname.includes('/drive/folders/') ||
          u.searchParams.has('id')
        );
        if (!isDriveShare) {
          dispatch(notify({message:'Please enter a valid Google Drive share link (file or folder). Example: https://drive.google.com/file/d/<id>/view',type:'error'}));
          return;
        }
      }
    } catch (_) {
      dispatch(notify({message:'Please enter a valid job URL (e.g., https://example.com)',type:'error'}));
      return;
    }
    const data={
      job_role:jobRole,
      job_link:jobLink,
      user_id:user_id,
    }
    try{
      const response = await axios.post('/api/jobs/new',data);
      dispatch(notify({message:'Job Posted Successfully',type:'success'}));
      navigate('/jobs');
    }catch(err)
    {
      dispatch(notify({message:'error: please try again',type:'error'}));
      navigate('/jobs');
    }
  };

  return (
    <PageContainer>
      <SectionHeader title="Post a Job" subtitle="Share job and internship opportunities" />
      <Card className="max-w-xl mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="jobRole" className="block text-gray-300 font-bold mb-2">
            Job Role
          </label>
          <input
            type="text"
            id="jobRole"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter job role"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="jobLink" className="block text-gray-300 font-bold mb-2">
            Job Link
          </label>
          <input
            type="url"
            id="jobLink"
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            placeholder="https://example.com/job"
            pattern="https?://.*"
            required
          />
        </div>
        <div className="mt-6">
          <PrimaryButton type="submit" className="w-full">Submit</PrimaryButton>
        </div>
      </form>
      </Card>
    </PageContainer>
  );
};

export default JobUpload;
