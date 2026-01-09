
const Subjects=()=>{
    return(
        <>
        <div className="bg-slate-800 text-white m-5 p-5 w-60 
        text-center font-bold font-xl rounded shadow-lg border-slate-700 border-2 hover:bg-slate-700">
            Subject Name
        </div>
        </>
    )
}
export const ViewSubject=()=>{
    return(
        <div className="bg-slate-900 min-h-screen pb-20">
        <div className='flex items-center justify-center my-8 '>
                <div className='grid '>
                    <Subjects/>
                    <Subjects/>
                    <Subjects/>
                    <Subjects/>
                </div>
            </div>
        </div>
    )
}

//get the sem details from the backend 
//then display the subjects 
// pass prop to the view notes 
// display the notes which matches the subject 