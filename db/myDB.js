const { MongoClient } = require('mongodb');
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

module.exports = {
  getCats,
  registerUser,
  getPassword,
};
