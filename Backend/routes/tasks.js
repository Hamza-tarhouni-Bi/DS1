const express = require("express");
const router = express.Router();
const controller = require("../controllers/tasks.controller");
const auth = require("../middlewares/authMiddleware.js");
const manager = require("../middlewares/roleMiddelware.js");


router.post("/", auth, controller.createTask);//creation 

// get l tache 
router.get("/:projetId", auth, controller.getTaskByProject);

// update 
router.put("/:id", auth, controller.updateTask);
//suppressionn
router.delete("/:id", auth, controller.deleteTask);

// assign
router.put("/assign/:id", auth, manager, controller.assignTask);

// recherche
router.get("/search/query", auth, controller.searchTasks);

module.exports = router;