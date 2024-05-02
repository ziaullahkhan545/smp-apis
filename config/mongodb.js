
const mongoose =require('mongoose');
require('dotenv').config();

mongoose.connection.once('open', () => { console.log('mongoDB connected successfully') });

mongoose.connection.on('error', (error) => { console.log(error) });

async function mongoConnect() {
    await mongoose.connect(process.env.MONGO_DB);
}

module.exports = {
    mongoConnect
}