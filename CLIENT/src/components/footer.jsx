import { Typography } from "@material-tailwind/react";
import logo from "../logo/campusconnectlogo.png"
import { useNavigate } from "react-router-dom";
export function Footer() {
  const navigate=useNavigate();
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-center">
          <img src={logo} alt="logo-ct" className="w-20 h-20 opacity-90" />
          <h1 className="mt-2 text-lg font-semibold text-gray-100">Campus Connect</h1>
        </div>
        <div className="mt-6">
          <Typography color="blue-gray" className="text-center font-normal text-gray-400 hover:text-blue-400 cursor-pointer" onClick={()=>navigate('/aboutus')}>
            About Us
          </Typography>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} Campus Connect. All rights reserved.</p>
      </div>
    </footer>
  );
}