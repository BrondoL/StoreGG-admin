module.exports = {
    isAdmin: (req, res, next) => {
        if (req.session.user === null || req.session.user === undefined) {
            req.flash("alertMessage", `Mohon maaf session anda telah habis`);
            req.flash("alertStatus", "danger");
            return res.redirect("/");
        } else {
            next();
        }
    },
};
