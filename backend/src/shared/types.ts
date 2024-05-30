export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};
export type OwnerType = {
  _id: String;
    name: String;
    email: String;
    pass: String;
    phone: String;
    role: Number;
    img: String;
}
export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};

export type PetType ={
  _id: String;
    name: String;
    age: String;
    weigh: String;
    breed_id: String;
    owner_id: String;
    sex: String;
    breed_type: String;
    img: String;
}
export interface Pet {
  _id: string;
  name: string;
  type: string;
  age: string;
  weigh: string;
  breed_id: string;
  owner_id: string;
  sex: string;
  breed_type: string;
  img: string;
}