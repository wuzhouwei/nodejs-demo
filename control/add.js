const Add = require('../Models/add')
const User = require('../Models/user')

exports.add = async ctx => {
  const data = ctx.request.body
  const token = ctx.headers.token
  const name = data.name
  const age = data.age
  const hobby = data.hobby
  const yid = await User.findOne({
      token
    })
    .then((res) => {
      return res._id
    }).catch(err => {
      console.log(err);
    })

  await new Promise((resolve, reject) => {
    Object.assign(data, {
      uid: yid
    })
    new Add(data).save((err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  }).then(async res => {
    if (res.uid) {
      //  console.log(res.uid,'ooo');

      return ctx.body = {
        status: 200,
        msg: '保存成功'
      }
    } else {
      return ctx.body = {
        status: 201,
        msg: '保存失败'
      }
    }
  })

}