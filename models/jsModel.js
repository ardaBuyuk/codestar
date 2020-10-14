const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const javascriptSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Bu alan boş bırakılamaz."
    },
    description: {
        type: String,
        required: "Bu alan boş bırakılamaz."
    },
    javascript: {
        type: String,
        required: "Bu alan boş bırakılamaz."
    },
    author: {
        type:String
    }
});

javascriptSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Javascript",javascriptSchema);