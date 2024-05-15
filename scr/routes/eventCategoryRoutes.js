const express = require("express");
const {
  categoriesGetAll,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controller/eventCategoryController"); 

const router = express.Router();

// Rutas para operaciones CRUD en categorías de eventos
router.get("/get-all", categoriesGetAll);       
router.get("/:id", getCategoryById);              
router.post("/create", createCategory);           
router.put("/update/:id", updateCategory);        
router.delete("/delete/:id", deleteCategory);     

module.exports = router;
