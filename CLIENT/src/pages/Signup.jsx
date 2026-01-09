import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../axios';
export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usn, setUsn] = useState('');
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [sem, setSem] = useState();
  const navigate = useNavigate();
  const signupHandler = async () => {
    // basic client-side validation
    if (!email || !password || !username || !role) {
      console.error('Please fill all required fields');
      return;
    }
    if (role === 'student' && (!usn || !sem)) {
      console.error('USN and Semester are required for students');
      return;
    }
    const data = {
      email,
      password,
      userRole: role,
      username,
      ...(role === 'student' ? { USN: usn, semester: Number(sem) } : {})
    }
    console.log('Signup payload:', data);
    try {
      const res = await axios.post("/api/user/signup", data);
      console.log(res.data);
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error.response?.status, error.response?.data || error.message);
    }
  }
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <Card className="w-96 bg-slate-800 border border-slate-700">
        <CardHeader
          variant="gradient"
          className="mb-4 grid h-28 place-items-center bg-gradient-to-r from-blue-600 to-blue-700"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input required label="Email" size="lg" onChange={(e) => setEmail(e.target.value)} className="text-white" />
          <Input required label="Password" type="password" size="lg" onChange={(e) => setPassword(e.target.value)} className="text-white" />
          <Input required label="Username" size="lg" onChange={(e) => setUsername(e.target.value)} className="text-white" />
          <Input required label="USN (not for teachers)" size="lg" onChange={(e) => setUsn(e.target.value)} className="text-white" />
          <Input required type='number' min='1' max='8' label="Semester (not for teachers)" size="lg" onChange={(e) => setSem(e.target.value)} className="text-white" />
          <div className="w-auto">
            <select className="p-2 m-2 bg-slate-700 text-white border border-slate-600 rounded" required name="who are you ?" onChange={(e)=>setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="alumni">Alumini</option>
            <option value="teacher">Teacher</option>
          </select>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button className="bg-blue-600 hover:bg-blue-700" fullWidth onClick={() => signupHandler()}>
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center text-gray-300">
            Already have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              className="ml-1 font-bold text-blue-400 hover:text-blue-300"
              onClick={() => navigate('/login')}
            >
              Sign in
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}