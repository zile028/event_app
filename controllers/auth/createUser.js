const bcrypt = require("bcryptjs");
const UserModel = require("../../models/UserModel");
const nodemailer = require("nodemailer");
const { MAIL_CONFOG, MAIL_USER, SERVER_URL } = require("../../config");

const salt = 10;

const createUser = async (req, res, next) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const errors = {};
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const transporter = nodemailer.createTransport(MAIL_CONFOG);

    try {
       
        if (!regexEmail.test(email)){
             errors.email = "Email nije validan.";
        }
        if (password !== confirmPassword){
             errors.confirmPassword = "Lozinke se ne poklapaju.";
        }

       
        if (Object.keys(errors).length > 0) {
            return res.render("auth/registerView", { errors });
        }

        // Provera da li korisnik već postoji
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            errors.email = "Ovaj email je već registrovan.";
            return res.render("auth/registerView", { errors });
        }

        // Heš lozinke
        const hashedPassword = await bcrypt.hash(password, salt);

        // Kreiranje korisnika
        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // Slanje mejla
        await transporter.sendMail({
            from: `"EventApp" <${MAIL_USER}>`,
            to: email,
            subject: "Registracija na EventApp ✔",
            html: `
                <h3>Uspešna registracija!</h3>
                <p>Hvala, ${firstName}! Registracija je uspešna.</p>
               <p>Verifikuj svoj nalog klikom na link ispod:</p>
                <a href="${SERVER_URL}/auth/verify/${savedUser._id}">Aktiviraj nalog</a>
            `,
        });

        res.redirect("/auth/login");

    } catch (error) {
        next(error);
    }
};

module.exports = createUser;
