import type { Request, Response } from 'express';
import { prisma } from "../lib//prisma"

export const createCustomers = async (req: Request, res: Response) => {
    try {
        const { name, phone, address, email, countryCode } = req.body;

        const customer = await prisma.customer.create({
            data: {
                name,
                phone,
                address,
                email,
                countryCode
            }
        })

        return res.status(200).json({
            success: true,
            message: "Customer created successfully",
            data: customer
        })

    } catch (error: any) {
        console.error("createCustomers error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create customer",
            error: error.message
        });
    }
}

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await prisma.customer.findMany()

        return res.status(200).json({
            success: true,
            message: "Customers fetched successfully",
            data: customers
        })

    } catch (error: any) {
        console.error("getCustomers error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch customers",
        });
    }
}