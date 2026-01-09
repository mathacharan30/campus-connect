import React from 'react';
import {JobsComponent} from '../components/jobs';
import {HackathonsComponent} from '../components/hackathons';
import PageContainer from '../components/ui/PageContainer';
import SectionHeader from '../components/ui/SectionHeader';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
const jobs = [
    { userId: 'user1', jobRole: 'Frontend Developer', jobLink: 'https://example.com/job1' },
    { userId: 'user2', jobRole: 'Backend Developer', jobLink: 'https://example.com/job2' },
    { userId: 'user3', jobRole: 'Full Stack Developer', jobLink: 'https://example.com/job3' }
];

const hackathons = [
    { name: 'Hackathon 1', date: '2024-09-01', link: 'https://example.com/hackathon1' },
    { name: 'Hackathon 2', date: '2024-10-01', link: 'https://example.com/hackathon2' },
    { name: 'Hackathon 3', date: '2024-11-01', link: 'https://example.com/hackathon3' }
];
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import {useNavigate } from 'react-router-dom';
import axios from "../axios";
export const JobsAndHackathons = () => {

    const [jobs, setJobs] = useState(null);
    const [hackathons, setHackathons] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get('/api/jobs/getJobs'); 
                setJobs(response1.data);
                const response2 = await axios.get('/api/hackathons/getHackathons'); 
                setHackathons(response2.data);
                setLoading(false);
            } catch (err) { 
                setError(err);
                setLoading(false);
            }
        };
        fetchData(); 
    }, []);
    
    const navigate=useNavigate();
    if (error) return <p>Error: {error.message}</p>;
    if (loading) return <Loading />;
    return (
      <PageContainer>
        <SectionHeader
          title="Jobs & Hackathons"
          subtitle="Discover opportunities and share new ones"
          actions={(
            <>
              <PrimaryButton onClick={() => navigate('/uploadjob')}>Post a Job</PrimaryButton>
              <PrimaryButton className="!bg-blue-600/90" onClick={() => navigate('/uploadhackathon')}>Post a Hackathon</PrimaryButton>
            </>
          )}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="text-xl font-semibold mb-3">Jobs</h3>
            <JobsComponent jobs={jobs} />
          </Card>
          <Card className="p-4">
            <h3 className="text-xl font-semibold mb-3">Hackathons</h3>
            <HackathonsComponent hackathons={hackathons} />
          </Card>
        </div>
      </PageContainer>
    );
}; 

