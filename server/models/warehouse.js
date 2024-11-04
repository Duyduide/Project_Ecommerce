const mongoose=required('mongoose');

const warehouseSchema=new mongoose.Schema({
    location:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
});

const Warehouse=mongoose.model('Warehouse',warehouseSchema);

const warehouseProductSchema=new mongoose.Schema({
    productId:{
        type: { type: Schema.Types.ObjectId, ref: 'Product' },
        required: true
    },
    warehouseId:{
        type: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
        required: true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    }
});

const WarehouseProduct=mongoose.model('WarehouseProduct',warehouseProductSchema);

module.exports={Warehouse,WarehouseProduct};