const Category = require('../models/categoryModel')
const superAdmin = require('../models/adminModel')
const User = require('../models/userModel')
const Customer = require('../models/customerModel')
const addCategory = async (req, res) => {
    const superAdminID = req.user._id;
  
    try {
      const check = await User.findById(superAdminID);
  
      if (check) {
        const maxCatNumCategory = await Category.findOne({}, {}, { sort: { catNum: -1 } });
  
        let newCatNum = 1;
        if (maxCatNumCategory) {
          newCatNum = maxCatNumCategory.catNum + 1;

        }
  
        const newCategory = await Category.create({
          name: req.body.name,
          catNum: newCatNum,
        });
  
        res.json("Category created successfully");
      } else {
        res.json("Unauthorized to perform this action");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("An error occurred");
    }
  };
  
  

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