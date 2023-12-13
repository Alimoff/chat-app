import mongoose from 'mongoose';
import {app} from './app';
import http from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3003;
const PASSWORD = process.env.MONGOOSE_PASSWORD;

const server = http.createServer(app);



(async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://alimov:${PASSWORD}@chat-app.taio4zb.mongodb.net/?retryWrites=true&w=majority`
      )
      console.log('Connect to mongo db database ✅');
      server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}  💻`);
      });

      const io = new Server(server, {
        cors: {
            origin:'http://localhost:3000',
            methods: ["GET","POST"],},
    })
    
    io.on('connection', (socket)=>{
        console.log(`New user just connected with ID ${socket.id}`); 

        socket.on("joinRoom", (data) =>{
          socket.join(data)
          console.log(`User: ${socket.id} connected to: ${data} room`)
        })

        socket.on("sendMessage", (data)=>{
          socket.to(data.room).emit('receiveMessage', data)
        })
    
        socket.on("disconnect", () =>{
            console.log(`A user ${socket.id} disconnected`)
        })

    
    });

    } catch ( message) {
      console.log(`error => `, message);
    }
})();