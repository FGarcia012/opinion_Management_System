import Category from "../category/category.model.js";

export const createDefaultCategory = async () => {
    try {
        const defaultCategory = {
            name: "General"
        };

        const existingCategory = await Category.findOne({ name: "General" });

        if (!existingCategory) {
            await Category.create(defaultCategory);
            console.log("Default category created successfully.");
        } else {
            console.log("Default category already exists.");
        }
    } catch (err) {
        console.error("Error creating default category:", err.message);
    }
};