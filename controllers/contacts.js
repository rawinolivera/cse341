const mongodb = require("../db/connect");
const ObjectId = require('mongodb').ObjectId;

//get request for all (read)
const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('contacts').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};


//get request for single (read)
const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('contacts')
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// post request )(create)
const newContact = async (req, res, next) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db('contacts')
    .collection('contacts')
    .insertOne(contact);
  if(response.acknowledged){
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "Error, contact not created");
  }
}

//put request (update)
const updateContact = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db('contacts')
    .collection('contacts')
    .replaceOne({ _id: contactId }, contact);
  if(response.acknowledged){
    res.status(204).json(response);
  } else {
    res.status(500).json(response.error || "Error, contact not updated");
  }
}

//delete request (delete)
const deleteContact = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('contacts')
    .collection('contacts')
    .deleteOne({ _id: contactId }, true);
  if(response.acknowledged){
    res.status(200).json(response);
  } else {
    res.status(500).json(response.error || "Error, contact not deleted");
  }
}

module.exports = { getAll, getSingle, newContact, updateContact, deleteContact };