const Player = require("../player/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res) => {
        try {
            const payload = req.body;

            if (req.file) {
                let tmp_path = req.file.path;
                let originExt =
                    req.file.originalname.split(".")[
                        req.file.originalname.split(".").length - 1
                    ];
                let filename = req.file.filename + "." + originExt;
                let target_path = path.resolve(
                    config.rootPath,
                    `public/uploads/${filename}`
                );

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);
                src.pipe(dest);
                src.on("end", async () => {
                    try {
                        const player = new Player({
                            ...payload,
                            avatar: filename,
                        });
                        await player.save();
                        delete player._doc.password;
                        return res.status(201).json({ data: player });
                    } catch (err) {
                        if (err && err.name === "ValidationError") {
                            return res.status(422).json({
                                error: 1,
                                message: err.message,
                                fields: err.errors,
                            });
                        }
                        return res.status(500).json({
                            message: err.message,
                        });
                    }
                });
            } else {
                let player = new Player(payload);
                await player.save();
                delete player._doc.password;
                return res.status(201).json({ data: player });
            }
        } catch (err) {
            if (err && err.name === "ValidationError") {
                return res.status(422).json({
                    error: 1,
                    message: err.message,
                    fields: err.errors,
                });
            }
            return res.status(500).json({
                message: err.message,
            });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(422)
                .json({ message: "Email dan Password harus diisi.!" });
        }
        Player.findOne({ email })
            .then((player) => {
                if (!player) {
                    return res
                        .status(403)
                        .json({ message: "Email belum terdaftar.!" });
                }
                const check = bcrypt.compareSync(password, player.password);
                if (!check) {
                    return res
                        .status(403)
                        .json({ message: "Password salah.!" });
                }
                const token = jwt.sign(
                    {
                        player: {
                            id: player._id,
                            username: player.username,
                            email: player.email,
                            name: player.name,
                            phoneNumber: player.phoneNumber,
                            avatar: player.avatar,
                        },
                    },
                    config.jwtKey
                );
                return res.status(200).json({
                    data: token,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    message: err.message || `Internal server error.!`,
                });
            });
    },
};
