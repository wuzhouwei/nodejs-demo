const {db} = require('../Schema/config')

const AddSchema = require('../Schema/add')

const Add = db.model('add',AddSchema)

module.exports = Add