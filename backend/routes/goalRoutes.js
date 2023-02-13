const express = require ('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal} = require("../controllers/goalController")

/*
router.get('/', (req, res) => {
    //res.send('Get Goals')   
    //res.json({message: 'Get Goals'})
    res.status(200).json({message: 'Get Goals'})
})
*/


//router.get('/', getGoals)

/*
router.post('/', (req, res) => {
    //res.send('Get Goals')   
    //res.json({message: 'Get Goals'})
    res.status(200).json({message: 'Get Goals'})
})
*/

//router.post('/', setGoal)

/*
router.put('/:id', (req, res) => {
    //res.send('Get Goals')   
    //res.json({message: 'Get Goals'})
    res.status(200).json({message: `Update Goals ${req.params.id}`})

})
*/

//router.put('/:id', updateGoal)

/*
router.delete('/:id', (req, res) => {
    //res.send('Get Goals')   
    //res.json({message: 'Get Goals'})
    res.status(200).json({message: `Delete Goals ${req.params.id}`})
})
*/

//router.delete('/:id', deleteGoal)

const {protect} = require('../middleware/authMiddleware')


router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)


module.exports = router
