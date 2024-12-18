const {default: mongoose} = require('mongoose');

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        if(connect.connection.readyState === 1) console.log('DB connected successfully');
        else console.log('DB connecting');
    } catch(error) {
        console.log('DB connection failed');
        throw new Error(error);
    }
}

module.exports = dbConnect;