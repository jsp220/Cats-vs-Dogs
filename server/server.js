const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { Word } = require('./models');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const seedWords = require('./seeds/data');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    Word.find({})
      .then((words) => {
        if (words.length === 0) {
          Word.insertMany(seedWords);
          console.log("Words seeded");
        }
      })

    // app.listen(PORT, () => {
    //   console.log(`API server running on port ${PORT}!`);
    //   console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    // })

    http.listen(PORT, () => {
      console.log(`Socket.IO server running at http://localhost:${PORT}/`);

    });
  })
};

// Call the async function to start the server
io.on('connection', (socket) => {
  // Every time localhost:PORT connection is made
  // show message on console.
  console.log(":electric_plug: User connected!");
  
  socket.on("send_users", (data) => {
    console.log(`new user detected`);
    io.emit("receive_users", data);
  })

  socket.on("send_game_start", (data) => {
    console.log("game is starting");
    io.emit("receive_game_start", data);
  })

  socket.on('send_message', (message) => {
    console.log("message detected");
    io.emit('receive_message', message); 
  });

  socket.on("send_clue", (data) => {
    console.log(`clue: ${data.clue} submitted`);
    io.emit("receive_clue", data);
  })

  socket.on("send_end_turn", (data) => {
    console.log(`end turn received, turn: ${data.turn}`);
    io.emit("receive_end_turn", data);
  })

  socket.on("send_card_click", (data) => {
    console.log(`card clicked on position ${data.i}`);
    io.emit("receive_card_click", data);
  })
});

startApolloServer(typeDefs, resolvers);
