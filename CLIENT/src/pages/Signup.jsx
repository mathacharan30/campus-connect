import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../axios';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
import InputField from '../components/ui/InputField';
import SelectField from '../components/ui/SelectField';
import AuthLayout from '../components/UiOverhaul/AuthLayout';
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
    <AuthLayout>
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-primary">Create your account</h2>
          <p className="text-text-secondary mt-1">Join CampusConnect</p>
        </div>
        <div className="flex flex-col gap-4">
          <InputField label="Email" required onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <InputField label="Password" required type="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          <InputField label="Username" required onChange={(e) => setUsername(e.target.value)} placeholder="Your display name" />
          <InputField label="USN (students only)" onChange={(e) => setUsn(e.target.value)} placeholder="Enter your USN" />
          <InputField label="Semester (students only)" type='number' min='1' max='8' onChange={(e) => setSem(e.target.value)} placeholder="1-8" />
          <SelectField label="Role" required defaultValue={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
            <option value="teacher">Teacher</option>
          </SelectField>
        </div>
        <div className="mt-6">
          <PrimaryButton className="w-full" onClick={signupHandler}>Sign Up</PrimaryButton>
        </div>
        <div className="mt-6 text-center text-text-secondary">
          Already have an account?
          <button className="ml-2 text-brand-400 hover:text-brand-300 underline decoration-transparent hover:decoration-brand-300" onClick={() => navigate('/login')}>
            Sign in
          </button>
        </div>
      </Card>
    </AuthLayout>
  );
}