const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    // njibo token mel header
    const token = req.headers["authorization"];

    //  token obligatoire
    if (!token) {
        return res.status(401).json({ message: "Token manquante" });
    }

    try {
        // nfaskhou le mot "Bearer" bech ne5thou e token e s7i7
        const realToken = token.split(" ")[1];

        // nthabtou token b secret key
        const decoded = jwt.verify(realToken, process.env.JWT_SECRET);


        req.userId = decoded.id;

        // net3adew lel étape el jeya
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token non valide" });
    }
};
