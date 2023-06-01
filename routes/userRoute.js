const express = require("express");
let router = express.Router();
const {
    createUser,
    getAllUser,
    deleteUser,
    loginUser,
    updateUser,
    blockUser,
    unblockUser
} = require("../controller/userCtr");

const  {authMiddleware , isAdmin} = require("../middlewares/authorMiddleware")
router.post("/v1/user", createUser);
router.post("/v1/user/login", loginUser);
router.delete("/v1/user/:id",deleteUser);
router.get("/v1/user", getAllUser);
router.get("/v1/user/:id" ,authMiddleware ,isAdmin, getAllUser);
router.put("/v1/user/" ,authMiddleware, updateUser);
router.put("/v1/user/:id" , updateUser);
router.put("/v1/block-user/:id" ,authMiddleware, isAdmin, blockUser);
router.put("/v1/unblock-user/:id" ,authMiddleware, isAdmin, unblockUser);





module.exports = router