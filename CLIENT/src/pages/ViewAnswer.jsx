import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { Loading } from '../components/Loading';
import { useState, useEffect } from "react";
import axios from '../axios';
import { useSelector } from 'react-redux';
export const ViewAnswer = () => {
    const { id } = useParams();
    const [answerObj, setAnswer] = useState(null);
    const [Question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const role = useSelector(state => state.authUser.user?.userRole);
    const userId = useSelector(state => state.authUser.user?._id);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get(`/api/questions/getQn/${id}`);
                setQuestion(response1.data);
                const response = await axios.get(`/api/answers/getAns/${id}`);
                setAnswer(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    if (error) return <p>Error: {error.message}</p>;
    if (loading) return <Loading />

    const qnid = answerObj?.q_id;
    const isOwner = answerObj && userId && String(answerObj.user_id) === String(userId);
    const verify = async () => {
        const response = await axios.post(`/api/answers/isVerified/${qnid}`);
    }
    const onDelete = async () => {
        if(!confirm('Delete this answer?')) return;
        try{
            await axios.delete(`/api/answers/delete/${answerObj._id}`);
            navigate(`/answer/${qnid}`);
        }catch(e){
            console.error(e);
        }
    }

    return (
        <div className="bg-slate-900 min-h-screen pb-20">
            <div className="flex item-center justify-center my-5 ">
                <div className="shadow-lg bg-slate-800 text-white h-fit w-2/4 border-2 border-slate-700 p-7 rounded-lg">
                    <div className="flex justify-between">
                        <h1 className="text-2xl text-bold">@{Question.username}</h1>
                        { answerObj.isVerified ===true &&
                            <Button className="text-green-400 border-2 border-green-400">verified</Button>
                        }
                    </div>
                    <h1 className="text-2xl text-bold text-white">{Question.question}</h1>
                    {Question?.image && (
                        <div className="flex items-center justify-center my-4">
                            <img src={Question.image} alt="Question attachment" className="max-h-96 max-w-xl rounded border border-slate-600" />
                        </div>
                    )}
                    <p className="my-5 text-gray-300">
                        <h2 className="text-white font-semibold">Answered by @{answerObj.username}</h2>
                        <h2 className="text-white font-semibold">Answer:</h2>
                        <p>
                        {answerObj.answer}
                        </p>
                    </p>
                    {answerObj?.image && (
                        <div className="flex items-center justify-center my-4">
                            <img src={answerObj.image} alt="Answer attachment" className="max-h-96 max-w-xl rounded border border-slate-600" />
                        </div>
                    )}
                    <div className="mx-5 my-5 flex justify-between ">
                        <div className="flex gap-2">
                            {isOwner && (
                                <>
                                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={()=>navigate(`/edit-answer/${qnid}`)}>Edit</Button>
                                  <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={onDelete}>Delete</Button>
                                </>
                            )}
                        </div>
                        {answerObj.isVerified === false && role === 'teacher' && (
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={()=>verify()}>verify</Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
//with the parameters u will get the answer for the question
//then  display it
//use effect to fetch the answer
// conditional rendering for the buttons and verification


//add edit and delete options later 
