import { getServerSession } from "next-auth";
import getBookings from "@/libs/getBookings";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BookingItem } from "@/interface";
import Link from 'next/link'

export default async function MyBooking(){
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const bookings = await getBookings(session.user.token)
    console.log(bookings.data)

    return(
        <div>
            {
                bookings.data.map((bookingItems:BookingItem)=>(
                    <div className="bg-slate-200 roundex px-5 mx-5 py-2 my-2 text-black" key={bookingItems._id}> 
                        <div className="text-xl">Name: {bookingItems.user?.name}</div>
                        <div className="text-sm">Hotel: {bookingItems.hotel.name}</div>
                        <div className="text-sm">Room: {bookingItems.room?.roomNumber}</div>
                        <div className="text-sm">Begin: {new Date(bookingItems.bookingbegin).toLocaleDateString()}</div>
                        <div className="text-sm">End: {new Date(bookingItems.bookingend).toLocaleDateString()}</div>
                        <div className="flex flex-row space-x-2">
                        <Link href={`/bookings/${bookingItems._id}`}>
                            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm" >Edit</button>
                        </Link>
                        <Link href={`/bookings/${bookingItems._id}/delete`}>
                        <button className="block rounded-md bg-red-600 hover:bg-red-700 px-3 py-2 text-white shadow-sm">Delete</button>
                        </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}