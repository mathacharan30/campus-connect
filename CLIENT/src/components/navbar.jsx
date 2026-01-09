import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useDispatch} from 'react-redux';
import { logoutUser } from '../slices/Authslice';
function NavList() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const logout=async()=>{
    try{
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    }catch(e){
      console.error('Logout failed', e);
    }
  }
  
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Button className="bg-custom-blue" onClick={()=>navigate('/questions')}>
          QNA
        </Button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Button className="bg-custom-blue" onClick={()=>navigate('/viewnotes')}>Lecture Materials</Button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Button className="bg-custom-blue" onClick={()=>navigate('/jobs')}>Jobs & Hackathons</Button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Button className="bg-custom-blue" onClick={()=>navigate('/blogs')}>Placement Blogs </Button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Button className="bg-custom-blue" onClick={()=>logout()}>Logout</Button>
      </Typography>
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const isLoggedIn = useSelector(state=>state.authUser.user);
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const navigate = useNavigate();
  return (
    <Navbar className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-700 mx-auto max-w-screen-xl px-6 py-3">
      <div className="flex items-center justify-between text-gray-100">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 text-blue-400"
          onClick={() => navigate('/')}
        >
          Campus Connect
        </Typography>
        <div className="hidden lg:block">
          {isLoggedIn &&
            <NavList />
          }
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-gray-100"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        {isLoggedIn &&
          <NavList />
        }
      </Collapse>
    </Navbar>
  );
}