const mongoose = require("mongoose");

let bankSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Nama Pemilik harus diisi"],
        },
        bankName: {
            type: String,
            required: [true, "Nama Bank harus diisi"],
        },
        noRekening: {
            type: String,
            required: [true, "Nomor Rekening Bank harus diisi"],
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model("Bank", bankSchema);
