const Add = require('../Models/add')
const User = require('../Models/user')


exports.put = async ctx=>{
  
  let data =  ctx.request.body ;
  const {id,age,hobby,name} = data
     Add.updateOne({_id:id},{$set: {name,age,hobby}})
        .then(res=>{
            if(res.ok){
                return ctx.body={
                    status : 200,
                    ok:res.ok,
                    msg:'修改成功'
                }
            }else{
                return ctx.body={
                    status : 201,
                    ok:res.ok,
                    msg:'修改失败'
                }
            }
        })

}