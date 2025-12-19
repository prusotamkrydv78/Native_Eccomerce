import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  size: String,
  color: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  sku: { type: String, unique: true, sparse: true },
});

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    basePrice: { type: Number, required: true },
    images: [{ type: String, required: true }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: { type: String },
    variants: [variantSchema],
    totalStock: { type: Number, default: 0 },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratings: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexing for search
productSchema.index({ name: "text", description: "text", brand: "text" });

const Product = mongoose.model("Product", productSchema);
export default Product;
