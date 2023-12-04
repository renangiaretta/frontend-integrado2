export interface ICourse {
    id: number;
    name: string;
    description: string;
    modality: string
    type: string;
    duration: number;
    price: number;
    userId: number;
}

export interface IUser {
    name: string;
    email: string;
    phone: string;
}