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
    saleDiscountRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    slug: {
        type: String,
        trim: true
    },
},{
    timestamps:true
}
);

const Product = mongoose.model('product', productSchema);

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

const Phone = Product.discriminator('phone', phoneSchema);

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

const Laptop = Product.discriminator('laptop', laptopSchema);

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

const Tablet = Product.discriminator('tablet', tabletSchema);

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

const SmartWatch = Product.discriminator('smartwatch', smartWatchSchema);

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

const PowerBank = Product.discriminator('powerbank', powerbankSchema);

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

const Headphone = Product.discriminator('headphone', headphoneSchema);

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

const Charger = Product.discriminator('charger', chargerSchema);

const caseSchema=new mongoose.Schema({
    material: {
        type: String,
        trim: true
    },
    color: {
        type: String,
        trim: true
    },
    productSupported: {
        type: String,
        trim: true
    }
});

const Case = Product.discriminator('case', caseSchema);

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

const Mouse = Product.discriminator('mouse', mouseSchema);

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

const Keyboard = Product.discriminator('keyboard', keyboardSchema);

module.exports = { Product, Phone, Laptop, Tablet, SmartWatch, PowerBank, Headphone, Charger, Case, Mouse, Keyboard };

