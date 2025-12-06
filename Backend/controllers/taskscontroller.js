const Task = require("../models/Task");


//Création mta3 task

exports.createTask = async (req, res) => {
  try {
    const { titre, description, statut, deadline, projet } = req.body;

    const task = new Task({
      titre,
      description,
      statut,
      deadline,
      projet,
      assigne: null 
    });

    await task.save();

    res.status(201).json({ message: "Tâche créée", task });

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", err });
  }
};


//get task selon l project

exports.getTaskByProject = async (req, res) => {
  try {
    const projectId = req.params.projetId;

    const tasks = await Task.find({ projet: projectId }).populate("assigne");

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", err });
  }
};


//mise a jour 

exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;

    const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", err });
  }
};


//suppression

exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    await Task.findByIdAndDelete(id);

    res.json({ message: "Tâche supprimée" });

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", err });
  }
};


//Assignementt du task

exports.assignTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { userId } = req.body;

    const updated = await Task.findByIdAndUpdate(
      taskId,
      { assigne: userId },
      { new: true }
    ).populate("assigne");

    res.json({ message: "Tâche assignée", updated });

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", err });
  }
};


//Recherche du task

exports.searchTasks = async (req, res) => {
  try {
    const { q } = req.query;

    const tasks = await Task.find({
      titre: { $regex: q, $options: "i" }
    });

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", err });
  }
};
