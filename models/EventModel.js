const {model, Schema} = require("mongoose");

const UserSchema = new Schema({
    id: {type: Schema.ObjectId},
    fullName: {type: String}
}, {_id: false});

const EventSchema = new Schema({
        title: {
            type: String,
            required: [true, "Naslov je obavezan!"],
            min: [5, "Minimalna duzina naslova je 5 karaktera!"]
        },
        thumbnail: {type: String, required: [true, "Naslovna slika je obavezna!"]},
        decription: {
            type: String,
            required: [true, "Detalji dogadjaja su obavezni!"],
            min: [10, "Minimalana duzina je 10!"]
        },
        user: {type: Schema.ObjectId, required: [true, "Obavezno je dodati autora!"]},
        likes: [UserSchema],
        startAt: {type: Date, required: [true, "Pocetak dogadjaja je obavezan!"]},
        endAt: {type: Date, required: [true, "Kraj dogadjaja je obavezan!"]}
    },
    {timestamps: true});

const EventModel = model("events", EventSchema);
module.exports = EventModel;