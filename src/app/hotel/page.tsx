import getHotels from "@/libs/getHotels";
import Hotelcatalog from "@/components/HotelCatalog";

export default async function Hotel(){

    const hotels = await getHotels()
    console.log(hotels)

    return(
        <main className="text-center p-5">
            <h1 className = "text-xl font-medium text-black">Select Your Travel Partner</h1>
            <Hotelcatalog hotelJson={hotels}/>
        </main>
    )
}