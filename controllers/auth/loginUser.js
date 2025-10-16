const bcrypt = require("bcryptjs");

const loginUser = async (req, res, next) => {
  const { password } = req.body;
  const user = req.locals; 
  const errors = {};

  try {
    if (!user) {
      errors.email = "Korisnik sa ovim emailom ne postoji ili nije aktivan.";
      return res.render("auth/login", { errors });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      errors.password = "Pogrešna lozinka.";
      return res.render("auth/login", { errors });
    }

    console.log("Uspešno logovan:", user.email);
    res.redirect("/"); 

  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
