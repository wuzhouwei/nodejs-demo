const Add = require('../Models/add')
const User = require('../Models/user')


exports.del = async ctx=>{
    const token = ctx.headers.token
    let ids = ctx.request.body.id;//['id1','id2']
    let cc = null
    if(/\[ |\]/g.test(ids)){
         cc = ids.replace(/\'|\[|\"|\]/g,"").split(',') //去除首位的""
    }else{
         cc = ids.replace(/\'|\[|\"|\]/g,"")
    }

    
    await  Add.find({_id:typeof cc === 'string' ? cc : {$in:cc}}).remove().then(res=>{
        console.log(res,'res');
        return ctx.body ={
            status : 200,
            ok:res.ok,
            delConut:res.deletedCount,
            msg:'成功'
        }
    })
}