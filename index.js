
const mongoose =require('mongoose')
const dotenv= require('dotenv');
const app= require('./app')
mongoose.set('strictQuery', false);
dotenv.config({path:'.env'});




const connectDb= ()=>{
    try{
        const DB= process.env.DATABASE
         mongoose.connect(DB,{
            useNewUrlParser: true,
            useUnifiedTopology :true    
        })
        console.log('successfully connected to database')
    }catch(error){
        console.log(error)
        console.log('connection failled')
    }
};
connectDb();
   

const PORT= process.env.PORT

app.listen(PORT,()=>{
    console.log( `app listening on port ${PORT}`)
})
