const {z} = require('zod');

const loginSchema = z.object({
  email:z
  .string({required_error:"Email is required"}).trim()
  .email({message:'invalide email address'})
  .min(5,({message:'Email at least must be 5 char'}))
  .max(255,({message:"Email must not be more then 255 char"})),
password:z
  .string({required_error:"password is required"}).trim()
  .min(5,({message:'password at least must be 5 number'}))
  .max(255,({message:"password must not be more then 255 char"}))
})

const singupSchema = loginSchema.extend({
    username:z
    .string({required_error:"Name is required"}).trim()
    .min(5,({message:'Name at least must be 5 char'}))
    .max(255,({message:"Name must not be more then 255 char"})),
})
module.exports={singupSchema,loginSchema}