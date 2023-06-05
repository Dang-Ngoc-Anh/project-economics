const express = require("express");
const { createProduct,
    getaProduct,
    getAllProduct,
    updateProduct,
    deleteProduct, } = require("../controller/productCtr");
const { isAdmin , authMiddleware } = require("../middlewares/authorMiddleware");
const router = express.Router();

router.post("/" , authMiddleware, isAdmin,createProduct);
router.get("/" , getAllProduct);
router.put("/:id" , authMiddleware, isAdmin ,updateProduct)
router.delete("/:id" , authMiddleware, isAdmin ,  deleteProduct);
router.get("/:id" , getaProduct);

module.exports = router