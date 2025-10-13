const {Schema, model} = require("mongoose");
const {AVATAR_IMG} = require("../config");
const UserShema = new Schema({
    firstName: {type: String, required: true, min: [3, "Ime mora sadrzati bar 3 karaktera!"]},
    lastName: {type: String, required: true, min: [3, "Prezime mora sadrzati bar 3 karaktera!"]},
    email: {
        type: String, required: [true, "Email je obavezan."], unique: true
    },
    password: {type: String, required: [true, "Lozainka je obavezna."]},
    role: {
        type: String, default: "guest",
        enum: {
            values: ["admin", "manager", "visitors", "guest"],
            message: "{VALUE} nije validna uloga!"
        }
    },
    favorites: [{type: Schema.ObjectId}],
    active: {type: Boolean, default: false},
    avatar: {type: String, default: AVATAR_IMG}
}, {
    timestamps: true
});

const UserModel = model("users", UserShema);
module.exports = UserModel;