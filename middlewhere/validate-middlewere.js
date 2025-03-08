const validate = (Schema)=>async(req,res,next)=>{
    try {
        const parsBody = await Schema.parseAsync(req.body)
         req.body= parsBody 
        next()
    } catch (err) {    
        const inputerror = err.errors[0].message
        res.status(400).json({message:inputerror})
        
        
    }
}
module.exports=validate