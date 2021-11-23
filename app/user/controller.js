const User = require("./model");
const bcrypt = require("bcryptjs");

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus };
            if (req.session.user === null || req.session.user === undefined) {
                return res.render("admin/sign-in", { alert, layout: false });
            }
            res.redirect("/dashboard");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/");
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                req.flash("alertMessage", `Akun tidak ditemukan`);
                req.flash("alertStatus", "danger");
                return res.redirect("/");
            }
            if (user.status !== "Y") {
                req.flash("alertMessage", `Akun anda belum aktif`);
                req.flash("alertStatus", "danger");
                return res.redirect("/");
            }
            const check = await bcrypt.compare(password, user.password);
            if (!check) {
                req.flash("alertMessage", `Login Failed`);
                req.flash("alertStatus", "danger");
                return res.redirect("/");
            }

            req.session.user = {
                id: user._id,
                email: user.email,
                status: user.status,
                name: user.name,
            };
            return res.redirect("/dashboard");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            return res.redirect("/");
        }
    },
};
