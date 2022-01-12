export interface ShopItem {
  _id: string;
  image: string;
  sellerId: string;
  title: string;
  imgRatio: string;
  completed: boolean;
  description: string;
  price: number;
  quantity: number;
  type: string;
  __v: number;
}

export interface OrderItem {
  item: {
    _id: string;
    image: string;
    sellerId: string;
    title: string;
    imgRatio: string;
    completed: boolean;
    description: string;
    price: number;
    quantity: number;
    type: string;
    __v: number;
  };
  qty: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  totalCost: number;
  customerId: string;
  paid: boolean;
  deliveryCodeTracking?: any;
  deliveryAddress: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Shop {
  items: ShopItem[];
  orders: Order[];
}

export interface Appointment {
  _id: string;
  appointmentDate: Date;
  appointmentEnd: Date;
  user: string;
  confirmed: boolean;
  rejected: boolean;
  __v: number;
}

export interface Availability {
  start: Date;
  end: Date;
  _id: string;
}

export interface Booking {
  appointments: Appointment[];
  availability: Availability[];
}
// === Creator Type ===
export interface CreatorType {
  shop: Shop;
  booking: Booking;
  _id: string;
  creatorType: string;
  __v: number;
}
