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
    const { receiverId, ...others } = data;
    const user = activeUsers.find((user) => user.id === receiverId);

    if (user) {
      io.to(user.socketId).emit("receiveMessage", others);
      // io.to(user.socketId).emit("setLastMessage", others);
    }
  });

  socket.on("updateMessage", (data) => {
    const { receiverId, isLastMessage, ...others } = data;
    const user = activeUsers.find((user) => user.id === receiverId);

    if (user) {
      io.to(user.socketId).emit("changeMessage", others);
      if (isLastMessage) {
        io.to(user.socketId).emit("setLastMessage", others);
      }
    }
  });

  socket.on("disconnect", () => {
    // TODO when user A too fast reload page, user B online chip will hide and then immidiatly show. Think about delay
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getUsers", activeUsers);
  });
});
