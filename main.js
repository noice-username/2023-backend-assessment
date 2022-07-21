// express
const express = require('express');
global.app = express();
app.use(express.json());
app.use(express.static('.'));

// cookie session
const session = require('cookie-session');
app.use(session({
	name: 'session',
	keys: ["SPhL-is-c00L-1337"],
	httpOnly: true,
	maxAge: 5184000000 // two months
}));

// login route
app.post("/login", (req, res) => {
  if (req.body.user == 'chris' && req.body.pass == 'password') {
    req.session.user = req.body.user;
    res.json({ "success": true });
  }
  else {
    res.json({ "success": false });
  }
}); 

// announcements route: return announcements for logged-in users only
const fs = require("fs");
const announcements = JSON.parse(fs.readFileSync("announcements.json"));
app.post("/announcements", (req, res) => {
  res.json({ "success": true, "announcements": announcements });
});

app.listen(9001, "127.0.0.1");