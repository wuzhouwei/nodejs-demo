const Router = require('koa-router')
const body = require('koa-body')
const user =require('../control/user')
const list = require('../control/list')
const add = require('../control/add')
const find = require('../control/find')
const del = require('../control/del')
const put = require('../control/put')
const upload = require('../control/upload')
const ceshiData =require('../control/ceshiData')

const router = new Router()


router.get('/',async ctx=>{
    ctx.body = {
        code : 0,
        data:'hello word'
    }
})
router.get('/banner',ceshiData.banner)

router.post('/user/reg',user.reg)

router.post('/user/login',user.login)

router.get('/list',user.keepLogin,list.list)

router.post('/api/add',user.keepLogin, add.add) //曾加数据add表

router.get('/api/find',user.keepLogin,find.find) //查找add表

router.post('/api/del',user.keepLogin,del.del) //删除add表数据 可数组可字符串例:'id':['id1','id2']or 'id':'id1'

router.post('/api/put',user.keepLogin,put.put) //根据id修改当前数据

router.post('/api/upload',user.keepLogin,upload.upload) 

module.exports = {
    router,
    body
}