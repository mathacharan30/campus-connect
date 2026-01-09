import React from 'react';
import logo from '../logo/campusconnectlogo.png';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const features = [
  {
    title: "Q&A Section",
    description: "Ask questions and get answers from the community.",
    icon: "❓",
  },
  {
    title: "Resource Sharing",
    description: "Share and access notes , lecture materials and other resources.",
    icon: "📚",
  },
  {
    title: "Alumni Interaction",
    description: "Engage with alumni for guidance and mentorship.",
    icon: "🎓",
  },
  {
    title: "News Section",
    description: "Stay updated with news about hackathons",
    icon: "📰",
  },
  {
    title: "Industry Connect",
    description: "Get notifications of jobs and internships",
    icon: "🏢",
  },
];
// bg-gradient-to-r from-cyan-500 to-blue-500
export const Home = () => {
  const navigate = useNavigate();

  const user = useSelector(state => state.authUser.user);
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
      <div className="h-screen relative flex flex-col items-center justify-center text-center">
        <img src={logo} className='h-96 w-96'></img>
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 whitespace-nowrap overflow-hidden border-r-4 border-blue-400 animate-typing">
          Campus Connect
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 px-4">
          Linking Students, Alumni, and Industry
        </p>
        {
          !user &&
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button onClick={() => navigate('/signup')} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-500 hover:scale-105 hover:bg-blue-700">
              Signup
            </button>
            <button onClick={() => navigate('/login')} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-500 hover:scale-105 hover:bg-blue-700">
              Login
            </button>
          </div>
        }
        {
         user && ['teacher', 'student'].includes(user.userRole) && 
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button onClick={() => navigate('/questions')} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-500 hover:scale-105 hover:bg-blue-700">
              QNA 
            </button>
            <button onClick={() => navigate('/viewnotes')} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-500 hover:scale-105 hover:bg-blue-700">
              Materials
            </button>
            <button onClick={() => navigate('/blogs')} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-500 hover:scale-105 hover:bg-blue-700">
              Placement Blogs
            </button>
            <button onClick={() => navigate('/jobs')} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-500 hover:scale-105 hover:bg-blue-700">
              Jobs & Hackathons
            </button>
          </div>
        }
        {
         user&& ['alumni'].includes(user.userRole) && 
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button onClick={() => navigate('/blogs')} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-500 hover:scale-105 hover:bg-blue-700">
              Placement Blogs
            </button>
            <button onClick={() => navigate('/')} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-500 hover:scale-105 hover:bg-blue-700">
              Jobs & Hackathons
            </button>
          </div>
        }
      </div>
      <div className=" mb-60 mt-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-2/3">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </div>
  );
};
const FeatureCard = ({ feature }) => {

  return (
    <div
      className={`transform transition duration-500 ease-in-out bg-slate-800 bg-opacity-60 backdrop-blur-lg rounded-lg p-6 shadow-lg flex flex-col items-center text-center border border-slate-700 hover:border-blue-500`}
    >
      <div className="text-6xl mb-4">{feature.icon}</div>
      <h3 className="text-2xl font-semibold mb-2 text-white">{feature.title}</h3>
      <p className="text-gray-300">{feature.description}</p>
    </div>
  );
};
