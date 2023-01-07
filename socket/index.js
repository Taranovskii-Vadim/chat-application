const io = require("socket.io")(8080, {
  cors: { origin: "http://localhost:5173" },
});

let activeUsers = [];

io.on("connection", (socket) => {
  socket.on("addNewUser", (id) => {
    if (!activeUsers.some((user) => user.id === id)) {
      activeUsers.push({ id, socketId: socket.id });
    }

    io.emit("getUsers", activeUsers);
  });

  socket.on("sendMessage", (data) => {
    const { receiverId, chatId, ...others } = data;
    const user = activeUsers.find((user) => user.id === receiverId);

    if (user) {
      io.to(user.socketId).emit("receiveMessage", others);
      io.to(user.socketId).emit("receiveLastMessage", {
        chatId,
        text: others.text,
        senderId: others.senderId,
      });
    }
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", activeUsers);
  });
});
