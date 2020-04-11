const Koa = require('koa');
const {router, body} = require('./Router/router');
const static = require('koa-static')
const {join} = require('path')

const cors = require('koa2-cors')
//const bodyParser = require('koa-bodyparser')
const JwtUtil = require('./jwt/token')
const app = new Koa();



// 配置 koa-body 处理 post 请求数据

app.use(body({
  multipart:true, //支持文件上传
  formidable:{
    uploadDir:join(__dirname,'public'),//设置文件上传目录
    keepExtensions:true,//保持文件后缀
    maxFieldsSize:2*1024*1024,//文件上传大小
    onFileBegin:(name,file)=>{//文件上传前的设置
       // console.log(file,'这是body');
      const suffix = file.path.split('.').pop()//获取图片后缀
     // console.log(suffix);
       const dir = join(__dirname,`public`);
       // 重新覆盖 file.path 属性
       file.path = `${dir}/${Date.now()}.${suffix}`;
       console.log(file.path,'55');
       
    }
  }
}))

// 解析请求体
//app.use(bodyParser());
// app.use (async ctx =>{ctx.body  = ' hello world'})
//配置静态资源目录 
app.use(static(join(__dirname,'./public'))) //开放静态目录后可直接ip or 域名+ 文件名 例:http://localhost:3001/1586522802079.png

app.use(cors({
  origin: function (ctx) {
    // if (ctx.url === '/test') {return "http://localhost:3001";// 这样就能只允许 http://localhost:3001 这个域名的请求了 }
       return '*'; // 允许来自所有域名请求
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE','PUT'],
  allowHeaders: ["Access-Control-Allow-Headers",'Content-Type', 'Authorization', 'Accept','token'],//如果请求头有其他字段需这里添加才可
}))


app.use(router.routes()).use(router.allowedMethods());

app.listen(3001, () => { console.log('启动成功3001');})
 
{
  // admin  admin
  const { db } = require('./Schema/config')
  const UserSchema = require('./Schema/user')
  const User = db.model("users", UserSchema)

  User
    .find({username: "admin"})
    .then(data => {
      if(data.length === 0){
        // 管理员不存在  创建
        new User({
          username: "admin",
          password: "admin",
          commentNum: 0,
          articleNum: 0
        })
        .save()
        .then(data => {
          console.log("管理员用户名 -> admin,  密码 -> admin")
        })
        .catch(err => {
          console.log("管理员账号检查失败")
        })
      }else{
        // 在控制台输出
        console.log(`管理员用户名 -> admin,  密码 -> admin`)
      }
    })
}