import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const JobCard = ({ data }) => {
  const navigate = useNavigate();
  const userId = useSelector(state=>state.authUser.user?._id);
  const isOwner = data.user_id && String(data.user_id) === String(userId);
  const onDelete = async ()=>{
    if(!confirm('Delete this job?')) return;
    try{ await axios.delete(`/api/jobs/delete/${data._id}`); window.location.reload(); }catch(e){ console.error(e); }
  }
  return (
    <div className="bg-slate-700 shadow-md rounded-lg overflow-hidden my-4 p-4 border border-slate-600">
      <div className="p-4 leading-normal">
        <h5 className="text-white font-bold text-xl mb-2">{data.job_role}</h5>
        <p className="text-gray-400 text-base">Posted by: {String(data.user_id).slice(-6)}</p>
        <a href={data.job_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline mt-2 inline-block">
          View Job
        </a>
        {isOwner && (
          <div className="mt-2 flex gap-2">
            <button className="text-blue-400 hover:text-blue-300" onClick={()=>navigate(`/edit-job/${data._id}`)}>Edit</button>
            <button className="text-red-400 hover:text-red-300" onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

 export const JobsComponent = ({ jobs }) => {
  return (
    <div className="p-2">
      {jobs.map((job, index) => (
        <JobCard key={index} data={job} />
      ))}
    </div>
  );
};
 
// export  default JobsComponent; 