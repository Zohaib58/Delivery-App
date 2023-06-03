const id = async(collection) => {
    try {
      const doc = await collection.findOne().sort({ createdAt: -1 })
      
      if (doc === null){
        return collection.modelName[0].toUpperCase() + '1';
      }
      else{
        const oldId = doc._id;
        const num = parseInt(oldId.slice(1)) + 1;
        return oldId[0] + num;
      }  
    } catch (err) {
      console.log(err)
      throw new Error('Unable to generate ID')
    }
  }
  
  module.exports = {id}
  