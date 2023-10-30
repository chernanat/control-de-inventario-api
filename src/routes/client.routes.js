const { Router } = require("express");
const {
  getClient,
  createClient,
  getClients,
  updateClient,
  deleteClient,
} = require("../controller/client.controller");

//validador
const { requestValidate } = require("../validators/client.validator");

const router = Router();

router.get("/getclient/:id", getClient);

router.post("/createclient", requestValidate, createClient);

router.get("/getclients", getClients);

router.put("/updateclient/:id", updateClient);

router.delete("/deleteclient/:id", deleteClient);

module.exports = router;
