const Document = require("./Docs")
const http = require('http');
const mongoose = require('mongoose')
const server = http.createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
  },
});
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});


const defaultValue = ""
let dname
io.on('connection', (socket) => {
  console.log('A user connected');


  // socket.on("send-changes", delta => {
  //   socket.broadcast.to(dname).emit("receive-changes", delta)
  // })  





  // socket.on('disconnect', () => {
  //   console.log('A user disconnected');
  // });
});

io.on("connection", socket => {

  socket.on('id-send', (documentName) => {
    console.log('Received documentName from the client:', documentName);
    dname = documentName;
    socket.join(dname);
    console.log('Saved documentName on the server as dname:', dname);
  });




  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })

  socket.on("getdoc", async documentId => {
    const document = await findDocument()
    socket.emit("gotdoc",document)
  })


})







async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}

async function findDocument() {
  try {
    const documents = await Document.find({});
    console.log(documents)
    return documents;
  } catch (error) {
    console.error("Error while fetching the documents:", error);
    throw error; // You might want to handle this error accordingly
  }
}



const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
