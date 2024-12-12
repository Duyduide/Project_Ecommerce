const {Rating} = require('../models/rating');

const createRating = async (req, res) => {
    try {
        const { ratingData } = req.body;

        const rating = new Rating(ratingData);
        await rating.save();
        res.status(201).json({
            success: rating? true : false,
            ratingData: rating? rating : 'Cannot create rating'
        });
    } catch (error) {
        res.status(500).json({ success: false, ratingData: error.message });
    }
};

const queryRatingOfProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const ratings = await Rating.find({ productId: productId });

        res.status(200).json({
            success: ratings? true : false,
            ratingData: ratings? ratings : 'Cannot get rating'
        });
    } catch (error) {
        res.status(500).json({ success: false, ratingData: error.message });
    }
};

const queryRatingOfUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const ratings = await Rating.find({ userId: userId });

        res.status(200).json({
            success: ratings? true : false,
            ratingData: ratings? ratings : 'Cannot get rating'
        });
    } catch (error) {
        res.status(500).json({ success: false, ratingData: error.message });
    }
};

const queryRatingOfOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const ratings = await Rating.find({ orderId: orderId });

        res.status(200).json({
            success: ratings? true : false,
            ratingData: ratings? ratings : 'Cannot get rating'
        });
    } catch (error) {
        res.status(500).json({ success: false, ratingData: error.message });
    }
};

const updateRating = async (req, res) => {
    try {
        const { ratingId } = req.params;
        const { ratingData } = req.body;

        const rating = await Rating.findByIdAndUpdate(ratingId, ratingData, { new: true });
        res.status(200).json({
            success: rating? true : false,
            ratingData: rating? rating : 'Cannot update rating'
        });
    }
    catch (error) {
        res.status(500).json({ success: false, ratingData: error.message });
    }
};

const deleteRating = async (req, res) => {
    try {
        const { ratingId } = req.params;

        const rating = await Rating.findByIdAndDelete(ratingId);

        if (!rating){
            return res.status(404).json({ success: false, ratingData: 'Rating not found' });
        }

        res.status(200).json({
            success: true,
            ratingData: 'Rating deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({ success: false, ratingData: error.message });
    }
}

module.exports = { createRating, queryRatingOfProduct, queryRatingOfUser, queryRatingOfOrder, updateRating, deleteRating };