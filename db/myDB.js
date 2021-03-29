const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const DB_NAME = 'kittyFriendsDB';
const uri =
  'mmongodb+srv://test_user:password_test@cluster0.aijdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function getCats() {
  let client;

  try {
    // connect to db
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    // specify target collection
    const db = client.db(DB_NAME);
    const cats = db.collection('cats');

    // read data
    const query = {};
    const data = await cats.find(query).toArray();

    return data;
  } finally {
    client.close();
  }
}

async function registerUser(username, password, firstname, lastname) {
  let client;
  try {
    // connect to db
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    // specify target collection
    const db = client.db(DB_NAME);
    const users = db.collection('users');

    // check if the username already exist
    const currentUser = await users.findOne({ username: username });

    // if username already found, return
    if (currentUser != null) {
      return 'username alreay exists';
    }

    // else: save the user info into db
    const newUser = {
      username: username,
      password: password,
      first_name: firstname,
      last_name: lastname,
    };
    await users.insertOne(newUser);

    return 'success';
  } finally {
    client.close();
  }
}

async function getPassword(username) {
  let client;

  try {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db(DB_NAME);
    const users = db.collection('users');

    // get this user from db
    const currentUser = await users.findOne({ username: username });

    // if username not found, return null
    if (currentUser == null) {
      return null;
    }

    return currentUser.password;
  } finally {
    client.close();
  }
}

async function addToCollections(username, catId) {
  let client;

  try {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db(DB_NAME);
    const users = db.collection('users');

    // filter using username
    const filter = { username: username };

    // push the cat id to existing saved car array
    const updateDoc = { $push: { saved_cats: catId } };

    // check duplicates: avoid adding repetitive data to user's collections
    const document = await users.findOne(filter);
    const existingList = document.saved_cats;

    // if the user do not have anything in his or her collections
    // or the user's existing list does not have the new cat id
    // update document
    if (!existingList || !existingList.includes(catId)) {
      await users.updateOne(filter, updateDoc);
    }
  } finally {
    client.close();
  }
}

async function deleteFromCollections(username, catId) {
  let client;

  try {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db(DB_NAME);
    const users = db.collection('users');

    // filter using username
    const filter = { username: username };

    // get the existing list
    const document = await users.findOne(filter);
    const existingList = document.saved_cats;

    // constructing a new saved car list by excluding the unsaved one
    const newCarsList = [];
    existingList.forEach((id) => {
      if (id != catId) {
        newCarsList.push(id);
      }
    });

    // update the document
    const updateDoc = { $set: { saved_cats: newCarsList } };
    await users.updateOne(filter, updateDoc);
  } finally {
    client.close();
  }
}

// Given a username, find all cats in his or her collections
async function getUserCollections(username) {
  let client;

  try {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db(DB_NAME);
    const users = db.collection('users');
    const cats = db.collection('cats');

    if (!username) {
      return [];
    }

    // filter using username and get saved cars ids
    const filter = { username: username };
    const document = await users.findOne(filter);
    const savedCatIds = document.saved_cats;

    if (savedCatIds) {
      // find all documents in cars having these car ids
      const savedCats = await cats
        .find({
          _id: { $in: savedCatIds.map((id) => new ObjectId(id)) },
        })
        .toArray();
      return savedCats;
    }

    // if the user haven't yet save any cars
    return [];
  } finally {
    client.close();
  }
}

module.exports = {
  getCats,
  registerUser,
  getPassword,
  addToCollections,
  deleteFromCollections,
  getUserCollections,
};
