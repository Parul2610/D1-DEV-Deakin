const express = require("express");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

const app = express();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY
});



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(__dirname));

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/website.html");
// });

app.post("/subscribe", async (req, res) => {
    const email = req.body.email;

    try {
        const response = await mg.messages.create(
            process.env.MAILGUN_DOMAIN,
            {
                from: `DEV@Deakin <mailgun@${process.env.MAILGUN_DOMAIN}>`,
                to: email,
                subject: "Welcome to DEV@Deakin",
                text: "Thank you for subscribing to DEV@Deakin!"
            }
        );

        console.log("Email sent successfully!");
        console.log("Mailgun response:", response);

        res.status(202).send("Thank you for subscribing!");
    } catch (error) {
        console.error("Mailgun error:", error);

        res.status(500).send("There was an error sending the email.");
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});