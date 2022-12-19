const io = require("socket.io")(8080, {
  cors: { origin: "http://localhost:5173" },
});

let activeUsers = [];

io.on("connection", (socket) => {
  socket.on("newUserAdd", (id) => {
    if (!activeUsers.some((user) => user.id === id)) {
      activeUsers.push({ id, socketId: socket.id });
    }

    console.log("activeUsers", activeUsers);

    io.emit("getUsers", activeUsers);
  });

  socket.on("sendMessage", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log(user);
    if (user) {
      io.to(user.socketId).emit("receiveMessage", data);
    }
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("user disconnected", activeUsers);
    io.emit("getUsers", activeUsers);
  });
});
