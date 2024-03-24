export interface hotelItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    __v: number,
    id: string
  }
  
export interface hotelJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: hotelItem[]
  }
  
export interface BookingItem{
    name:string;
    surname: string;
    id: string;
    hospital: string;
    bookDate: string;
  }