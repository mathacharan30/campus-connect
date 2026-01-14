import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

import {useNavigate} from "react-router-dom";

export function Blog({data}) {
    const navigate=useNavigate();
    const handleClick=()=>{
         navigate(`/viewblog/${data._id}`)
    }
    
    return (
        <Card className="overflow-hidden rounded-2xl bg-slate-800/95 border border-white/10 shadow-sm hover:shadow-md transition hover:-translate-y-0.5 will-change-transform">
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
            <CardBody className="p-5">
                <div className="flex flex-col gap-2">
                    <Typography variant="h5" className="text-white">
                        @{data.name}
                    </Typography>
                    <Typography className="text-gray-300 line-clamp-3">
                        {data.headline}
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="p-5 pt-0">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleClick}>View Full Blog</Button>
            </CardFooter>
        </Card>
    );
}

//in the image we display the company logo 
//on click of the button we show the full blog 