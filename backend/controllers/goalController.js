const asyncHandler = require("express-async-handler")
const Goal = require("../models/goalModel")

// @desc GET GOALS
// @ROUTE get/api/goals
// @ACCESS Private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find()

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
        text: req.body.text
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
    await goal.remove()
    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
    
}
