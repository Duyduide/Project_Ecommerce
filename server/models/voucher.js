const mongoose=require('mongoose');

const voucherSchema=new mongoose.Schema({
    membership:[
        {
            type:String,
            required:true,
            trim:true
        }
    ],
    discount:{
        type:Number,
        required:true,
        min:0
    },
    validUntil:{
        type:Date,
        required:true
    },
    validFrom:{
        type:Date,
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    maxPriceDiscount:{
        type:Number,
        required:true,
        min:0
    },
    voucherCode:{
        type:String,
        required:true,
        trim:true
    },
    isHidden:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

const Voucher=mongoose.model('Voucher',voucherSchema);

module.exports={Voucher};