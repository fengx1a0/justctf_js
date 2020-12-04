function isObject(obj){
    return typeof obj === 'object' || typeof obj === 'function';
}

module.exports = function(a, b){
    var attrs = Object.keys(b);
    attrs.forEach( (key) => {
     if (isObject(a[key]) && isObject(b[key])) {
            replicate(a[key], b[key]);
        } else {
            a[key] = b[key];
        }  
    });
    return a;
}