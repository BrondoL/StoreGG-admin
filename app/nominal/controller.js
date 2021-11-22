const Nominal = require("./model");

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus };

            const nominals = await Nominal.find();
            res.render("admin/nominal/v_nominal", { nominals, alert });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/nominal");
        }
    },
    create: async (req, res) => {
        try {
            res.render("admin/nominal/create");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/nominal");
        }
    },
    store: async (req, res) => {
        try {
            const { coinQuantity, coinName, price } = req.body;
            let nominal = await Nominal({ coinName, coinQuantity, price });
            await nominal.save();

            req.flash("alertMessage", "Berhasil tambah nominal");
            req.flash("alertStatus", "success");

            res.redirect("/nominal");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/nominal");
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const nominal = await Nominal.findOne({ _id: id });
            res.render("admin/nominal/edit", { nominal });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/nominal");
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { coinQuantity, coinName, price } = req.body;
            await Nominal.findOneAndUpdate(
                { _id: id },
                { coinQuantity, coinName, price }
            );

            req.flash("alertMessage", "Berhasil ubah nominal");
            req.flash("alertStatus", "success");

            res.redirect("/nominal");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/nominal");
        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            await Nominal.findOneAndRemove({ _id: id });
            req.flash("alertMessage", "Berhasil hapus nominal");
            req.flash("alertStatus", "success");
            res.redirect("/nominal");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/nominal");
        }
    },
};
