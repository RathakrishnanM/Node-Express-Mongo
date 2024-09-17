const cripto = require("../models/criptoDataModel");

exports.getCriptoDataController = async (req, res) => {
  const data = await cripto.find();
  return res.json(data);
};
