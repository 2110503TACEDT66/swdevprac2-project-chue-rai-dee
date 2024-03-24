import { getServerSession } from "next-auth"
import User from "@/db/model/User"
import { dbConnect } from "@/db/dbConnect"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { signIn } from 'next-auth/react';
import bcrypt from 'bcryptjs';

export default async function RegisterPage(){

    const addUser = async (addUserForm:FormData) => {
        "use server"
        const name = addUserForm.get("name")
        const email = addUserForm.get("email")
        const password = addUserForm.get("password") as string;
        const tel = addUserForm.get("tel")

        const hashedPassword = await bcrypt.hash(password, 10);
        
        try{
            await dbConnect()
            const user = await User.create({
                "name":name,
                "email": email,
                "password":hashedPassword,
                "role": "user",
                "tel": tel
            })

            if (typeof window !== 'undefined') {
                const result = await signIn('credentials', {
                    redirect: false,
                    email: email,
                    password: password,
                });
    
                if (result?.ok) {
                    redirect('/'); 
                } else {
                    console.error("Sign-in failed after registration.");
                }
            }
        }catch(error){
            console.log(error)
        }
    }

    return(
        <main className = 'bg-slate-100 m-10 p-10'>            
            <form action={addUser}>
                <div className="text-xl text-blue-700"> Register </div>
                <div className = 'flex items-center w-1/2 my-2'>
                    <label className = 'w-auto block text-gray-700 pr-4' htmlFor='name'>Name</label>
                    <input type = 'text' required id='name' name='name' placeholder = 'Name' className = 'bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />
                </div>

                <div className = 'flex items-center w-1/2 my-2'>
                    <label className = 'w-auto block text-gray-700 pr-4' htmlFor='email'>Email</label>
                    <input type = 'text' required id='email' name='email' placeholder = 'Email' className = 'bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />
                </div>
                
                <div className = 'flex items-center w-1/2 my-2'>
                    <label className = 'w-auto block text-gray-700 pr-4' htmlFor='password'>Password</label>
                    <input type = 'text' required id='password' name='password' placeholder = 'password' className = 'bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />
                </div>

                <div className = 'flex items-center w-1/2 my-2'>
                    <label className = 'w-auto block text-gray-700 pr-4' htmlFor='tel'>Tel</label>
                    <input type = 'text' required id='tel' name='tel' placeholder = 'tel' className = 'bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />
                </div>

                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded' >Register</button>
            </form>

        </main>
    )
}