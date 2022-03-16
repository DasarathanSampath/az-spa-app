const express = require("express");
const path = require("path");

const app = express();

// Middleware loads before any routing
// Defines the static files location
app.use("/public", express.static(path.resolve(__dirname, "..", "public")));

//Any routing return to home page
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
});

app.listen(process.env.PORT || 4000, () => console.log("Server running @ http://localhost:4000"));