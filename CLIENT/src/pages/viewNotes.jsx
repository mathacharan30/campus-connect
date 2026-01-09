import { useEffect, useState } from 'react'
import { Notes } from '../components/Notes';
import { Loading } from '../components/Loading';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/ui/PageContainer';
import SectionHeader from '../components/ui/SectionHeader';
import PrimaryButton from '../components/ui/PrimaryButton';
export const ViewNotes = () => {

    const navigate=useNavigate();
    const [notes, setNotes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/notes/getNotes');
                setNotes(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) return <p className="text-center text-red-400 py-10">Error: {error.message}</p>;
    if (loading) return <Loading />;

    return (
      <PageContainer>
        <SectionHeader
          title="Lecture Materials"
          subtitle="View and share notes and textbooks"
          actions={
            <PrimaryButton onClick={() => navigate('/uploadnotes')}>
              Upload Material
            </PrimaryButton>
          }
        />

        <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {notes.map((data, index) => (
            <Notes key={index} data={data} />
          ))}
        </div>
      </PageContainer>
    )
}
//this component is subject wise notes
//this will be redirected when we click the subject link
//this page will be rendered when someone clicks the on the subject
//we will access the params to get sub name and make an axios request to get all the notes related to the subject
