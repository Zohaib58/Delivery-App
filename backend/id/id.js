const id = async(collection) => {
    console.log(collection)
    const doc = await collection.findOne().sort({ createdAt: -1 })
    
    
    if (doc === null){
        return collection.modelName[0].toUpperCase() + 1
    }
    else{
        console.log(doc._id)
        const oldId = doc._id
        console.log(oldId[0] + (parseInt(oldId.slice(1)) + 1))
        return oldId[0] + (parseInt(oldId.slice(1)) + 1)
    }         
    

}

module.exports = {id}
