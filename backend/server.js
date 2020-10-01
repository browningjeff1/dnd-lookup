const express = require('express'),
      cors = require('cors'),
      dbConfig = require('./config/db.config');


const controller = require('./controllers/auth.controller');

const app = express();
const port = 8080;

var corsOptions = {
  origin: "http://10.0.0.186:8081"
}

app.use(cors(corsOptions));
app.use(express.json());

const db = require('./models');
const Role = db.role;


db.mongoose
  .connect(`mongodb+srv://browningjeff:${dbConfig.PASSWORD}@cluster0.fi1fc.gcp.mongodb.net/${dbConfig.DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Sucessfully connected to MongoDB");
    initial();
  })
  .catch(err => {
    console.error("Connection error: ", err);
    process.exit();
  })

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log('error', err)
        }
        console.log('Added user role to the collection')
      })

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log('error', err)
        }
        console.log('Added moderator role to the collection')
      })

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log('error', err)
        }
        console.log('Added admin role to the collection')
      })
    }
  })
}



app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend baby" })
})



app.put(
  "/saved",
  controller.saved
);

app.post("/saved", controller.findSaved)

app.delete("/saved", controller.unsave) 


// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(port, '10.0.0.186', 511, () => {
  console.log(`Server is running on port: ${port}`);
});

