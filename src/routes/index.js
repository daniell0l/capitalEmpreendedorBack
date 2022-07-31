"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-unused-vars */
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get("/", function (req, res, next) {
  res.send({ message: "OK" });
});
exports["default"] = router;
