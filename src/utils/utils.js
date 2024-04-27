/**
 * @obsolete không dùng hàm này
 */
let httpGetAsync = function(url, method, data=null, resolve, reject, waiting=null){
    let http = new XMLHttpRequest();
    http.onreadystatechange=function(){
        if (http.readyState == 4 && http.status < 300) {
            resolve(http);
        }
        if (http.readyState == 2 || http.readyState == 3) {
            if (waiting !== null) {
                waiting();
            }
        }
        if (http.readyState == 4 && http.status > 400) {
            reject();
        }
        
    }
    http.withCredentials="true";
    http.open(method, url, true);
    http.send(data);
}
let numberWithComas = function(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
let formatString = function(string){
    return string.trim()
}
let generateNewPrice = function(price, discount){//return number
    return Number(discount)!==0? numberWithComas(Number(price)*(100 - Number(discount))/100):numberWithComas(price);
}
let generateOldPrice = function(price, discount){//return number
    return Number(discount)!==0?numberWithComas(price):"";
}
let generateQuantityCart = function(carts){
    return carts.reduce((pev, cart)=>pev+=Number(cart.quantity),0)
}
export {httpGetAsync, numberWithComas, formatString, generateNewPrice, generateOldPrice, generateQuantityCart}