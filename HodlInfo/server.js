const express = require("express");
const axios = require("axios");
const cors = require("cors");
const configDB = require("./BackEnd/config/db");
const Cripto = require("./BackEnd/models/criptoDataModel");
const criptoRouter = require("./BackEnd/routes/criptoRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5500;

configDB();

const fetchCriptoData = async () => {
  try {
    const response = await axios.get(`${process.env.API_END_POINT}`);
    const criptoDatas = await response.data;
    const finalCriptoData = Object.values(criptoDatas).slice(0, 10);

    for (const data of finalCriptoData) {
      const existing = await Cripto.findOne({ name: data.name });

      if (!existing) {
        const criptoData = new Cripto({
          name: data.name,
          last: data.last,
          buy: data.buy,
          sell: data.sell,
          volume: data.volume,
          base_unit: data.base_unit,
        });

        await criptoData.save();
      }
    }
  } catch (err) {
    console.log("Erron on Fetching Cripto Data ", err);
  }
};

const startServer = async () => {
  try {
    await fetchCriptoData();
    app.use("/", criptoRouter);

    app.listen(PORT, () => {
      console.log("Server is running on ", PORT);
    });
  } catch (err) {
    console.log("Error on starting server ", err);
  }
};

startServer();
