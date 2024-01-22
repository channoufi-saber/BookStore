const express=require('express')
const router=express.Router();

router.get('/',(req,res,next)=>{
	res.status(200).json({
		message:'Successful - GET',
		metadata: {
      hostname: req.hostname,
      method: req.method,
    },

	})
})


router.get('/:id',(req,res,next)=>{
	res.status(200).json({
		id:req.params.id,
		message:'Successful - GET',
		
	})
})

module.exports=router;