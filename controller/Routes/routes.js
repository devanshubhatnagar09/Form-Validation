const fs = require("fs");
const path = require('path');
const axios = require('axios');
const filePath = path.join(__dirname, '..', '..', 'src', 'json', 'file.json');
const apiFilePath = path.join(__dirname, '..', '..', 'src', 'json', 'api.json');

function routes(app) {
    app.get("/", (request, response) => {
        response.render("index");
    });
    app.post("/send", async (request, response) => {
        const arr = [];
        const fileData = `{"name" : "${request.body.name}","email" : "${request.body.email}","password" : "${request.body.password}", "file" : "${request.files[0].filename}", "file2" : "${request.files[1].filename}"}`;
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
            }
            else if (data != "") {
                data = JSON.parse(data);
                console.log(data)
                data.forEach(element => {
                    arr.push(JSON.stringify(element));
                });
                arr.push(fileData);
                fs.writeFile(filePath, `[${arr}]`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        response.redirect("/");
                    }
                });
            }
            else {
                fs.writeFile(filePath, `[${fileData}]`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        response.redirect("/");
                    }
                });
            }
        });
    });
    app.get("/first", (request, response) => {
        axios.get('https://www.fruityvice.com/api/fruit/all').then(resp => {
            const writestream = fs.createWriteStream(apiFilePath);
            writestream.write(JSON.stringify(resp.data));
            writestream.end();
            response.json(resp.data);
        });
    });
    app.get("/first/second", (request, response) => {
        async function getData() {
            const response = await axios.get('https://www.fruityvice.com/api/fruit/all');
            const data = await response.data;
            return data
        }
        getData().then(data => {
            response.json(data);
        });
    });
    app.get("/zendesk", (request, response) => {
        var data = JSON.stringify({
            "left_object": {
                "metadata": {
                    "ID": 123
                },
                "name": "zendesk:ticket1"
            },
            "link_type": "example_link",
            "right_object": {
                "metadata": {
                    "ID": 456
                },
                "name": "external:object1"
            }
        });

        var config = {
            method: 'POST',
            url: 'https://support.zendesk.com/api/services/zis/links/my_integration',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log("done")
            })
            .catch(function (error) {
                console.log("error");
            }
            );
    });


}


module.exports = routes