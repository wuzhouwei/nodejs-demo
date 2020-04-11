const Add = require('../Models/add')
const User = require('../Models/user')

exports.upload = async (ctx,next)=>{
   
   const name = ctx.request.files.file.path.split('/').pop()
  const id = ctx.request.body.id
  console.log(id,'id');
  
   Add.updateOne({_id:id},{$set: {lodPath:name}}).then(res=>{
       console.log(res,'ss');
       
   })
    
   return ctx.body = {
        code:200,
        msg:'上传成功',
       filename: name
      }
  
}