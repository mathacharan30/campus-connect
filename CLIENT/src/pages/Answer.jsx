import React, { useState } from 'react';
import { Textarea } from "@material-tailwind/react";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

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
                <Card className="mt-6 w-96 bg-slate-800 border border-slate-700">
                    <CardBody>
                        <Typography className='font-semibold text-white'>
                            @{questionid}
                        </Typography>
                        <Typography className='font-semibold text-gray-300'>
                            {question}
                        </Typography>
                        {qimage ? (
                            <div className="p-4">
                                <img src={qimage} alt="question image" className="w-full h-auto rounded shadow-md border border-slate-600" />
                            </div>
                        ) : null}
                    </CardBody>
                </Card>
            </div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-slate-800 border border-slate-700 p-8 shadow-md rounded">
                <div className="mb-4">
                    <label htmlFor="field1" className="block text-gray-300 text-sm font-bold mb-2">
                        Answer the question
                    </label>
                    <div className="w-96">
                        <Textarea rows={10} cols={10} onChange={(e) => setAnswer(e.target.value)} className="bg-slate-700 text-white border border-slate-600" />
                    </div>
                </div>
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="file_input">Upload the answer image</label>
                <input className="shadow appearance-none bg-slate-700 border border-slate-600 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                    id="file_input" type="file" accept="image/jpeg" onChange={(e) => setImage(e.target.files[0])}></input >

                <div className="flex items-center justify-center my-10">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit Answer
                    </button>
                </div>
            </form>
        </div>
    );
};

//put the verify button for teachers


//send question id as the prop to display the question
//on submit - along with user id post
//redirect to view answer with  the answer which is posted
//enable edit options 