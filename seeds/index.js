const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "608318b05033f6180ca76e8d",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price,
            images: [
                {                  
                    url: 'https://res.cloudinary.com/dnjekfbuv/image/upload/v1622711957/YelpCamp/AAE93Um_bnt5ng.jpg',
                    filename: 'YelpCamp/yiv01x915djcv2asg8rp'
                  },
                  {
                    url: 'https://res.cloudinary.com/dnjekfbuv/image/upload/v1622712001/YelpCamp/wallpaperbetter.com_1920x1080_of1yht.jpg',
                    filename: 'YelpCamp/y0vteve5bc1zvclwbess'
                  },
                  {
                    url: 'https://res.cloudinary.com/dnjekfbuv/image/upload/v1622712130/YelpCamp/wallpaperbetter.com_7680x4320_vdwc9f.jpg',
                    filename: 'YelpCamp/ws1a510xzw4e5fk2vdgg'
                  }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!'
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Connection closed')
})