const express = require("express");
const cors = require("cors");
// const cookieParser = require("cookie-parser");

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};


const rootRouter = require("./routes/index");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
// app.use(cookieParser());

app.use("/api/v1", rootRouter);

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});