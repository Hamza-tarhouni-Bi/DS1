const express = require("express");
const router = express.Router();
const controller = require("../controllers/projects.controller");
const auth = require("../middlewares/authMiddleware.js");
const manager = require("../middlewares/roleMiddelware.js");


router.post("/", auth, controller.createProject);

//les projet mte3i
router.get("/mprojets", auth, controller.getMyProjects);

// tous les projets ken l manager 3andou l access
router.get("/all", auth, manager, controller.getAllProjects);

// udate bl id
router.put("/:id", auth, controller.updateProject);
// delete bl id
router.delete("/:id", auth, controller.deleteProject);

recherche
router.get("/search", auth, controller.searchProjects);

module.exports = router;