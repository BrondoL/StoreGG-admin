const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
    {
        historyVoucherTopup: {
            gameName: {
                type: String,
                required: [true, "Nama game harus diisi"],
            },
            category: {
                type: String,
                required: [true, "Kategori game harus diisi"],
            },
            thumbnail: {
                type: String,
            },
            coinName: {
                type: String,
                required: [true, "Nama koin harus diisi"],
            },
            coinQuantity: {
                type: String,
                required: [true, "Jumlah koin harus diisi"],
            },
            price: {
                type: Number,
            },
        },
        historyPayment: {
            name: {
                type: String,
                required: [true, "Nama harus diisi"],
            },
            type: {
                type: String,
                required: [true, "Tipe pembayaran harus diisi"],
            },
            bankName: {
                type: String,
                required: [true, "Nama bank harus diisi"],
            },
            noRekening: {
                type: String,
                required: [true, "Nomor Rekening harus diisi"],
            },
        },
        name: {
            type: String,
            required: [true, "Nama harus diisi!"],
            maxlength: [225, "Harus terdiri dari 9 - 225 karakter"],
            minlength: [9, "Harus terdiri dari 9 - 225 karakter"],
        },
        accountUser: {
            type: String,
            required: [true, "Nama akun harus diisi!"],
            maxlength: [225, "Harus terdiri dari 9 - 225 karakter"],
            minlength: [9, "Harus terdiri dari 9 - 225 karakter"],
        },
        tax: {
            type: Number,
            default: 0,
        },
        value: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["pending", "failed", "success"],
            default: "pending",
        },
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },
        historyUser: {
            name: {
                type: String,
                required: [true, "Nama player harus diisi"],
            },
            phoneNumber: {
                type: String,
                required: [true, "Nomor HP harus diisi!"],
                maxlength: [13, "Harus terdiri dari 9 - 13 karakter"],
                minlength: [9, "Harus terdiri dari 9 - 13 karakter"],
            },
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
