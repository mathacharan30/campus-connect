import React from 'react';
import { JobsComponent } from '../components/jobs';
import { HackathonsComponent } from '../components/hackathons';
import PrimaryButton from '../components/ui/PrimaryButton';
import SectionHeader from '../components/ui/SectionHeader';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { motion } from 'framer-motion';

export const JobsAndHackathons = () => {
  const [jobs, setJobs] = useState(null);
  const [hackathons, setHackathons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  if (error) return (
    <p className="text-center text-red-400 py-10">Error: {error.message}</p>
  );
  if (loading) return <Loading />;

  return (
    <>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <SectionHeader
          title="Jobs & Hackathons"
          subtitle="Discover opportunities and share new ones"
          actions={(
            <div className="flex flex-col sm:flex-row gap-3">
              <PrimaryButton onClick={() => navigate('/uploadjob')} className="w-full sm:w-auto">Post a Job</PrimaryButton>
              <PrimaryButton onClick={() => navigate('/uploadhackathon')} className="w-full sm:w-auto">Post a Hackathon</PrimaryButton>
            </div>
          )}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Jobs Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-surface border border-border rounded-2xl p-6 lg:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-text-primary">Jobs</h2>
            {jobs && jobs.length > 0 && (
              <span className="ml-auto px-3 py-1 text-sm font-medium text-brand-400 bg-brand-500/10 rounded-full">
                {jobs.length}
              </span>
            )}
          </div>
          <JobsComponent jobs={jobs} />
        </motion.div>

        {/* Hackathons Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-surface border border-border rounded-2xl p-6 lg:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-text-primary">Hackathons</h2>
            {hackathons && hackathons.length > 0 && (
              <span className="ml-auto px-3 py-1 text-sm font-medium text-purple-400 bg-purple-500/10 rounded-full">
                {hackathons.length}
              </span>
            )}
          </div>
          <HackathonsComponent hackathons={hackathons} />
        </motion.div>
      </div>
    </>
  );
};
