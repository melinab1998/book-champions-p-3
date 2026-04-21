import express from "express";
import bookRoutes from "./routes/books.routes.js"
import "./models/Book.js"
import { sequelize } from "./db/db.js";

import { PORT } from "./config.js";

const app = express();

try {
    app.use(express.json()); 
    app.listen(PORT);
    app.use(bookRoutes);
    await sequelize.sync({ alter: true })
    console.log(`Server listening on port ${PORT}`);
} catch (error) {
    console.log(`There was an error on initialization`);
}


