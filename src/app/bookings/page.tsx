import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DateSelector from "@/components/DateSelector";

export default async function Bookings(){

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">
                New Reservations 
            </div>
            <div className="bg-slate-100 rounded-lg space-y-5 w-fit px-10 py-5 flex flex-col">
                <TextField label="Name" variant="standard" name="Name" value={profile.data.name} InputProps={{readOnly: true,}}/>
                <TextField label="Hotel" variant="standard" name="Hotel" value={"HotelName"} InputProps={{readOnly: true,}}/>
                <TextField label="Room" variant="standard" name="Room" value={"RoomNumber"} InputProps={{readOnly: true,}}/>
                <DateSelector pickerLabel="Booking starts" />
                <DateSelector pickerLabel="Booking ends" />
            </div>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">
                Book this room
            </button>
        </main>
    )
}