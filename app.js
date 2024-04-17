const express = require("express")

const app = express();

app.get("/", (req, res) => res.send("Pagina principal"))

app.listen(3050, () => {console.log("Server running on port", 3050)})