
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createOrders = async (req: Request, res: Response) => {
    try {
        const { customerId, items } = req.body;

        const order = await prisma.order.create({
            data: {
                customerId,
                orderItems: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                }
            },
            include: {
                customer: true,
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        });

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order
        });

    } catch (error: any) {
        console.error("createOrders error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create order"
        });
    }
};


export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                customer: true,
                orderItems: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        });

    } catch (error: any) {
        console.error("getOrders error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders"
        });
    }
};
