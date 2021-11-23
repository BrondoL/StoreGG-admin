const Bank = require("./model");

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus };

            const banks = await Bank.find();
            res.render("admin/bank/v_bank", { banks, alert });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/bank");
        }
    },
    create: async (req, res) => {
        try {
            res.render("admin/bank/create");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/bank");
        }
    },
    store: async (req, res) => {
        try {
            const { name, bankName, noRekening } = req.body;
            let bank = await Bank({ name, bankName, noRekening });
            await bank.save();

            req.flash("alertMessage", "Berhasil tambah bank");
            req.flash("alertStatus", "success");

            res.redirect("/bank");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/bank");
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const bank = await Bank.findOne({ _id: id });
            res.render("admin/bank/edit", { bank });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/bank");
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, bankName, noRekening } = req.body;
            await Bank.findOneAndUpdate(
                { _id: id },
                { name, bankName, noRekening }
            );

            req.flash("alertMessage", "Berhasil ubah bank");
            req.flash("alertStatus", "success");

            res.redirect("/bank");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/bank");
        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            await Bank.findOneAndRemove({ _id: id });
            req.flash("alertMessage", "Berhasil hapus bank");
            req.flash("alertStatus", "success");
            res.redirect("/bank");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/bank");
        }
    },
};
