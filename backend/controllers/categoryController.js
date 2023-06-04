const Category = require('../models/categoryModel')
const superAdmin = require('../models/adminModel')
const Customer = require('../models/customerModel')

const addCategory = async(req, res) => {
    const superAdminID = req.user.id;

    const check = await superAdmin.findById(superAdminID);

    if (check) {
        const lastCategory = await Category.findOne({ createdAt: { $exists: true } }, {}, { sort: { createdAt: -1 } });

        if(lastCategory) {
            const newCategory = await Category.create({
                name: req.body.name,
                catNum: lastCategory.catNum + 1,
            });
        }
        else {
            const newCategory = await Category.create({
                name: req.body.name,
                catNum: 0,
            });
        }

        res.json("Category created successfully");
    } else {
        res.json("Unauthorized to perform this action");
    }
}

const deleteCategory = async(req, res) => {
    const superAdminID = req.user._id

    const check = await superAdmin.findById(superAdminID)

    if(check){
        const deleteCat = await Category.deleteOne({name: req.body.name})
        res.json("Category deleted successfully")
    }
    else{
        res.json("Unpreviliged access")
    }
}

const getAllCategory = async(req, res) => {
    const userID = req.user._id
    //const check = await superAdmin.findById(userID)
    const check2 = await Customer.findById(userID)

    if(check2){
        const categories = await Category.find()
        res.json(categories)
    }
    else{
        res.json("Unprrevilleged access")
    }
}

module.exports = {
    addCategory,
    deleteCategory,
    getAllCategory,
}