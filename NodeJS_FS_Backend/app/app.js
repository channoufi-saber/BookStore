const express=require('express');
const cors=require('cors');
const bookRouter=require('../router/bookRouter')
const userRouter=require('../router/userRouter')
const {connect}=require('../db/db');


const app=express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use(cors());


app.get('/',(req,res,next)=>{
	res.status(200).json({message:'Server is up'});
});

app.use('/users',bookRouter)
app.use('/users',userRouter)

app.use((req,res,next)=>{
	const error=new Error('Not Found');
	error.status=404;
	next(error);
});

app.use((error,req,res,next)=>{
	res.status(error.status || 500).json({
		error:{
			message:error.message,
			status:error.status,
		},
	})
})

connect();

module.exports=app;