//TODO: seeds script should come here, so we'll be able to put some data in our local env

var mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

require("../models/User");
require("../models/Item");
require("../models/Comment");

var User = mongoose.model("User");
var Item = mongoose.model("Item");
var Comment = mongoose.model("Comment");

let users = [];
let items = [];
let comments = [];

const usersSeeds = async () => {
  for (let i = 0; i < 100; i++) {
    let u = new User({ username: i, email: `${i}@${i}.c` });
    u.setPassword(`${i}`);
    users.push(u);
  }
  users = await User.insertMany(users);
};

const itemsSeeds = async () => {
  for (let i = 0; i < 100; i++) {
    let x = new Item({
      title: `${i}`,
      description: "nice",
      tagList: [],
      image: "",
    });
    x.seller = users[i]._id;
    items.push(x);
  }
  items = await Item.insertMany(items);
};

const commentSeeds = async () => {
  for (let i = 0; i < 100; i++) {
    let c = new Comment({ body: "nice" });
    c.item = items[0]._id;
    c.seller = users[i]._id;
    comments.push(c);
  }
  comments = await Comment.insertMany(comments);
  comments = comments.map((c) => c._id);
  await Item.findOneAndUpdate({ _id: items[0]._id }, { comments: comments });
};

const func = async () => {
  await usersSeeds();
  await itemsSeeds();
  await commentSeeds();
  mongoose.disconnect();
};

func();
