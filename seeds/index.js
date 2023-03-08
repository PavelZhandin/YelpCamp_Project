const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // YOUR USER ID
      author: "640754300cf62e28a07338d4",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dnjekfbuv/image/upload/v1622723970/YelpCamp/a8oygfkfmhpobd5d5c8x.jpg",
          filename: "YelpCamp/yiv01x915djcv2asg8rp",
        },
        {
          url: "https://res.cloudinary.com/dnjekfbuv/image/upload/v1622723970/YelpCamp/a8oygfkfmhpobd5d5c8x.jpg",
          filename: "YelpCamp/y0vteve5bc1zvclwbess",
        },
        {
          url: "https://res.cloudinary.com/dnjekfbuv/image/upload/v1622723970/YelpCamp/a8oygfkfmhpobd5d5c8x.jpg",
          filename: "YelpCamp/ws1a510xzw4e5fk2vdgg",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("Connection closed");
});
