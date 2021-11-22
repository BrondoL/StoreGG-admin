const Category = require("./model");

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus };
            const categories = await Category.find();
            res.render("admin/category/v_category", { categories, alert });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/category");
        }
    },
    create: async (req, res) => {
        try {
            res.render("admin/category/create");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/category");
        }
    },
    store: async (req, res) => {
        try {
            const { name } = req.body;
            let category = await Category({ name });
            await category.save();

            req.flash("alertMessage", "Berhasil tambah kategori");
            req.flash("alertStatus", "success");

            res.redirect("/category");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/category");
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findOne({ _id: id });
            res.render("admin/category/edit", { category });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/category");
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            await Category.findOneAndUpdate({ _id: id }, { name });

            req.flash("alertMessage", "Berhasil ubah kategori");
            req.flash("alertStatus", "success");

            res.redirect("/category");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/category");
        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            await Category.findOneAndRemove({ _id: id });
            req.flash("alertMessage", "Berhasil hapus kategori");
            req.flash("alertStatus", "success");
            res.redirect("/category");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("statusMessage", "danger");
            res.redirect("/category");
        }
    },
};
