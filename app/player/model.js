const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const HASH_ROUND = 12;

let playerSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email harus diisi"],
        },
        name: {
            type: String,
            required: [true, "Nama harus diisi"],
            maxlength: [225, "Tidak boleh melebihi 225 karakter"],
        },
        username: {
            type: String,
            required: [true, "Username harus diisi"],
            maxlength: [225, "Harus terdiri dari 5 - 225 karakter"],
            minlength: [5, "Harus terdiri dari 5 - 225 karakter"],
        },
        password: {
            type: String,
            required: [true, "Password harus diisi"],
            maxlength: [225, "Tidak boleh melebihi 225 karakter"],
        },
        phoneNumber: {
            type: String,
            required: [true, "Nomor HP harus diisi"],
            maxlength: [13, "Harus terdiri dari 9 - 13 karakter"],
            minlength: [9, "Harus terdiri dari 9 - 13 karakter"],
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        avatar: {
            type: String,
        },
        fileName: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Y", "N"],
            default: "Y",
        },
        favorite: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    },
    { timestamp: true }
);

playerSchema.path("email").validate(
    async function (value) {
        try {
            const count = await this.model("Player").countDocuments({
                email: value,
            });
            return !count;
        } catch (err) {
            throw err;
        }
    },
    (attr) => `${attr.value} sudah terdaftar.!`
);

playerSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next();
});

module.exports = mongoose.model("Player", playerSchema);
