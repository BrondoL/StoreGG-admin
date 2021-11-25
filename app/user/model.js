const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email harus diisi"],
        },
        name: {
            type: String,
            required: [true, "Nama harus diisi"],
        },
        password: {
            type: String,
            required: [true, "Password harus diisi"],
        },
        phoneNumber: {
            type: String,
            required: [true, "Nomor HP harus diisi"],
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "admin",
        },
        status: {
            type: String,
            enum: ["Y", "N"],
            default: "Y",
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
