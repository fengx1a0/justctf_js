module.exports =(args)=>{
    if(typeof(args) == typeof({}))
    {
        return Function(
            "context",
            "let content='<div>'; content+=context.content; for(let i in context){content+='<h4>the content of '+i+' is '+context[i] + '</h4>'} content+='</div>'; return content;"    
        )(args);
    }else{
        return;
    }
}