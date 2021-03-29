var express = require('express');
var router = express.Router();

const myDB = require('../db/myDB.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* Get cats data */
router.get('/getCats', async (req, res) => {
  // TODO: pagination
  try {
    const dataRaw = await myDB.getCats();
    const data = [];

    // TODO: DO NOT PROCESS DATA HERE, process data in a seperate file
    dataRaw.forEach((cat) => {
      data.push({
        id: cat._id,
        age: cat.age,
        gender: cat.gender,
        size: cat.size,
        breed: cat.breed,
        photo: eval(cat.med_photos)[0],
      });
    });
    res.status(200).send(data);
  } catch (e) {
    console.error('Error', e);
    res.status(400).send({ err: e });
  }
});

/* Register a user */
router.post('/registerUser', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    // hash password and save to db
    await bcrypt.hash(password, saltRounds, async function (err, hash) {
      const msg = await myDB.registerUser(username, hash, firstname, lastname);
      if (msg === 'success') {
        res.sendStatus(200);
      } else {
        res.status(409).send({ register: msg });
      }
    });
  } catch (e) {
    console.error('Error', e);
    res.status(400).send({ err: e });
  }
});

/* Login a user */
router.post('/loginUser', async (req, res) => {
  try {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    // ask db to validate this user
    const hash = await myDB.getPassword(username);

    // user does not exist
    if (hash == null) {
      res.status(401).send({ login: 'not found' });
    } else {
      const match = await bcrypt.compare(password, hash);
      if (match == true) {
        res.sendStatus(200);
      } else {
        res.status(401).send({ login: 'wrong password' });
      }
    }
  } catch (e) {
    console.error('Error', e);
    res.status(400).send({ err: e });
  }
});

module.exports = router;
