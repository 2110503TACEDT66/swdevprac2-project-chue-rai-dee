export default async function updateBooking(bookingId:string, bookingStart: string, bookingEnd: string, token: string, roomId: string) {
    const response = await fetch(`https://hotel-reservation-api-phi.vercel.app/api/v1/bookings/${bookingId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({bookingbegin: bookingStart, bookingend: bookingEnd, room: roomId}),
    });
  
    return await response.json();
  }