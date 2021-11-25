const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus };

            const payments = await Payment.find().populate("banks");
            res.render("admin/payment/v_payment", {
                payments,
                alert,
                name: req.session.user.name,
                title: "StoreGG | Payments",
            });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/payment");
        }
    },
    create: async (req, res) => {
        try {
            const banks = await Bank.find();
            res.render("admin/payment/create", {
                banks,
                name: req.session.user.name,
                title: "StoreGG | Form Tambah Payment",
            });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/payment");
        }
    },
    store: async (req, res) => {
        try {
            const { banks, type } = req.body;
            let payment = await Payment({ banks, type });
            await payment.save();

            req.flash("alertMessage", "Berhasil tambah payment");
            req.flash("alertStatus", "success");

            res.redirect("/payment");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/payment");
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const payment = await Payment.findOne({ _id: id }).populate(
                "banks"
            );
            const banks = await Bank.find();
            res.render("admin/payment/edit", {
                payment,
                banks,
                name: req.session.user.name,
                title: "StoreGG | Form Ubah Payment",
            });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/payment");
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { type, banks } = req.body;
            await Payment.findOneAndUpdate({ _id: id }, { type, banks });

            req.flash("alertMessage", "Berhasil ubah payment");
            req.flash("alertStatus", "success");

            res.redirect("/payment");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/payment");
        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            await Payment.findOneAndRemove({ _id: id });
            req.flash("alertMessage", "Berhasil hapus payment");
            req.flash("alertStatus", "success");
            res.redirect("/payment");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/payment");
        }
    },
    actionStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const payment = await Payment.findOne({ _id: id });
            let status = payment.status === "Y" ? "N" : "Y";
            await Payment.findByIdAndUpdate({ _id: id }, { status });

            req.flash("alertMessage", "Berhasil ubah status payment");
            req.flash("alertStatus", "success");
            res.redirect("/payment");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/payment");
        }
    },
};
