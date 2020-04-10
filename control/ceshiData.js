exports.banner = async ctx=>{
    ctx.body = {
        status:200,
        data:[
            {
                id:'1',
                title:'本测试站主要技术栈:前端:react全家桶,redux,axios等,后台:nodejs,mongodb'
            },
            {
                id:'2',
                title:'本站暂不成熟'
            },
            {
                id:'3',
                title:'没有福利'
            },
            {
                id:'2',
                title:'哈哈'
            },
        ],
        msg:'成功'
    }
}