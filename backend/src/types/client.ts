import { type Response } from "express";

export interface Client {
    id: number;
    deviceId?: string;
    res?: Response;
}