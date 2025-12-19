import asyncHandler from "express-async-handler";
import Category from "../../models/categoryModel.js";
import slugify from "slugify";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).populate("parent", "name");
  res.json(categories);
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name, parent, image, description } = req.body;

  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name,
    slug: slugify(name, { lower: true }),
    parent: parent || null,
    image,
    description,
  });

  res.status(201).json(category);
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, parent, image, description } = req.body;
  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name || category.name;
    category.slug = name ? slugify(name, { lower: true }) : category.slug;
    category.parent = parent || category.parent;
    category.image = image || category.image;
    category.description = description || category.description;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.deleteOne();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});
