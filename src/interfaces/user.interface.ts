import { Types } from "mongoose";

interface IUser {
    _id: string;
    name?: string;
    email: string;
    mobile?: string;
    password: string;
    shippingAddress?: Types.ObjectId;
    blocked?: boolean;
    offerApplied?: boolean;
    role: 'user' | 'admin';
    createdAt: Date;
    location?: string;
}

export default IUser;