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
let chats = [
    {
        from: "shradha",
        msg: "send me your resume",
        to: "aman",
        created_at: new Date()
    },
    {
        from: "harry",
        msg: "send me your test results",
        to: "aman",
        created_at: new Date()
    },
    {
        from: "aman",
        msg: "hello",
        to: "shreya",
        created_at: new Date()
    },
    {
        from: "code",
        msg: "hii",
        to: "babbar",
        created_at: new Date()
    },
    {
        from: "rahul",
        msg: "send me your exam sheets",
        to: "aman",
        created_at: new Date()
    },
    {
        from: "abc",
        msg: "send me your questions",
        to: "xyz",
        created_at: new Date()
    }
];
Chat.insertMany(chats)
 .then((data) => {
    console.log(data);
 })
 .catch((err) => {
    console.log(err);
 });