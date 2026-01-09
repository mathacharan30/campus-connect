import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    Button,
} from "@material-tailwind/react";

import {useNavigate} from "react-router-dom";

export function Blog({data}) {
    const navigate=useNavigate();
    const handleClick=()=>{
         navigate(`/viewblog/${data._id}`)
    }
    
    return (
        <Card className="max-w-[24rem] overflow-hidden bg-slate-800 border border-slate-700">
            {/* <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
            >
                <img
                    src={data.image}
                    alt="blog-image"
                />
            </CardHeader> */}
            <CardBody>
                <div className="md:flex-row md:items-center md:justify md:gap-3 flex-col gap-3">
                    <Typography variant="h4" color="white">
                        {data.name}
                    </Typography>
                </div>
                <Typography variant="lead" color="gray" className="mt-3 font-normal text-gray-400">
                    {data.headline}
                </Typography>
            </CardBody>
            <CardFooter className="flex items-center justify-between">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={()=>handleClick()}>view full blog</Button>
                {/* <Typography className="font-normal">blog-upload date</Typography> */}
            </CardFooter>
        </Card>
    );
}

//in the image we display the company logo 
//on click of the button we show the full blog 