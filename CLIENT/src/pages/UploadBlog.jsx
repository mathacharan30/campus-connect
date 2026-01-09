import { useState } from "react"
import { Textarea } from "@material-tailwind/react";
import axios from '../axios';
import { useDispatch} from 'react-redux';
import { useNotifications } from '../slices/notifications';
import {notify} from '../slices/notificationSlice';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
export const UploadBlog = () => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [company, setCompany] = useState('');
    const [salary, setSalary] = useState('');
    const [content, setContent] = useState('');
    const [headline, setHeadline] = useState('');
    const [image, setImage] = useState(null);
    const userId = useSelector(state=>state.authUser.user._id);
    const navigate=useNavigate();
    useNotifications();
    const dispatch=useDispatch();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const form = new FormData();
        form.append('name', name);
        form.append('year', year);
        form.append('company', company);
        form.append('salary', salary);
        form.append('content', content);
        form.append('headline', headline);
        form.append('user_id', userId);
        if (image) form.append('image', image);
        try{ 
            const response = await axios.post('/api/blogs/newBlog', form, { headers: { 'Content-Type': 'multipart/form-data' } });
            dispatch(notify({message:'Blog Posted Successfully',type:'success'}));
            navigate('/blogs');
          }catch(err)
          {
            dispatch(notify({message:'error: Blog Not Posted ',type:'error'}));
            navigate('/blogs');
          }
    }
    return (
        <div className="bg-slate-900 min-h-screen pb-20">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-slate-800 border border-slate-700 p-8 shadow-md rounded my-10">
                <div className="flex items-center justify-center ">
                    <h1 className="block text-white text-xl font-bold mb-2">Write Your Blog</h1>
                </div>
                <div className="mb-4">
                    <label htmlFor="field1" className="block text-gray-300 text-sm font-bold mb-2">
                        Full Name:
                    </label>
                    <input required type="text" value={name} className="shadow appearance-none bg-slate-700 border border-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="field2" className="block text-gray-300 text-sm font-bold mb-2">
                        Year Of Passout:
                    </label>
                    <input
                        required
                        type="text"
                        name="field2"
                        id="field2"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="shadow appearance-none bg-slate-700 border border-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="field2" className="block text-gray-300 text-sm font-bold mb-2">
                        Placed Company:
                    </label>
                    <input
                        required
                        type="text"
                        name="field2"
                        id="field2"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="shadow appearance-none bg-slate-700 border border-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="field2" className="block text-gray-300 text-sm font-bold mb-2">
                        Salary (in CTC)
                    </label>
                    <input
                        required
                        type="text"
                        name="field2"
                        id="field2"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="shadow appearance-none bg-slate-700 border border-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="field2" className="block text-gray-300 text-sm font-bold mb-2">
                        Headline of the Blog
                    </label>
                    <input
                        required
                        type="text"
                        name="field2"
                        id="field2"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        className="shadow appearance-none bg-slate-700 border border-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="file_input">Upload your image (optional)</label>
            <input className="shadow appearance-none bg-slate-700 border border-slate-600 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" 
            id="file_input" type="file" accept="image/jpeg" onChange={(e)=>setImage(e.target.files[0])}></input >
                </div>
                <div className="mb-4">
                    <label htmlFor="field2" className="block text-gray-300 text-sm font-bold mb-2">
                        Write Your Experience:
                    </label>
                    <div className="w-96">
                        <Textarea required rows={20} cols={20} value={content} onChange={(e) => setContent(e.target.value)} className="bg-slate-700 text-white border border-slate-600" />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type='submit'
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Post 
                    </button>
                </div>
            </form>
        </div>
    )
}

