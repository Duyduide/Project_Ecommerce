const Voucher = require('../models/voucherModel');

const createVoucher = async (req, res) => {
    try {
        const { userID, voucherData } = req.body;

        // Verify if the user is an admin
        const user = await User.findById(userID);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const voucher = new Voucher(voucherData);
        await voucher.save();
        res.status(201).json(voucher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateVoucher = async (req, res) => {
    try {
        const { userID, voucherCode, updateData } = req.body;

        // Verify if the user is an admin
        const user = await User.findById(userID);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const voucher = await Voucher.findOneAndUpdate({ voucherCode }, updateData, { new: true });
        if (!voucher) {
            return res.status(404).json({ message: 'Voucher not found' });
        }

        res.status(200).json(voucher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteVoucher = async (req, res) => {
    try {
        const { userID, voucherCode } = req.body;

        // Verify if the user is an admin
        const user = await User.findById(userID);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const voucher = await Voucher.findOneAndDelete({ voucherCode });
        if (!voucher) {
            return res.status(404).json({ message: 'Voucher not found' });
        }

        res.status(200).json({ message: 'Voucher deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const findVoucherByCode = async (req, res) => {
    try {
        const { voucherCode } = req.params;

        const voucher = await Voucher.findOne({ voucherCode });
        if (!voucher) {
            return res.status(404).json({ message: 'Voucher not found' });
        }

        res.status(200).json(voucher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createVoucher,
    updateVoucher,
    deleteVoucher,
    findVoucherByCode
}