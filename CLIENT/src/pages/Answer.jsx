import React, { useState } from 'react';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
import TextArea from '../components/ui/TextArea';

import axios from "../axios";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { useNotifications } from '../slices/notifications';
import {notify} from '../slices/notificationSlice';

export const Answer = () => {

    const { id } = useParams();
    const [answer, setAnswer] = useState('');
    const [image, setImage] = useState(null);
    const [qimage, setQImage] = useState(null);
    const [question, setQuestion] = useState(null);
    const [questionid, setQuestionid] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const userId = useSelector(state => state.authUser.user._id);
    const username = useSelector(state => state.authUser.user.name);

    useNotifications();
    const dispatch=useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/questions/getQn/${id}`);
                setQuestion(response.data.question);
                setQuestionid(response.data.username);
                
                {
                    response.data.image && setQImage(response.data.image)
                }

            } catch (err) {
                setError(err);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('answer', answer);
        form.append('user_id', userId);
        form.append('q_id', id);
        form.append('username', username);
        if (image) form.append('image', image);
        try {
            const response = await axios.post('/api/answers/new', form, { headers: { 'Content-Type': 'multipart/form-data' }});
            dispatch(notify({message:'Answer Posted Successfully',type:'success'}));
            navigate(`/viewanswer/${id}`)
        } catch (err) {
            dispatch(notify({message:'Error: Please try again',type:'success'}));
        }
    };


    if (error) return <p className="text-center text-red-400 py-10">error </p>
    return (
        <div className="bg-slate-900 min-h-screen pb-20">
            <div className='flex items-center justify-center my-10'>
                <Card className="mt-6 w-full max-w-2xl p-6">
                    <div className='font-semibold text-white'>@{questionid}</div>
                    <div className='font-semibold text-gray-300'>{question}</div>
                    {qimage ? (
                        <div className="p-4">
                            <img src={qimage} alt="question image" className="w-full h-auto rounded shadow-md border border-slate-600" />
                        </div>
                    ) : null}
                </Card>
            </div>
            <Card className="max-w-xl mx-auto p-6">
                <form onSubmit={handleSubmit}>
                    <TextArea label="Answer the question" rows={10} onChange={(e) => setAnswer(e.target.value)} />
                    <div className="mt-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="file_input">Upload the answer image</label>
                        <input className="shadow appearance-none bg-slate-700 border border-slate-600 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            id="file_input" type="file" accept="image/jpeg" onChange={(e) => setImage(e.target.files[0])}></input >
                    </div>
                    <div className="mt-6">
                        <PrimaryButton type="submit" className="w-full">Submit Answer</PrimaryButton>
                    </div>
                </form>
            </Card>
        </div>
    );
};

//put the verify button for teachers


//send question id as the prop to display the question
//on submit - along with user id post
//redirect to view answer with  the answer which is posted
//enable edit options 