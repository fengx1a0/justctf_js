const koa2 = require("koa2");
const router = require("koa-router")();
const BodyParser = require("koa-bodyparser");
const send = require('koa-send');
const call_user_func = require("./routes/call_user_func");
const merge = require("./routes/replicate");

const app = new koa2();
app.use(BodyParser());
var send_msg,database,pos;

app.use(async (ctx,next)=>{
    send_msg = '';
    pos = 1;
    await next();
    if (ctx.status==404)
    {
        send_msg = "<h1>Sorry, Page Not Found!</h1>"
        send_msg+= '<img src="https://pixiv.cat/84758224.jpg" style="height: 548px;">';
        ctx.body = send_msg;
    }else if(ctx.status==502)
    {
        send_msg = "<h1>An Server Error Occurred!</h1>";
        send_msg += '<img src="https://pixiv.cat/78411108.jpg" style="height: 497.64px;">';
        ctx.body = send_msg;
    }else if(ctx.status == 200)
    {
        if (pos) {
            send_msg += "<h1>Welcome to JUSTCTF 2020 !</h1>";
            send_msg += '<img src="https://pixiv.cat/85988963.jpg" style="height: 548px;">';
            ctx.body = send_msg;
        }
    }
})

router.get("/",async (ctx)=>{
    ctx.status = 200 ;
})

router.get("/send_msg/:things_you_want_add_to_content",async (ctx)=>{
    database = '';
    let msg = ctx.params.things_you_want_add_to_content;
    try{
        let tmp = JSON.parse(msg);
        database = merge({},tmp);
        ctx.status = 200;
        console.log(database);
    }catch{
        ctx.status = 502;
    }
})


router.post("/exec_cmd",(ctx)=>{
    let cmd = ctx.request.body.cmd;
    if(cmd=="get_info"){
        send_msg += call_user_func(database);
        ctx.status = 200;
    }else{
        return;
    }
})

router.get("/.git",async (ctx)=>{
    ctx.attachment("./git.zip");
    await send(ctx, "./git.zip");
    ctx.status = 200;
    pos = '';
})


app.use(router.routes());
app.listen(80);