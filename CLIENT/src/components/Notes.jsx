import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import Card from './ui/Card';
import PrimaryButton from './ui/PrimaryButton';

export const Notes=({data})=>{
    const navigate = useNavigate();
    const userId = useSelector(state=>state.authUser.user?._id);
    const isOwner = data.user_id && String(data.user_id) === String(userId);
    const onDelete = async ()=>{
        if(!confirm('Delete this material?')) return;
        try{ await axios.delete(`/api/notes/delete/${data._id}`); window.location.reload(); }catch(e){ console.error(e); }
    }
    return(
        <Card className="w-64 p-4 bg-slate-800 border border-slate-700">
            <div className="text-left space-y-1">
              <div className="text-sm text-gray-400">Subject</div>
              <div className="font-semibold text-white truncate">{data.subject}</div>
              <div className="text-sm text-gray-400 mt-2">Chapter</div>
              <a href={data.link} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-400 hover:text-blue-300 hover:underline truncate inline-block">
                {data.chapter}
              </a>
              <div className="flex items-center justify-between pt-3 text-sm">
                <span className="px-2 py-0.5 rounded-full bg-slate-700 text-gray-300">{data.type}</span>
                <span className="text-gray-400">Sem {data.sem}</span>
              </div>
            </div>
            {isOwner && (
              <div className="mt-4 flex gap-2">
                <PrimaryButton className="!px-3 !py-1.5" onClick={()=>navigate(`/edit-note/${data._id}`)}>Edit</PrimaryButton>
                <button className="px-3 py-1.5 rounded-lg border text-red-400 border-red-600 hover:bg-red-950" onClick={onDelete}>Delete</button>
              </div>
            )}
        </Card>
    )
}
