const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// REGISTER
exports.register = async (req, res) => {
    try {
        const { nom, login, password, role } = req.body;

        //ken l user mawjoud wale fel base
        const exists = await User.findOne({ login });
        if (exists) {
            return res.status(400).json({ message: "Login déjà utilisé" });
        }

        //hachage mta3 l mdp 
        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            nom,
            login,
            password: hashedPassword,
            role
        });

        await user.save(); //ysir save lel user fl bd

        return res.status(201).json({
            message: "Utilisateur créé avec succès"
        });

    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur", error: err });
    }
};


//LOGIN

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;

        // tsir verification lel login wel mdp fel base 
        const user = await User.findOne({ login });
        if (!user) {
            return res.status(400).json({ message: "Login ou mot de passe incorrect" });
        }

        //bch tsir comparaison binet l mot de passe l mecrypti weli jebneh ml login
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Login ou mot de passe incorrect" });
        }


        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        return res.json({
            message: "Connexion réussie",
            token,
            user: {
                id: user._id,
                nom: user.nom,
                login: user.login,
                role: user.role
            }
        });

    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur", error: err });
    }
};