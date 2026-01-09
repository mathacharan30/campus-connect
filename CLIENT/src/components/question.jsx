import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip 
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from '../axios';
import { Answer } from '../pages/Answer';
import { useState } from "react";

export function Question({data}) {
  const navigate = useNavigate();
  const role = useSelector(state=>state.authUser.user.userRole);
  const userId = useSelector(state=>state.authUser.user._id);
  const username = useSelector(state=>state.authUser.user.name);
  
  const isAnswered =data.isanswered;
  const qid=data._id;
  const isOwner = (data.user_id && data.user_id === userId) || (data.username && data.username === username);
  const onDelete = async ()=>{
    if(!confirm('Delete this question?')) return;
    try{
      await axios.delete(`/api/questions/delete/${qid}`);
      window.location.reload();
    }catch(e){
      console.error(e);
    }
  }
  
  return (
    <Card className="mt-6 w-96 bg-slate-800 border border-slate-700 shadow-lg">
      <CardBody>
        <Typography variant="h5" color="white" className="mb-2">
          @{data.username}
        </Typography>
        <Typography variant="h6" color="blue-400">
          Subject: {data.subject}
        </Typography>
        <Typography className="text-gray-300">
          {data.question}
        </Typography>
        {data?.image && (
          <div className="mt-3">
            <img
              src={data.image}
              alt="Question attachment"
              className="w-full h-auto rounded border border-slate-600"
            />
          </div>
        )}
      </CardBody>
      <CardFooter className="pt-0 flex items-center gap-2 justify-between">
        { isAnswered===true ? (<Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate(`/viewanswer/${qid}`)}>View Answer</Button>) : 
                    (<Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={()=>navigate(`/answer/${qid}`)}>Answer</Button>)
        }
        {isOwner && (
          <div className="flex gap-2">
            <Button
              color="blue"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isAnswered === true}
              onClick={()=>{ if(!isAnswered) navigate(`/edit-question/${qid}`) }}
            >
              Edit
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={onDelete}>Delete</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
//change that verify button to that answer page
//and after posting the answer rerender the page with the answer
//in the question card replace answer button with the view answer and remove the verify button

//get the question id as prop 
//send this as param to the answer post answer and view answer
//then display the answer