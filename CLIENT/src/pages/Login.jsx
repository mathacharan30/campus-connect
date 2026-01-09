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
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/Authslice';
import { useNavigate } from "react-router-dom";
import { useNotifications } from '../slices/notifications';
import {notify} from '../slices/notificationSlice';
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
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <Card className="w-96 bg-slate-800 border border-slate-700">
        <CardHeader
          variant="gradient"
          className="mb-4 grid h-28 place-items-center bg-gradient-to-r from-blue-600 to-blue-700"
        >
          <Typography variant="h3" color="white">
            Login
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input required label="Username" type="string" size="lg" onChange={(e) => setUsername(e.target.value)} className="text-white" />
          <Input required label="Password" type="password" size="lg" onChange={(e) => setPassword(e.target.value)} className="text-white" />
        </CardBody>
        <CardFooter className="pt-0">
          <Button className="bg-blue-600 hover:bg-blue-700"  fullWidth onClick={() => loginHandler()}>
            login
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center text-gray-300">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              className="ml-1 font-bold text-blue-400 hover:text-blue-300"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}