function add0(m){return m<10?'0'+m:m }
function format(umit)
{
var time = new Date(umit);
var y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var h = time.getHours();
var mm = time.getMinutes();
var s = time.getSeconds();
return y+'-'+add0(m)+'-'+add0(d);
}
export {
    format
}