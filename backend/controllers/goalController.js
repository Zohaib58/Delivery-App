const asyncHandler = require("express-async-handler")
const Goal = require("../models/goalModel")
const User = require("../models/userModel")

// @desc GET GOALS
// @ROUTE get/api/goals
// @ACCESS Private
const getGoals = asyncHandler(async(req, res) => {
    

    
    const goals = await Goal.find({user: req.user.id})
    //console.log(goals)

    //res.status(200).json({message: 'Get Goals'})
    res.status(200).json(goals)
})

// @desc SET GOAL
// @ROUTE get/api/goals
// @ACCESS Private
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text) {
        //res.status(404).json({message: 'Please add a text field'})
        res.status(400)
        throw new Error ('Please add a text field')
    }
    //console.log(req.body)
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    //res.status(200).json({message: 'Set Goal'})
    res.status(200).json(goal)
})


// @desc UPDATE GOAL
// @ROUTE get/api/goals/:id
// @ACCESS Private
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    if (!goal) {
        res.status(400)
        
        throw new Error('Goal not found')

    }
    const user = await User.findById(req.user.id)
    // check for user
    if (!user)
    {
        res.status(401).json({message: 'User not found'})

    }
    // Make sure the logged in user matches the goal user
    if (goal.user.toString()!== req.user.id) {
        res.status(401).json({message: 'User not authorized'})

    }


    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        
        new: true,
        
    })
    //res.status(200).json({message: `Update Goals ${req.params.id}`})
    
    res.status(200).json(updatedGoal)
})

// @desc DELETE GOAL
// @ROUTE get/api/goals/:id
// @ACCESS Private
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    if (!goal) {
        res.status(400)
        
        throw new Error('Goal not found')

    }
    const user = await User.findById(req.user.id)
    // check for user
    if (!user)
    {
        res.status(401).json({message: 'User not found'})

    }
    // Make sure the logged in user matches the goal user
    if (goal.user.toString()!== req.user.id) {
        res.status(401).json({message: 'User not authorized'})

    }
    await goal.remove()
    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
    
}
