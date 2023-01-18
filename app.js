
const express =require('express');
const morgan =require('morgan');
const cors=require("cors");
const userRouter= require('./routers/userRouter');
const projectRouter = require ('./routers/projectsRouter');
const blogRouter = require ('./routers/blogsRouter')
const AppError= require ('./utils/appError');


const app=express();
app.use(express.json());
app.use(morgan('dev'));

app.use(cors());
app.options('*',cors());
app.enable('trust proxy');

app.use('/api/v1/users',userRouter);
app.use('/api/v1/projects',projectRouter);
app.use('/api/v1/blogs',blogRouter);


app.get('/',(req,res)=>{
    res.send("hello world")
})

app.all('*',(req,res,next)=>{
    
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})


 
module.exports=app