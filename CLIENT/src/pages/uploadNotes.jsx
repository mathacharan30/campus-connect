import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from '../axios';
import { useDispatch} from 'react-redux';
import { useNotifications } from '../slices/notifications';
import {notify} from '../slices/notificationSlice';
import { useSelector } from 'react-redux';
import PageContainer from '../components/ui/PageContainer';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
export const UploadNotes = () => {
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState('Notes');
  const [sem, setSem] = useState(1);
  useNotifications();
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(state=>state.authUser.user._id);
  const handleSubmit = async(e) => {
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
    const notesData = {
      subject: subject,
      chapter: chapter,
      link: link,
      type: type,
      sem: sem,
      user_id: userId,
    }
    console.log(notesData);
    try{
      const response = await axios.post('/api/notes/uploadNotes',notesData);
      dispatch(notify({message:'Material Uploaded Successfully',type:'success'}));
      navigate('/viewnotes');
    }catch(err)
    {
      dispatch(notify({message:'error: please try again',type:'error'}));
      navigate('/viewnotes');
    }
  }
 
  
  return (
    <PageContainer>
      <SectionHeader title="Upload Material" subtitle="Share notes or textbooks with your peers" />
      <Card className="max-w-xl mx-auto p-6">
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="field1" className="block text-gray-300 text-sm font-bold mb-2">
            Subject:
          </label>
          <input required type="text" value={subject} className="shadow appearance-none bg-slate-700 border border-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="field2" className="block text-gray-300 text-sm font-bold mb-2">
            Chapter Name:
          </label>
          <input
            required
            type="text"
            name="field2"
            id="field2"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="shadow appearance-none bg-slate-700 border border-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="field2" className="block text-gray-300 text-sm font-bold mb-2">
            Notes or Textbook:
          </label>
          <select
            onChange={(e) => setType(e.target.value)}
            className=" shadow appearance-none bg-slate-700 border border-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            required
          >
            <option value="Notes">Notes</option>
            <option value="Textbook">Textbook</option> 
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="field2" className="block text-gray-300 text-sm font-bold mb-2">
            Semester:
          </label>
          <input
            required
            type="text"
            name="field2"
            id="field2"
            defaultValue={sem}
            onChange={(e) => setSem(e.target.value)}
            className="shadow appearance-none bg-slate-700 border border-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="field2" className="block text-gray-300 text-sm font-bold mb-2">
            Google Drive Link:
          </label>
          <input
            required
            type="url"
            name="field2"
            id="field2"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://drive.google.com/file/d/<id>/view"
            pattern="https?://.*"
            className="shadow appearance-none bg-slate-700 border border-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          />
        </div>
        <div className="mt-8">
          <PrimaryButton type='submit' className="w-full">Upload</PrimaryButton>
        </div>
        </form>
      </Card>
    </PageContainer>
  )
}