<<<<<<< HEAD
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("MONGO_URI =", process.env.MONGO_URI);

        if (!process.env.MONGO_URI) {
            throw new Error("La variable d'environnement MONGO_URI est introuvable !");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connexion MDB réussite ");
    } catch (err) {
        console.error("Erreur de connexion MDB :", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
=======
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("MONGO_URI =", process.env.MONGO_URI);

        if (!process.env.MONGO_URI) {
            throw new Error("La variable d'environnement MONGO_URI est introuvable !");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connexion MDB réussite ");
    } catch (err) {
        console.error("Erreur de connexion MDB :", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
>>>>>>> 3ddc9d87b8420d2fd2f2f444a336a1b008db4658
