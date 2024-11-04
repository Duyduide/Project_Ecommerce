const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true
    },
    origin: {
        type: String,
        trim: true
    },
    manufacturer: {
        type: String,
        trim: true
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0
    },
    warrantyPeriod: {
        type: String,
        trim: true
    },
    warrantyPolicy: {
        type: String,
        trim: true
    },
    imageLink: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

const phoneSchema = new mongoose.Schema({
    camera: {
        type: String,
        trim: true
    },
    battery: {
        type: String,
        trim: true
    },
    ramRom: {
        type: String,
        trim: true
    },
    processor: {
        type: String,
        trim: true
    },
    screen: {
        type: String,
        trim: true
    },
    sim: {
        type: String,
        trim: true
    },
    connection: {
        type: String,
        trim: true
    }
});

const Phone = Product.discriminator('Phone', phoneSchema);

const laptopSchema = new mongoose.Schema({
    cpu: {
        type: String,
        trim: true
    },
    gpu: {
        type: String,
        trim: true
    },
    ram: {
        type: String,
        trim: true
    },
    battery: {
        type: String,
        trim: true
    },
    screen: {
        type: String,
        trim: true
    },
    hardDrive: {
        type: String,
        trim: true
    },
    connectionPorts: {
        type: String,
        trim: true
    }
});

const Laptop = Product.discriminator('Laptop', laptopSchema);

const tabletSchema=new mongoose.Schema({
    camera: {
        type: String,
        trim: true
    },
    battery: {
        type: String,
        trim: true
    },
    ramRom: {
        type: String,
        trim: true
    },
    processor: {
        type: String,
        trim: true
    },
    screen: {
        type: String,
        trim: true
    },
    sim: {
        type: String,
        trim: true
    },
    connection: {
        type: String,
        trim: true
    }
});

const Tablet = Product.discriminator('Tablet', tabletSchema);

const smartWatchSchema=new mongoose.Schema({
    battery: {
        type: String,
        trim: true
    },
    screen: {
        type: String,
        trim: true
    },
    connection: {
        type: String,
        trim: true
    },
    certificate: {
        type: String,
        trim: true
    }
});

const SmartWatch = Product.discriminator('SmartWatch', smartWatchSchema);

const powerbankSchema=new mongoose.Schema({
    capacity: {
        type: String,
        trim: true
    },
    input: {
        type: String,
        trim: true
    },
    output: {
        type: String,
        trim: true
    },
    numOfPorts: {
        type: String,
        trim: true
    }
});

const PowerBank = Product.discriminator('PowerBank', powerbankSchema);

const headphoneSchema=new mongoose.Schema({
    battery: {
        type: String,
        trim: true
    },
    connection: {
        type: String,
        trim: true
    },
    certificate: {
        type: String,
        trim: true
    },
    typeOfHeadphone: {
        type: String,
        trim: true
    }
});

const Headphone = Product.discriminator('Headphone', headphoneSchema);

const chargerSchema=new mongoose.Schema({
    input: {
        type: String,
        trim: true
    },
    output: {
        type: String,
        trim: true
    },
    typeOfPort: {
        type: String,
        trim: true
    }
});

const Charger = Product.discriminator('Charger', chargerSchema);

const caseSchema=new mongoose.Schema({
    material: {
        type: String,
        trim: true
    },
    color: {
        type: String,
        trim: true
    },
    typeOfCase: {
        type: String,
        trim: true
    }
});

const Case = Product.discriminator('Case', caseSchema);

const mouseSchema=new mongoose.Schema({
    connection: {
        type: String,
        trim: true
    },
    sensor: {
        type: String,
        trim: true
    },
    battery: {
        type: String,
        trim: true
    },
    weight: {
        type: String,
        trim: true
    }
});

const Mouse = Product.discriminator('Mouse', mouseSchema);

const keyboardSchema=new mongoose.Schema({
    connection: {
        type: String,
        trim: true
    },
    layout: {
        type: String,
        trim: true
    },
    size: {
        type: String,
        trim: true
    }
});

const Keyboard = Product.discriminator('Keyboard', keyboardSchema);

module.exports = { Product, Phone, Laptop, Tablet, SmartWatch, PowerBank, Headphone, Charger, Case, Mouse, Keyboard };

