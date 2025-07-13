const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


main()
 .then(() => {
    console.log("connection successful");
 })
 .catch((err) => {
    console.log(err);
 });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// const chat1 = new Chat({
//     from: "shradha",
//     msg: "send me your resume",
//     to: "aman",
//     created_at: new Date()
// });

// chat1.save()
//  .then((res) => {
//     console.log(res);
//  })
//  .catch((err) => {
//     console.log(err);
//  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.set("")
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("welcome.ejs");
});

app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("home.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/chats", (req, res) => {
    let {from, msg, to} = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date()
    });
    newChat.save().then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err);
    });
    res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat }); 
});

app.patch("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg } = req.body;
    let updateChat = await Chat.findByIdAndUpdate(
        id, 
        {msg: msg},
        {created_at: new Date}, 
        {runValidators: true, new: true}
    );
    res.redirect("/chats");
});

app.delete("/chats/:id", (req, res) => {
            let { id } = req.params;
            Chat.findByIdAndDelete(id).then((data) => {
                res.redirect("/chats");
            }).catch((err) => {
                console.log(err);
            });
});

app.listen(8080, (req, res) => {
    console.log("server listening to port: 8080");
});