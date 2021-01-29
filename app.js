const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const router = require ("./router/index");
const session = require('express-session')

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', router);


app.listen(port, () => {
    console.log(`ported at ${port}`);
})
