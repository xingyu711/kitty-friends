var express = require('express');
var router = express.Router();

const myDB = require('../db/myDB.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;

function auth(req, res) {
  if (!req.session.username) {
    res.status(401).send({ err: 'user not logged in' });
    return false;
  }
  return true;
}

/* Get cats data */
router.get('/getCats', async (req, res) => {
  // TODO: pagination
  try {
    if (!auth(req, res)) {
      return;
    }

    const dataRaw = await myDB.getCats();
    const data = [];

    // TODO: DO NOT PROCESS DATA HERE, process data in a seperate file
    dataRaw.forEach((cat) => {
      data.push({
        cat_id: cat._id,
        age: cat.age,
        gender: cat.gender,
        size: cat.size,
        breed: cat.breed,
        photo: eval(cat.med_photos)[0],
      });
    });
    res.status(200).send({ cats: data });
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
        // save username to session
        req.session.username = username;
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
    const username = req.body.username;
    const password = req.body.password;
    // ask db to validate this user
    const hash = await myDB.getPassword(username);

    // user does not exist
    if (hash == null) {
      res.status(401).send({ login: 'User not found' });
    } else {
      const match = await bcrypt.compare(password, hash);
      if (match == true) {
        // save username to session if successfully logged in
        req.session.username = username;
        res.sendStatus(200);
      } else {
        res.status(401).send({ login: 'Wrong password' });
      }
    }
  } catch (e) {
    console.error('Error', e);
    res.status(400).send({ err: e });
  }
});

router.get('/logoutUser', async (req, res) => {
  try {
    if (!auth(req, res)) {
      return;
    }
    delete req.session.username;
    res.sendStatus(200);
  } catch (e) {
    console.error('Error', e);
    res.status(400).send({ err: e });
  }
});

/* Save a cat to user's collections */
router.post('/saveCat', async (req, res) => {
  try {
    if (!auth(req, res)) {
      return;
    }

    const username = req.session.username;
    const catId = req.body.cat_id;

    await myDB.addToCollections(username, catId);
    res.sendStatus(200);
  } catch (e) {
    console.error('Error', e);
    res.status(400).send({ err: e });
  }
});

/* Unsave a cat from user's collections */
router.post('/unsaveCat', async (req, res) => {
  try {
    if (!auth(req, res)) {
      return;
    }

    const username = req.session.username;
    const catId = req.body.cat_id;

    await myDB.deleteFromCollections(username, catId);
    res.sendStatus(200);
  } catch (e) {
    console.error('Error', e);
    res.status(400).send({ err: e });
  }
});

/* Load data saved in user's collections */
router.get('/getCollections', async (req, res) => {
  try {
    if (!auth(req, res)) {
      return;
    }

    const username = req.session.username;

    const savedCats = await myDB.getUserCollections(username);
    res.status(200).send({ collections: savedCats });
  } catch (e) {
    console.error('Error', e);
    res.status(400).send({ err: e });
  }
});

router.post('/postCat', async (req, res) => {
  try {
    if (!auth(req, res)) {
      return;
    }

    // get username from session and add username to data object
    const username = req.session.username;

    // get data from request body. ASSUMED: data in correct format and photo is a url string
    console.log(req.body);
    const catData = req.body;
    catData.username = username;

    await myDB.addCat(catData);

    res.sendStatus(200);
  } catch (e) {
    console.error('Error', e);
    res.status(400).send({ err: e });
  }
});

/* delete a post in user's home page */
router.post('/deletePost', async (req, res) => {
  try {
    if (!auth(req, res)) {
      return;
    }
    const username = req.session.username;
    const catId = req.body.cat_id;

    await myDB.deleteFromPosts(username, catId);
    res.sendStatus(200);
  } catch (e) {
    console.error('Error', e);
    res.status(400).send({ err: e });
  }
});

/* Get all posts created by user */
router.get('/getPosts', async (req, res) => {
  try {
    if (!auth(req, res)) {
      return;
    }
    const username = req.session.username;

    const userPosts = await myDB.getUserPosts(username);

    res.status(200).send({ posts: userPosts });
  } catch (e) {
    console.error('Error', e);
    res.status(400).send({ err: e });
  }
});

router.get('/getPersonName', async (req, res) => {
  try {
    const username = req.session.username;

    //ask db to find the user's display name
    const displayName = await myDB.getUserDisplayName(username);
    res.status(200).send({ displayName: displayName });
  } catch (e) {
    console.error('Error', e);
    res.status(400).send({ err: e });
  }
});

module.exports = router;
