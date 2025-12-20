import asyncHandler from "express-async-handler";
import Product from "../../models/productModel.js";
import slugify from "slugify";

// @desc    Fetch all products with filters, sorting, and pagination
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 12;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const category = req.query.category ? { category: req.query.category } : {};
  const minPrice = req.query.minPrice
    ? { basePrice: { $gte: Number(req.query.minPrice) } }
    : {};
  const maxPrice = req.query.maxPrice
    ? { basePrice: { $lte: Number(req.query.maxPrice) } }
    : {};

  // Combine filters
  const filter = { ...keyword, ...category, ...minPrice, ...maxPrice };

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(req.query.sort || "-createdAt")
    .populate("category", "name");

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "name"
  );

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    basePrice,
    description,
    images,
    brand,
    category,
    variants,
    isFeatured,
  } = req.body;

  const product = new Product({
    name,
    basePrice,
    description,
    images,
    brand,
    category,
    variants,
    isFeatured,
    seller: req.user._id,
    slug: slugify(name, { lower: true }),
    totalStock: variants?.reduce((acc, item) => acc + item.stock, 0) || 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    basePrice,
    description,
    images,
    brand,
    category,
    variants,
    isFeatured,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // Only Admin can update (handled by middleware, but good to keep clean)

    product.name = name || product.name;
    product.basePrice = basePrice || product.basePrice;
    product.description = description || product.description;
    product.images = images || product.images;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.variants = variants || product.variants;
    product.isFeatured =
      isFeatured !== undefined ? isFeatured : product.isFeatured;

    if (name) product.slug = slugify(name, { lower: true });
    if (variants)
      product.totalStock = variants.reduce((acc, item) => acc + item.stock, 0);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin or Seller
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    // Only Admin can delete (handled by middleware)

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: `${req.user.firstName} ${req.user.lastName}`,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
