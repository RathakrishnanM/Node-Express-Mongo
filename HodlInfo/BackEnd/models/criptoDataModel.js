const mongoose = require("mongoose");

const criptoSchema = mongoose.Schema({
  name: String,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String,
});

const cripto = mongoose.model(`${process.env.TABLE}`, criptoSchema);

module.exports = cripto;
