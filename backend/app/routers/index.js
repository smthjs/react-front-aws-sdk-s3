const { Router } = require("express");
const objects = require("./objects.router");
const files = require("./files.router");

const router = Router();

router.use("/api/objects", objects);
router.use("/api/files", files);

module.exports = router;
