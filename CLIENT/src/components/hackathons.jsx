import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const HackathonCard = ({data}) => {
  const navigate = useNavigate();
  const userId = useSelector(state=>state.authUser.user?._id);
  const isOwner = data.user_id && String(data.user_id) === String(userId);
  const onDelete = async ()=>{
    if(!confirm('Delete this hackathon?')) return;
    try{ await axios.delete(`/api/hackathons/delete/${data._id}`); window.location.reload(); }catch(e){ console.error(e); }
  }
  return (
    <div className="bg-slate-700 shadow-md rounded-lg overflow-hidden my-4 p-4 border border-slate-600">
      <div className="p-4 leading-normal">
        <h5 className="text-white font-bold text-xl mb-2">{data.name}</h5>
        <p className="text-gray-400 text-base">Date: {data.date}</p>
        <a href={data.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline mt-2 inline-block">
          View Hackathon
        </a>
        {isOwner && (
          <div className="mt-2 flex gap-2">
            <button className="text-blue-400 hover:text-blue-300" onClick={()=>navigate(`/edit-hackathon/${data._id}`)}>Edit</button>
            <button className="text-red-400 hover:text-red-300" onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export const HackathonsComponent = ({ hackathons }) => {
  return (
    <div className="p-2">
      {hackathons.map((hackathon, index) => (
         <HackathonCard key={index} data={hackathon} />
      ))}
    </div>
  );
};

// export default HackathonsComponent
 