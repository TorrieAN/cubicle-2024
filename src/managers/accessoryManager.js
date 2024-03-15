const Accessory = require('../models/Accessory');

exports.getAll = () => Accessory.find();

exports.getAvailable = (accessoryIds) => Accessory.find({ _id: { $nin: accessoryIds }});

exports.create = (accessoryData) => Accessory.create(accessoryData);

