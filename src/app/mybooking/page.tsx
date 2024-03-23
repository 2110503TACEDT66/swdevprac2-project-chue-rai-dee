import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import getBookings from "@/libs/getBookings";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function MyBooking(){
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const bookings = await getBookings(session.user.token)
    console.log(bookings.data)

    return(
        <div>
            {
                bookings.data.map((bookingItems)=>(
                    <div className="bg-slate-200 roundex px-5 mx-5 py-2 my-2" key={bookingItems.id}> 
                        <div className="text-xl">{bookingItems.user?.name}</div>
                        <div className="text-sm">{bookingItems.hotel.name}</div>
                        <div className="text-sm">{bookingItems.room?.roomNumber}</div>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm" >
                            Remove from Cart
                        </button>
                    </div>
                ))
            }
        </div>
    )
}