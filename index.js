/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000 // So we can run on heroku || (OR) localhost:5000

const app = express();

const session = require('express-session');

// Route setup. You can implement more in the future!
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03');
const ta04Routes = require('./routes/ta04');
const ta05Routes = require('./routes/ta05');

app.use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
  })

app.use(bodyParser.urlencoded({
  extended: true
})) // For parsing the body of a POST
  .use(bodyParser.json())
  .use('/ta01', ta01Routes)
  .use('/ta02', ta02Routes)
  .use('/ta03', ta03Routes)
  .use('/ta04', ta04Routes)
  .use('/ta05', ta05Routes)
  .use('/prove01', require('./routes/prove01'))
  .use('/prove02', require('./routes/prove02'))
  .use('/prove08', require('./routes/prove08'))
  .use('/prove09', require('./routes/prove09'))
  .use('/prove10', require('./routes/prove10'))
  .use('/prove11', require('./routes/prove11'))
  .use('/prove12', require('./routes/prove12'))



  .get('/', (req, res, next) => {
    // This is the primary index, always handled last. 
    res.render('pages/index', {
      title: 'Welcome to my CSE341 repo',
      path: '/'
    });
  })
  .use((req, res, next) => {
    // 404 page
    res.render('pages/404', {
      title: '404 - Page Not Found',
      path: req.url
    })
  })

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('Client is connected.');
  socket
    .on('new-superhero', update => {
      if (update) {
        socket.broadcast.emit('update-list');
      } else {
        console.log('List NOT UPDATED!')
      }
    })
    .on('disconnect', () => {
      console.log(`${socket.username} disconnected.`)
    })
    .on('newUser', (username) => {
        // A new user logs in.
      socket.username = username
      const message = `${username} has logged on.`
        socket.broadcast.emit('newMessage', {
          message,
          from: 'admin'
        })
    })
    .on('message', data => {
        // Receive a new message
        console.log('Message received')
        socket.broadcast.emit('newMessage', {
            ...data
        }) // <-----TODO----- Note, only emits to all OTHER clients, not sender.
    })
})