const Add = require('../Models/add')
const User = require('../Models/user')


exports.find = async ctx => {
    const token = ctx.headers.token
    const uid = await User.findOne({token})
            .then((res) => {return res._id})
            .catch(err => {console.log(err);})   
    const maxNum = await Add.find({
        uid
    }).countDocuments((err, num) => err ? console.log(err) : num) //查询总条数
   
        let page = ctx.query.page || 1  //从ctx里面获取get传值,query是格式化之后的，querystring是字符串的
        console.log(page,'page');
        
        page--
        await  Add.find({
                uid
            })
            .sort('-created')
            .skip(10 * page)
            .limit(10)
            .then(res => {
               // console.log(res,'shuju');
                
                    return ctx.body={
                        status:'200',
                        data:{
                            list:res,
                            total:maxNum
                        },
                        msg:'成功'
                    }
                
            })




}