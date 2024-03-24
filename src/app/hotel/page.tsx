import getHotels from "@/libs/getHotels";
import Hotelcatalog from "@/components/HotelCatalog";
import { Suspense } from "react"
import LinearProgress from '@mui/material/LinearProgress';

export default async function Hospital(){

    const hotels = await getHotels()

    return(
        <main className="text-center p-5">
            <h1 className = "text-xl font-medium">Select Your Travel Partner</h1>
            <Suspense fallback={ <p>Loading...<LinearProgress/></p> }>
            <Hotelcatalog hotelJson={hotels}/>
            </Suspense>
        </main>
    )
}