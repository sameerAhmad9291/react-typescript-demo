import { ICargo } from './ICargo';
import { IService } from './IService';

export interface IShipment {
    id: string;
    name: string;
    cargo: ICargo[];
    mode: string;
    type: string;
    destination: string;
    origin: string;
    services: IService[];
    total: number;
    status: string;
    userId: string;
}