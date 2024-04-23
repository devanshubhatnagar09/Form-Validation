function FilesController(app) {
    app.get("/script.js", (request, response) => {
        response.sendFile("/script.js");
    });
}

module.exports = FilesController;