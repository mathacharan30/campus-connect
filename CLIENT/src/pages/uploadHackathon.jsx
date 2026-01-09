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
const UploadHackathon = () => {
  const [date, setDate] =useState('');
  const [name, setName] =useState('');
  const [link, setLink] =useState('');
  const userId = useSelector(state=>state.authUser.user._id);
  useNotifications();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleSubmit =async (e) => {
    e.preventDefault();
    // basic URL + Google Drive validation
    try {
      const u = new URL(link);
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
      dispatch(notify({message:'Please enter a valid URL (e.g., https://example.com)',type:'error'}));
      return; 
    }
    const data={
      date:date,
      name:name,
      link:link,
      user_id: userId,
    }
    try{
      const response = await axios.post('/api/hackathons/addHackathon',data);
      dispatch(notify({message:'Hackathon Posted Successfully',type:'success'}));
      navigate('/jobs');
    }catch(err)
    {
      dispatch(notify({message:'error: please try again',type:'error'}));
      navigate('/jobs');
    }
  };

  return (
    <PageContainer>
      <SectionHeader title="Post a Hackathon" subtitle="Share upcoming hackathons and registration links" />
      <Card className="max-w-xl mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="hackathonDate" className="block text-sm font-medium text-gray-300">
            Hackathon Date
          </label>
          <input
            type="date"
            id="hackathonDate"
            name="hackathonDate"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hackathonName" className="block text-sm font-medium text-gray-300">
            Hackathon Name
          </label>
          <input
            type="text"
            id="hackathonName"
            name="hackathonName"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="registrationLink" className="block text-sm font-medium text-gray-300">
            Registration Link
          </label>
          <input
            type="url"
            id="registrationLink"
            name="registrationLink"
            value={link}
            onChange={(e)=>setLink(e.target.value)}
            placeholder="https://example.com/register"
            pattern="https?://.*"
            className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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

export default UploadHackathon;
