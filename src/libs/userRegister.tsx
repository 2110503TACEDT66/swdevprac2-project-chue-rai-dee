export default async function userRegister(userName:string, userEmail: string, userPassword: string, userTel: string) {
    const response = await fetch('https://hotel-reservation-api-phi.vercel.app/api/v1/auth/register', {
      method: "POST",
      cache: 'no-store',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name:userName, email: userEmail, password: userPassword, role:"user", tel: userTel }),
    });
  
    // if (!response.ok) {
    //   throw new Error("Failed to register");
    // }
  
    return await response.json();
  }