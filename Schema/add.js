const { Schema} = require('./config')
   

const ObjectId = Schema.Types.ObjectId


const AddSchema = new Schema({
    name: String,
    age: Number,
    hobby: String,
    lodPath:String,
    uid: {
        type: ObjectId, 
        ref: 'users'  //关联表字段
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created"
    }

})


module.exports = AddSchema