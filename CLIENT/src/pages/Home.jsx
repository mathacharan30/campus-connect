import React from 'react';
import Hero from '../components/UiOverhaul/Hero';
import Features from '../components/UiOverhaul/Features';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authUser.user);
  const role = user?.userRole;

  const CommonCTA = () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {!user && (
        <>
          <button
            onClick={() => navigate('/signup')}
            className="px-5 h-10 rounded-lg text-white bg-brand-500 hover:bg-brand-600 transition-all shadow-md hover:shadow-lg"
            data-glow
          >
            Sign up
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-5 h-10 rounded-lg text-text-secondary hover:text-text-primary bg-surface hover:bg-surface-hover border border-border transition-all"
          >
            Log in
          </button>
        </>
      )}

      {user && (role === 'teacher' || role === 'student') && (
        <>
          <button onClick={() => navigate('/questions')} className="px-5 h-10 rounded-lg text-white bg-brand-500 hover:bg-brand-600 transition-all shadow-md hover:shadow-lg">Q&amp;A</button>
          <button onClick={() => navigate('/viewnotes')} className="px-5 h-10 rounded-lg text-white bg-brand-500 hover:bg-brand-600 transition-all shadow-md hover:shadow-lg">Materials</button>
          <button onClick={() => navigate('/blogs')} className="px-5 h-10 rounded-lg text-white bg-brand-500 hover:bg-brand-600 transition-all shadow-md hover:shadow-lg">Placement Blogs</button>
          <button onClick={() => navigate('/jobs')} className="px-5 h-10 rounded-lg text-white bg-brand-500 hover:bg-brand-600 transition-all shadow-md hover:shadow-lg">Jobs &amp; Hackathons</button>
        </>
      )}

      {user && role === 'alumni' && (
        <>
          <button onClick={() => navigate('/blogs')} className="px-5 h-10 rounded-lg text-white bg-brand-500 hover:bg-brand-600 transition-all shadow-md hover:shadow-lg">Placement Blogs</button>
          <button onClick={() => navigate('/jobs')} className="px-5 h-10 rounded-lg text-white bg-brand-500 hover:bg-brand-600 transition-all shadow-md hover:shadow-lg">Jobs &amp; Hackathons</button>
        </>
      )}
    </div>
  );

  return (
    <div className="relative">
      <Hero />
      <div className="relative z-10 -mt-10 mb-12 flex justify-center">
        <CommonCTA />
      </div>
      <Features />
    </div>
  );
};
