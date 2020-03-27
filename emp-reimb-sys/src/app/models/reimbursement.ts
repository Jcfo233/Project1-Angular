import { Employee } from './employee';


export class Reimbursement {
    id: number;
    amount: number;
    submitted: string;
    resolved: string;
    description: string;
    receipt: string | ArrayBuffer;
    author: number;
    resolver: number;
    status: string;
    type: string;

}