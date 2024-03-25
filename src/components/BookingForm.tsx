"use client"
import { useState } from 'react';
import addBooking from '@/libs/addBooking';
import { redirect } from 'next/navigation';

export default function BookingForm({userId, token}:{userId:string, token:string}){
    const today = new Date().toISOString().substr(0, 10);
    const [bookingStart, setBookingStart] = useState(today);
    const [bookingEnd, setBookingEnd] = useState(today);
    const [uid, setuid] = useState(userId);
    const bookingEndMax = new Date(new Date(bookingStart).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10);
    const addBookingVal = async () => {
        //console.log(token)
        if(bookingEnd < bookingStart){
            alert("Booking end date cannot be before booking start date")
            return
        }
        const res = await addBooking(uid, bookingStart, bookingEnd, '660069f48bf9a3f1211f8cf0', '65e0564d0ce1407644808cf7', token)
        console.log(res)
        if(!res.success){
            alert(res.message)
            return
        }
        window.location.href = "/bookings/manage"
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
                                <td><input type="date" required name="bookingEnd" id="bookingEnd" value={bookingEnd} min={bookingStart} max={bookingEndMax} onChange={(event)=>{setBookingEnd(event.target.value)}} className='w-full'></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='w-full flex justify-center items-center p-2'>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Book</button>
                    </div>
                </form>
    )
}