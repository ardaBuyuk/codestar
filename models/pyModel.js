const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const pythonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Bu alan boş bırakılamaz."
    },
    description: {
        type: String,
        required: "Bu alan boş bırakılamaz."
    },
    python: {
        type: String,
        required: "Bu alan boş bırakılamaz."
    },
    author: {
        type:String
    }
});

pythonSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Python",pythonSchema);