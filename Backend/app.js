// dotenv config
const dotenv = require('dotenv');
dotenv.config();
 
const express = require('express');
const app = express();
app.set('trust proxy', 1);

const http = require("http");
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const path = require("path");

const chatmodel = require('./models/chatModel'); 

// database
const db = require('./configs/db_conn');
db();

//setting up cookies parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// routers
const userRouter = require('./routes/users');
const companyRouter = require("./routes/company");
const projectRouter = require("./routes/projects");
const ticketRouter = require("./routes/tickets");
const inviteRouter = require("./routes/invites");
const chatRouter = require("./routes/chat");

app.use("/uploads", express.static("uploads"));

// cors config
const cors = require('cors');
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  next();
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRouter);
app.use("/company", companyRouter);
app.use("/projects", projectRouter);
app.use("/tickets", ticketRouter);
app.use("/invites", inviteRouter);
app.use("/chats", chatRouter);

///socket io setup


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL, 
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(` User connected: ${socket.id} `);

    socket.on("joinTicket", (ticketId) => {
        socket.join(ticketId);
        console.log(`User ${socket.id} joined room: ${ticketId}`);
    });

    socket.on("sendMessage", async (data) => {
        try {
            const { ticketId, userId, message } = data;

            if (!message || !message.trim()) {
                return;
            }

            const newChat = await chatmodel.create({
                ticketId,
                userId,
                message,
            });

            const populatedChat = await chatmodel
                .findById(newChat._id)
                .populate('userId', 'name');

            io.to(ticketId).emit("receiveMessage", populatedChat);

        } catch (error) {
            console.error(`Error in sendMessage:`, error);
            socket.emit("error", { message: "Your message could not be sent." });
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
    console.log(`Server is running and listening for connections on port ${PORT}`);
});