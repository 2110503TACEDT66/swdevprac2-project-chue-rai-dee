import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import getBookings from "@/libs/getBookings";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BookingItem } from "@/interface";

export default async function MyBooking(){
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const bookings = await getBookings(session.user.token)
    console.log(bookings.data)

    return(
        <div>
            {
                bookings.data.map((bookingItems:BookingItem)=>(
                    <div className="bg-slate-200 roundex px-5 mx-5 py-2 my-2" key={bookingItems.id}> 
                        <div className="text-xl">Name: {bookingItems.user?.name}</div>
                        <div className="text-sm">Hotel: {bookingItems.hotel.name}</div>
                        <div className="text-sm">Room: {bookingItems.room?.roomNumber}</div>
                        <div className="text-sm">Begin: {new Date(bookingItems.bookingbegin).toLocaleDateString()}</div>
                        <div className="text-sm">End: {new Date(bookingItems.bookingend).toLocaleDateString()}</div>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm" >
                            Edit
                        </button>
                    </div>
                ))
            }
        </div>
    )
}