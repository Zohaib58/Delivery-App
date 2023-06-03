const Category = require('../models/categoryModel')
const superAdmin = require('../models/adminModel')

const addCategory = async (req, res) => {
    try {
      const maxCategory = await Category.findOne({}, {}, { sort: { catNum: -1 } });
  
      let newCategoryNum = 1;
  
      if (maxCategory) {
        newCategoryNum = maxCategory.catNum + 1;
      }
  
      const existingCategory = await Category.findOne({ name: req.body.name });
  
      if (existingCategory) {
        res.status(400).json({
          success: false,
          data: "Category name already exists",
        });
      } else {
        const newCategory = await Category.create({
          name: req.body.name,
          catNum: newCategoryNum,
        });
  
        res.json({
          success: true,
          data: "Category created successfully",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        data: "An error occurred while adding the category",
      });
    }
  };
  
  

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

const getAllCategory = async(req, res) => {
    const superAdminID = req.user._id

    const check = await superAdmin.findById(superAdminID)

    if(check){
        const categories = await Category.find()
        res.json(categories)
    }
    else{
        res.json({
            success: false,
            data: "Unprrevilleged access"
        })
    }
}

module.exports = {
    addCategory,
    deleteCategory,
    getAllCategory,
}