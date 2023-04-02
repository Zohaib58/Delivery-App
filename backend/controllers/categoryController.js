const Category = require('../models/categoryModel')
const superAdmin = require('../models/adminModel')

const addCategory = async(req, res) => {
    const superAdminID = req.user._id

    const check = await superAdmin.findById(superAdminID)

    if(check){
        const numCheck = await Category.find({catNum: req.body.num})

        if(numCheck.length==0){
            const newCategory = new Category({
                name: req.body.name,
                catNum: req.body.num,
            })
            res.json({
                success: true,
                data: "Category created successfully"
            })
        }
        else{
            res.json({
                success: false,
                data: "Number of category set is already assigned to another category"
            })
        }
        
    }
    else{
        res.json({
            success: false,
            data: "Unauthorized to perform this action"
        })
    }
}

const deleteCategory = async(req, res) => {
    const superAdminID = req.user._id

    const check = await superAdmin.findById(superAdminID)

    if(check){
        const deleteCat = await Category.deleteOne({name: req.body.name})
        res.json({
            success: true,
            data: "Category deleted successfully"
        })
    }
    else{
        res.json({
            success: false,
            data: "Unpreviliged access"
        })
    }
}