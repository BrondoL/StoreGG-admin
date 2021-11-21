module.exports = {
    index: async (req, res) => {
        try {
            const data = {
                title: "Express",
            };
            res.render("index", data);
        } catch (err) {
            console.log(err);
        }
    },
};
