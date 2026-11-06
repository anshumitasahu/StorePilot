console.log("Hello via Bun!");

import express, { type Express, type Request, type Response } from 'express';
import cors from "cors";
import productRoutes from "./route/productRoutes";
import customerRoutes from "./route/customerRoutes";
import orderRoutes from "./route/orderRoutes";

const app: Express = express();

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(3000);