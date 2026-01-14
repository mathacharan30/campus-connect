import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/Authslice';
import { useNavigate } from "react-router-dom";
import { useNotifications } from '../slices/notifications';
import {notify} from '../slices/notificationSlice';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
import InputField from '../components/ui/InputField';
import AuthLayout from '../components/UiOverhaul/AuthLayout';
export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useNotifications();
  const loginHandler = async() => {
    const data = {
      username: username,
      password: password,
    }
    dispatch(loginUser(data));
      navigate('/');
  }
 
  return (
    <AuthLayout>
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-primary">Login</h2>
          <p className="text-text-secondary mt-1">Welcome back. Please sign in to continue.</p>
        </div>
        <div className="flex flex-col gap-4">
          <InputField label="Username" required onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
          <InputField label="Password" required type="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <div className="mt-6">
          <PrimaryButton className="w-full" onClick={loginHandler}>Login</PrimaryButton>
        </div>
        <div className="mt-6 text-center text-text-secondary">
          Don&apos;t have an account?
          <button className="ml-2 text-brand-400 hover:text-brand-300 underline decoration-transparent hover:decoration-brand-300" onClick={() => navigate('/signup')}>
            Sign up
          </button>
        </div>
      </Card>
    </AuthLayout>
  );
}