import type { Request, Response } from 'express';
import { prisma } from "../lib//prisma"

export const createProducts = async (req: Request, res: Response) => {
    try {
        const { name, price } = req.body;

        const product = await prisma.product.create({
            data: {
                name,
                price
            }
        })

        return res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: product
        })

    } catch (error: any) {
        console.error("createProducts error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create products",
        });
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany()

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: products
        })

    } catch (error: any) {
        console.error("getProducts error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
        });
    }
}