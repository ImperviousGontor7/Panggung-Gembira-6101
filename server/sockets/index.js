import {Server}
from "socket.io";


import agendaSocket
from "./agenda.socket.js";


import forumSocket
from "./forum.socket.js";



export function initSocket(server){



const io =
new Server(
server,
{

cors:{

origin:
process.env.CLIENT_URL ||
"http://localhost:5173",

credentials:true

}

}

);





agendaSocket(io);


forumSocket(io);



return io;


}