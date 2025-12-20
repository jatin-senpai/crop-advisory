import {z} from 'zod';
export const SignupType = z.object({
    email: z.string().email(),
    password:z.string().min(8),
    name:z.string().min(1),
    pincode:z.string().length(6),

})
export const SigninType = z.object({
    email:z.string().email(),
    password:z.string().min(8),

})
