import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: { type: String, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    from: { type: String, required: true }
});

const scrappedDataSchema = new mongoose.Schema({
    siteName: { type: String, required: true },
    products: [productSchema],
    total: { type: Number, required: true }
}, {
    timestamps: true
});

export const Site = mongoose.model('Site', scrappedDataSchema);
