import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function Breadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on routes without navbar
  const hiddenRoutes = ['/login', '/signup'];
  if (hiddenRoutes.includes(location.pathname)) return null;

  const segments = location.pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null; // hide on home

  const LABELS = {
    questions: 'Questions',
    viewnotes: 'Notes',
    blogs: 'Blogs',
    jobs: 'Jobs & Hackathons',
    uploadnotes: 'Upload Notes',
    uploadjob: 'Post Job',
    uploadhackathon: 'Post Hackathon',
    uploadblogs: 'Write Blog',
    postQn: 'Post Question',
    answer: 'Answer',
    viewanswer: 'View Answer',
  };
  const formatLabel = (seg) => {
    if (LABELS[seg]) return LABELS[seg];
    if (/^[0-9]+$/.test(seg) || /^[a-f0-9]{24}$/i.test(seg)) return 'Details';
    return seg.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  };
  const crumbs = segments.map((seg, idx) => ({
    label: formatLabel(seg),
    path: '/' + segments.slice(0, idx + 1).join('/'),
  }));

  const handleBack = () => {
    if (window.history && window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <button
          onClick={handleBack}
          className="flex items-center h-8 px-2 md:px-3 bg-surface hover:bg-surface-hover border border-border rounded-lg text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Back</span>
        </button>
        <nav className="hidden md:flex items-center ml-2" aria-label="Breadcrumb">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-text-primary">
            <HomeIcon className="w-4 h-4" />
            <span>Home</span>
          </Link>
          {crumbs.map((c, idx) => (
            <span key={c.path} className="inline-flex items-center">
              <ChevronRightIcon className="w-4 h-4 mx-2 text-text-secondary/70" />
              {idx === crumbs.length - 1 ? (
                <span className="text-text-primary font-medium" aria-current="page">{c.label}</span>
              ) : (
                <Link to={c.path} className="hover:text-text-primary">{c.label}</Link>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}

