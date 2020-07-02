const HeritageSite = require('../models/heritageSite.model.js');
const mongoose = require('mongoose');

exports.create = (request, response) => {

  if(!request.body) {
    return response.status(400).send({
        message: "New object cannot be empty"
    });
  }

  const newHeritageSite = new HeritageSite({
    name: request.body.name,
    type: request.body.type,
    period: request.body.period,
    description: request.body.description,
    ownership: request.body.ownership,
    date: request.body.date,
    location: request.body.location,
    size: request.body.size,
    access: request.body.access,
    website: request.body.website
  });

  newHeritageSite.save()
  .then(data => {
      console.log(" - Successfully created a new Heritage Site ");
      response.send(data);
  })
  .catch(error => {
      response.status(500).send({
          message: error.message || " An error occurred while creating the new Heritage Site "
      });
  });
};

exports.findAll = (request, response) => {

  HeritageSite.find()
  .then(heritageSites => {
      response.send(heritageSites);
      console.log(" -  Sent all heritage sites");
  })
  .catch(error => {
      response.status(500).send({
          message: error.message || "An error occurred while retrieving all heritage sites"
      });
  });
};

exports.findOne = (request, response) => {

  HeritageSite.findById(request.params.id)
  .then(heritageSite => {
      if(!heritageSite) {
          return response.status(404).send({
              message: " Heritage site not found with id " + request.params.id
          });
      }
      console.log(" - Sent product " + heritageSite._id);
      response.send(heritageSite);
  })
  .catch(error => {
      if(error.kind === 'ObjectId') {
          return response.status(404).send({
              message: "product not found with id " + request.params.productId
          });
      }
      return response.status(500).send({
          message: "Error retrieving product with id " + request.params.productId
      });
  });
};

exports.update = (request, response) => {

  if(!request.body) {
    return response.status(400).send({
      message: "Update content cannot be empty"
    });
  }

  HeritageSite.findByIdAndUpdate(request.params.id, req.body, { new: true })
  .then(heritageSite => {
    if(!heritageSite) {
      return response.status(404).send({
        message: "Heritage site not found with id " + request.params.id
      });
    }

    response.send(heritageSite);
    console.log(" - Updated order: " + request.params.id);
  })
  .catch(error => {
    if(error.kind === 'ObjectId') {
      return response.status(404).send({
        message: "Order not found with id " + request.params.id
      });
    }
    return response.status(500).send({
      message: "Error updating Order with id " + request.params.id
    });
  });
};

exports.delete = (request, response) => {

  HeritageSite.findByIdAndRemove(request.params.id)
  .then(heritageSite => {
    if(!heritageSite) {
      return response.status(404).send({
          message: "Heritage site not found with id " + request.params.id
      });
    }
    response.send({message: "Heritage site deleted successfully!"});
    console.log(" - Deleted Heritage site: " + request.params.id);
  })
  .catch(error => {
    if(error.kind === 'ObjectId' || error.name === 'NotFound') {
      return response.status(404).send({
        message: "Heritage site not found with id " + request.params.id
      });
    }
    return response.status(500).send({
      message: "Could not delete heritage site with id " + request.params.id
    });
  });
};
