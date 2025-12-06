const User = require("../models/User");


module.exports = async (req, res, next) => {
  try {
    // njibo l'utilisateur bl id ml token
    const user = await User.findById(req.userId);

   
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // nverifiw l role lezmou manager 
    if (user.role !== "manager") {
      return res.status(403).json({ message: "Accès refusé (manager uniquement)" });
    }

    
    next();

  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};