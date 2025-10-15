const bcrypt = require("bcryptjs");
const UserModel = require("../../models/UserModel");

const loginUser = async (req, res, next) => {
  const { firstName, password } = req.body;
  const errors = {};

  try {
    // Provera da li postoji korisnik
    const user = req.locals
    if (!user) {
      errors.firstName = "Korisnik sa ovim usereom ne postoji.";
      return res.render("auth/login", { errors });
    }

    // Provera lozinke
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.password = "Pogrešna lozinka.";
      return res.render("auth/login", { errors });
    }

    console.log("Uspešno logovan:", user.firstName);
    res.redirect("/"); 

  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
