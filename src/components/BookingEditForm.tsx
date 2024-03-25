"use client"
import { useState } from 'react';
import updateBooking from '@/libs/updateBooking';
import { redirect } from 'next/navigation';
import { BookingDetail } from '@/interface';

export default function BookingEditForm({token, bookingDetail, bid}:{token:string, bookingDetail:BookingDetail, bid:string}){
    const today = new Date().toISOString().substr(0, 10);
    const startDate = bookingDetail.data.bookingbegin.substr(0, 10);
    const endDate = bookingDetail.data.bookingend.substr(0, 10);
    const [bookingStart, setBookingStart] = useState(startDate);
    const [bookingEnd, setBookingEnd] = useState(endDate);
    const [bookingId, setBookingId] = useState(bid);
    const bookingEndMax = new Date(new Date(bookingStart).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10);
    const addBookingVal = async () => {
        //console.log(token)
        if(bookingEnd < bookingStart){
            alert("Booking end date cannot be before booking start date")
            return
        }
        const res = await updateBooking(bid, bookingStart, bookingEnd, token, '65e0564d0ce1407644808cf7')
        console.log(res)
        if(!res.success){
            alert(res.message)
            return
        }
        redirect("/bookings/manage")
        //alert(res)
    }

    return(
        <form action={addBookingVal}>
                    <table className="table-auto border-seperate border-spacing-2">
                        <tbody>
                            <tr>
                                <td>Hotel: </td>
                                <td>Hotel Name</td>
                            </tr>
                            <tr>
                                <td>Room: </td>
                                <td>123</td>
                            </tr>
                            <tr>
                                <td>Booking Starts: </td>
                                <td><input type="date" required name="bookingStart" id="bookingStart" min={today} value={bookingStart} onChange={(event)=>{setBookingStart(event.target.value)}} className='w-full'></input></td>
                            </tr>
                            <tr>
                                <td>Booking Ends: </td>
                                <td><input type="date" required name="bookingEnd" id="bookingEnd" min={bookingStart} max={bookingEndMax} value={bookingEnd} onChange={(event)=>{setBookingEnd(event.target.value)}} className='w-full'></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='w-full flex justify-center items-center p-2'>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Save</button>
                    </div>
                </form>
    )
}