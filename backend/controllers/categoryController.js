const Category = require('../models/categoryModel')
const superAdmin = require('../models/adminModel')

const addCategory = async(req, res) => {
    const superAdminID = req.user.id

    const check = await superAdmin.findById(superAdminID)

    if(check){
        const numCheck = await Category.find({catNum: req.body.num})

        if(numCheck.length==0){
            const newCategory = await Category.create({
                name: req.body.name,
                catNum: req.body.num,
            })
            res.json("Category created successfully")
        }
        else{
            res.json("Number of category set is already assigned to another category")
        }
        
    }
    else{
        res.json("Unauthorized to perform this action")
    }
}

const deleteCategory = async(req, res) => {
    const superAdminID = req.user.id

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
    const superAdminID = req.user.id
    const check = await superAdmin.findById(superAdminID)

    if(check){
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