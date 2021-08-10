var app = require("express")();

var websites = [
    "e621",
    "rule34",
    "dojki",
    "xbooru",
    "pornhub"
]

var tags = [
    "pony porn",
    "big ass classic"
]

function random(low, max) {
    return Math.floor(Math.random() * (max - low))
}

function encode(json) {
    result = "";
    lastKey = Object.keys(json)[this.length - 1];
    for (var key in json) {
        result += `${key}=${json[key]}; `
    }
    return result;
}

app.get("/", (req, res) => {
    if (Math.random() > 0.5) {
        var time = new Date(Date.now() - random(10000, 1000))
            .toISOString()
            .split("T")[1]
            .split(".")[0];

        var response = {
            "is_m": "yes",
            "m_site": websites[random(0, websites.length - 1)],
            "how_m": time,
            "na_chto_m": tags[random(0, tags.length - 1)]
        }

        if (req.query.is_json == "true") return res.send(response);
        return res.send(encode(response));
    }
    if (req.query.is_json == "true") return res.send({ "is_m": "no" });
    return res.send(encode({ "is_m": "no" }));
})

app.listen(3000);