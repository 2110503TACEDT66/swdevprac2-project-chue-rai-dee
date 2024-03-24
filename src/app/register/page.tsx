import User from "@/db/model/User"
import { dbConnect } from "@/db/dbConnect"
import bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

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
        }catch(error){
            console.log(error)
        }
        revalidateTag("users")
        redirect("/api/auth/signin")
    }

    return(
        <main className = 'bg-gray-100 min-h-screen flex items-center justify-center'>            
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-3xl text-center text-gray-800 mb-6">Register</h1>
                <form action={addUser} className="space-y-4">
                    
                        <label className = 'w-auto block text-gray-700 pr-4' htmlFor='name'>Name</label>
                        <input type = 'text' required id='name' name='name' placeholder = 'Name' className = 'bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />


                    
                        <label className = 'w-auto block text-gray-700 pr-4' htmlFor='email'>Email</label>
                        <input type = 'text' required id='email' name='email' placeholder = 'Email' className = 'bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />

                    
                    
                        <label className = 'w-auto block text-gray-700 pr-4' htmlFor='password'>Password</label>
                        <input type = 'text' required id='password' name='password' placeholder = 'password' className = 'bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />


                    
                        <label className = 'w-auto block text-gray-700 pr-4' htmlFor='tel'>Tel</label>
                        <input type = 'text' required id='tel' name='tel' placeholder = 'tel' className = 'bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />

                    <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded' >Register</button>
                </form>
            </div>
        </main>
    )
}