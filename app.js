import express from 'express';
import morgan from "morgan";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);

const dbUri = `mongodb+srv://${username}:${password}@cluster0.coeumlm.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(dbUri);


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Method", "POST, GET, DELETE, PATCH, PUT");
        return res.status(200).json({});
    }
    next();
});

app.use("/notes", notesRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: { message: error.message }
    });
});

export default app;
