const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const htmlSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Bu alan boş bırakılamaz."
    },
    description: {
        type: String,
        required: "Bu alan boş bırakılamaz."
    },
    html: {
        type: String,
        required: "Bu alan boş bırakılamaz."
    },
    css: {
        type: String,
        required: "Bu alan boş bırakılamaz."
    },
    author: {
        type:String
    }
});

htmlSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Html",htmlSchema);