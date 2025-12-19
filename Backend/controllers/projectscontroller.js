const Project = require("../models/Project");


// CREATation mta3 projet

const createProject = async (req, res) => {
    try {
        const { nom, description, statut } = req.body;


        const project = new Project({
            nom,
            description,
            statut: statut || "en cours",
            proprietaire: req.userId
        });

        await project.save(); //enregistre l projet

        res.status(201).json({ message: "Projet créé", project });

    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", err });
    }
};


//get

const getMyProjects = async (req, res) => {
    try {
        //bch tsir get mta3 les projet mta3 utilisateur mou3ayen
        const projects = await Project.find({ proprietaire: req.userId });

        res.json(projects);

    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", err });
    }
};


//GET ALL 

const getAllProjects = async (req, res) => {
    try {

        const projects = await Project.find().populate("proprietaire");//ken l manager 3and l access bch ychouf les projet

        res.json(projects);

    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", err });
    }
};


//Mise a jour du projet

const updateProject = async (req, res) => {
    try {
        const id = req.params.id;


        const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });

        res.json(updated);

    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", err });
    }
};


//Suppression d un projet

const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;

        await Project.findByIdAndDelete(id);

        res.json({ message: "Projet supprimé" });

    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", err });
    }
};


//Recherche 

const searchProjects = async (req, res) => {
    try {
        const { q } = req.query;

        //rech tsir bl nom
        const projects = await Project.find({
            nom: { $regex: q, $options: "i" }
        });

        res.json(projects);

    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", err });
    }
};

module.exports ={

    createProject,
    getAllProjects,
    updateProject,
    deleteProject,
    searchProjects


}