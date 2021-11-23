const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus };

            const vouchers = await Voucher.find()
                .populate("category")
                .populate("nominals");
            res.render("admin/voucher/v_voucher", { vouchers, alert });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
        }
    },
    create: async (req, res) => {
        try {
            const categories = await Category.find();
            const nominals = await Nominal.find();
            res.render("admin/voucher/create", { categories, nominals });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
        }
    },
    store: async (req, res) => {
        try {
            const { name, category, nominals } = req.body;
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
                        const voucher = new Voucher({
                            name,
                            category,
                            nominals,
                            thumbnail: filename,
                        });
                        await voucher.save();
                        req.flash("alertMessage", "Berhasil tambah voucher");
                        req.flash("alertStatus", "success");

                        res.redirect("/voucher");
                    } catch (err) {
                        req.flash("alertMessage", `${err.message}`);
                        req.flash("alertStatus", "danger");
                        res.redirect("/voucher");
                    }
                });
            } else {
                let voucher = await Voucher({ name, category, nominals });
                await voucher.save();

                req.flash("alertMessage", "Berhasil tambah voucher");
                req.flash("alertStatus", "success");

                res.redirect("/voucher");
            }
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const categories = await Category.find();
            const nominals = await Nominal.find();
            const voucher = await Voucher.findOne({ _id: id })
                .populate("category")
                .populate("nominals");
            res.render("admin/voucher/edit", { voucher, categories, nominals });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, category, nominals } = req.body;
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
                        const voucher = await Voucher.findOne({ _id: id });
                        let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
                        if (fs.existsSync(currentImage)) {
                            fs.unlinkSync(currentImage);
                        }
                        await Voucher.findOneAndUpdate(
                            { _id: id },
                            {
                                name,
                                category,
                                nominals,
                                thumbnail: filename,
                            }
                        );

                        req.flash("alertMessage", "Berhasil ubah voucher");
                        req.flash("alertStatus", "success");

                        res.redirect("/voucher");
                    } catch (err) {
                        req.flash("alertMessage", `${err.message}`);
                        req.flash("alertStatus", "danger");
                        res.redirect("/voucher");
                    }
                });
            } else {
                await Voucher.findOneAndUpdate(
                    { _id: id },
                    { name, category, nominals }
                );

                req.flash("alertMessage", "Berhasil ubah voucher");
                req.flash("alertStatus", "success");
                res.redirect("/voucher");
            }
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            const voucher = await Voucher.findOneAndRemove({ _id: id });
            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            if (fs.existsSync(currentImage)) {
                fs.unlinkSync(currentImage);
            }
            req.flash("alertMessage", "Berhasil hapus voucher");
            req.flash("alertStatus", "success");
            res.redirect("/voucher");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
        }
    },
    actionStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const voucher = await Voucher.findOne({ _id: id });
            let status = voucher.status === "Y" ? "N" : "Y";
            await Voucher.findByIdAndUpdate({ _id: id }, { status });

            req.flash("alertMessage", "Berhasil ubah status voucher");
            req.flash("alertStatus", "success");
            res.redirect("/voucher");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
        }
    },
};
