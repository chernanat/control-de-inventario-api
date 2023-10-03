const { Router } = require("express");
const { rickAndMortyApi } = require("../controller/base.controller");
//middleware en caso de ser necesario
const { baseMiddleware } = require("../middlewares/middleware");
const router = Router();

router.get("/getcharacters", baseMiddleware, rickAndMortyApi);

module.exports = router;
