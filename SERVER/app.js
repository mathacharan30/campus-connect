require('dotenv').config()
const express=require("express")
const app=express()
const cors=require("cors")
const mongoose=require('mongoose')
const answers=require('./models/answers.js')
const question=require('./models/questions.js')
const questionsRoute=require('./routes/qRoute.js')
const ansroute=require('./routes/ansroute.js')
const notesRoute=require('./routes/notesRoute')
const jobroute=require('./routes/jobroute.js')
const blogroute=require('./routes/blogroute.js')
const hackathonRoute=require('./routes/hackathonRoute')

var cookieParser = require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.urlencoded())
app.use(cookieParser());
app.use(express.json())
const mongoUrl='mongodb+srv://mathacharan30:test123@vyoma.nuphp.mongodb.net/?appName=Vyoma'
main().then(() => {
    console.log("connected to DB Successfully");
    // One-time index migration: remove legacy phone_1 unique index if it exists on users
    fixUserIndexes().catch((e)=>console.warn('Index fix skipped:', e.message));
}).catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(mongoUrl);
}

async function fixUserIndexes(){
    try{
        const col = mongoose.connection.db.collection('users');
        const exists = await col.indexExists('phone_1');
        if(exists){
            await col.dropIndex('phone_1');
            console.log('Dropped legacy index phone_1 on users');
        }
    }catch(e){
        console.warn('Failed to check/drop phone_1 index:', e.message);
    }
}

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));



// adduser=async ()=>{
//     question.deleteMany({})
//     question.insertMany({
//         username:'hello bot',
//         Question:'what is a genai?',
        

//     })
// }
//index route
app.get('/',(req,res)=>{
    res.send('index route')
})
//questions qoute
app.use('/api/questions',questionsRoute)

//answers route
app.use('/api/answers',ansroute)


app.use('/api/blogs',blogroute)
//job route
app.use('/api/jobs',jobroute)
app.use('/api/notes',notesRoute)
app.use('/api/hackathons',hackathonRoute)
const userRoute = require('./routes/userRoute');
app.use('/api/user', userRoute);


app.listen(8080, () => {
    console.log(`listening on port 8080`);
});




//changes done in node modules