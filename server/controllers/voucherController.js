const { Voucher } = require('../models/voucher');

const createVoucher = async (req, res) => {
    try {
        const { voucherData } = req.body;

        const voucher = new Voucher(voucherData);
        await voucher.save();
        res.status(201).json({
            success: voucher? true : false,
            voucherData: voucher? voucher : 'Cannot create voucher'
        });
    } catch (error) {
        res.status(500).json({ success: false, voucherData: error.message });
    }
};

const updateVoucher = async (req, res) => {
    try {
        const { voucherCode, updateData } = req.body;

        const voucher = await Voucher.findOneAndUpdate({ voucherCode }, updateData, { new: true });
        if (!voucher) {
            return res.status(404).json({ success: false, voucherData: 'Voucher not found' });
        }

        res.status(200).json({
            success: voucher? true : false,
            voucherData: voucher? voucher : 'Cannot update voucher'
        });
    } catch (error) {
        res.status(500).json({ success: false, voucherData: error.message });
    }
};

const deleteVoucher = async (req, res) => {
    try {
        const { voucherCode } = req.params;

        const voucher = await Voucher.findOneAndDelete({ voucherCode });
        if (!voucher) {
            return res.status(404).json({ success: false, voucherData: 'Voucher not found' });
        }

        res.status(200).json({
            success: true,
            voucherData: 'Voucher deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, voucherData: error.message });
    }
}

const findVoucherByCode = async (req, res) => {
    try {
        const { voucherCode } = req.params;

        const now = new Date();
        const voucher = await Voucher.findOne({ 
            validUntil: { $gte: now }, 
            voucherCode , 
            validFrom: { $lte: now },
            quantity: { $gt: 0 } 
        });
        if (!voucher) {
            return res.status(404).json({ success: false, voucherData: 'Voucher not found' });
        }

        res.status(200).json({
            success: voucher? true : false,
            voucherData: voucher? voucher : 'Cannot get voucher'
        });
    } catch (error) {
        res.status(500).json({ success: false, voucherData: error.message });
    }
};

const queryAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: vouchers? true : false,
            voucherData: vouchers? vouchers : 'Cannot get vouchers'
        });
    } catch (error) {
        res.status(500).json({ success: false, voucherData: error.message });
    }
};

const queryPublicVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find({ isHidden: false }).sort({ createdAt: -1 });
        res.status(200).json({
            success: vouchers? true : false,
            voucherData: vouchers? vouchers : 'Cannot get vouchers'
        });
    } catch (error) {
        res.status(500).json({ success: false, voucherData: error.message });
    }
};

const queryAvailablePublicVouchers = async (req, res) => {// sẽ thêm tính toán sao cho giá được giảm là cao nhất
    try {
        const { userMembership } = req.params;

        const now = new Date();
        const vouchers = await Voucher.find({
            membership: { $in: [userMembership] },
            isHidden: false,
            validUntil: { $gte: now },
            validFrom: { $lte: now },
            quantity: { $gt: 0 } 
        }).sort({ createdAt: -1 });
        // const validVouchers = vouchers.filter(voucher => 
        //     voucher.membership.includes(membership) && 
        //     new Date(voucher.validUntil) > now
        // );
        res.status(200).json({
            success: vouchers? true : false,
            voucherData: vouchers? vouchers : 'Cannot get vouchers'
        });
    } catch (error) {
        res.status(500).json({ success: false, voucherData: error.message });
    }
};

// const queryVoucherByDiscount = async (req, res) => {
//     try {
//         const { discount } = req.params;

//         const vouchers = await Voucher.find({ discount });
//         if (!vouchers.length) {
//             return res.status(404).json({ message: 'No vouchers found' });
//         }

//         res.status(200).json(vouchers);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

module.exports = {
    createVoucher,
    updateVoucher,
    deleteVoucher,
    findVoucherByCode,
    queryAllVouchers,
    queryPublicVouchers,
    queryAvailablePublicVouchers,
}