export default async function getHotels() {
    
    await new Promise ((resolve)=>setTimeout(resolve, 1))
    
    const response = await fetch("https://hotel-reservation-api-phi.vercel.app/api/v1/hotels")
    if(!response.ok){
        throw new Error("Failed to fetch hotels")
    }

    return await response.json()
}

// https://vaccine-app-backend.vercel.app/api/v1/hospitals
// https://hotel-reservation-api-phi.vercel.app/api/v1/hotels
// http://localhost:5000/api/v1/hotels
