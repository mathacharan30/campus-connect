import { useEffect,useState } from "react";
import axios from '../axios';
import { Question } from "../components/question";
import PageContainer from '../components/ui/PageContainer';
import SectionHeader from '../components/ui/SectionHeader';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import {Loading} from "../components/Loading";
export const QNA = () => {
    const navigate = useNavigate();
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/questions/viewQns');  
        setData(response.data); 
        setLoading(false); 
      } catch (err) {
        setError(err); 
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []); 

    if (error) return <p className="text-center text-red-400 py-10">Error: {error.message}</p>;
    if (loading) return <Loading/>;
    return (
        <PageContainer>
            <SectionHeader
              title="Questions"
              subtitle="Ask questions and get answers from your campus community."
              actions={(
                <PrimaryButton onClick={() => navigate('/postQn')}>Ask a Question</PrimaryButton>
              )}
            />
            <div className="flex items-center justify-center pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {data.map((question,index)=>{
                      return <Question key={index} data={question} />
                    })}
                </div>
            </div>
        </PageContainer>
    )
}
//after comnnecting the backend we can map the questions based on todays date 
//filter it according to the date of the question 
//useeffect will bring all the questions  