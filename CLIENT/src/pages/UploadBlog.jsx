import { useState } from "react"
import axios from '../axios';
import { useDispatch} from 'react-redux';
import { useNotifications } from '../slices/notifications';
import {notify} from '../slices/notificationSlice';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import PageContainer from '../components/ui/PageContainer';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
import InputField from '../components/ui/InputField';
import TextArea from '../components/ui/TextArea';
import FileInput from '../components/ui/FileInput';
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
        <PageContainer>
            <Card className="max-w-2xl mx-auto p-6">
                <div className="flex items-center justify-center ">
                    <h1 className="block text-white text-xl font-bold mb-2">Write Your Blog</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <InputField label="Full Name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                    <InputField label="Year Of Passout" required value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g., 2025" />
                    <InputField label="Placed Company" required value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" />
                    <InputField label="Salary (CTC)" required value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g., 12 LPA" />
                    <InputField label="Headline of the Blog" required value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Catchy title" />
                    <FileInput label="Upload your image (optional)" accept="image/jpeg" onChange={(e)=>setImage(e.target.files[0])} />
                    <TextArea label="Write Your Experience" required rows={14} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Share insights, challenges, and tips" />
                    <div className="mt-6">
                        <PrimaryButton type='submit' className="w-full">Post</PrimaryButton>
                    </div>
                </form>
            </Card>
        </PageContainer>
    )
}

