const User = require('../Models/user')
const JwtUtil = require('../jwt/token')

exports.reg = (async ctx => {
    const user = ctx.request.body
    const username = user.username
    const password = user.password

    // 1、去数据库 user 先查询当前发过来的 username 是否存在
    await new Promise((resolve, reject) => {
            // 去 users 数据库查询
            User.find({
                username
            }, (err, data) => {
                if (err) return reject(err)
                // 数据库查询没出错？ 还有可能没有数据
                if (data.length !== 0) {
                    // 查询到数据 -->  用户名已经存在
                    return resolve("")
                }
                // 用户名不存在  需要存到数据库
                const _user = new User({
                    username,
                    password,
                    commentNum: 0,
                    articleNum: 0
                })

                _user.save((err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
            })
        })
        .then(async data => {
            if (data) {
                ctx.body = {
                    status: 200,
                    msg: "注册成功"
                }
            } else {
                // 用户名已存在
                ctx.body = {
                    status: 201,
                    msg: "用户名已存在"
                }
            }
        })
        .catch(async err => {
            ctx.body = {
                status: 202,
                msg: "注册失败，请重试"
            }
        })

})

exports.login = async ctx => {

    const user = ctx.request.body
    const username = user.username
    const password = user.password
    console.log(username, 'username');

    await new Promise((resolve, reject) => {
        // 根据用户名查询用户
        User.findOne({
            'username': username
        }).exec((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);

            }
        });
    }).then((result) => {
       // console.log(result, 'result');
        if (result) {
            if (result.password == password) {
                // 登陆成功，添加token验证
                let _id = result._id.toString();
                // 将用户id传入并生成token
                let jwt = new JwtUtil(_id);
                let token = jwt.generateToken();
                // 将 token 返回给客户端
               // console.log(token,'用户token');
                
                User.find({'username': username})
                    .update( {$set: {token }})
                    .then(res=>{
                        console.log(res);
                    })
                ctx.body = {
                    status: 200,
                    msg: '登陆成功',
                    token: token
                };
            } else {
                ctx.body = {
                    status: 400,
                    msg: '账号密码错误'
                };
            }
        } else {
            ctx.body = {
                status: 404,
                msg: '账号不存在'
            }
        }
    }).catch((err) => {
        console.log(err);
        ctx.body = {
            status: 500,
            msg: '账号密码错误'
        };
    })

}

exports.keepLogin = async (ctx, next) => {

    if (ctx.url !== '/user/login' && ctx.url !== '/user/reg') {
        let token = ctx.headers.token;
        let jwt = new JwtUtil(token);
        let result = jwt.verifyToken();
       // console.log(result, token, "11")
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (result == 'err') {
            ctx.body = {
                status: 403,
                msg: '登录已过期,请重新登录'
            };
        } else {
         await  next();
        }
    } else {
        await  next();
    }


}