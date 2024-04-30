const getOptions = function(method, body = undefined){
    let contextJSON = localStorage.getItem("context");
    let context = null;
    if(contextJSON){
        context = JSON.parse(contextJSON);
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("access-token", context ? context.AccessToken : '');
    myHeaders.append("refresh-token", context ? context.RefreshToken : '');
    return {
        method: method ? method : 'GET',
        headers: myHeaders,
        body: body
    }
}
/**
 * 0 có applicationjson
 */
const getOptionsv2 = function(method, body = undefined){
    let contextJSON = localStorage.getItem("context");
    let context = null;
    if(contextJSON){
        context = JSON.parse(contextJSON);
    }
    const myHeaders = new Headers();
    //myHeaders.append("Content-Type", "application/json");
    myHeaders.append("access-token", context ? context.AccessToken : '');
    myHeaders.append("refresh-token", context ? context.RefreshToken : '');
    return {
        method: method ? method : 'GET',
        headers: myHeaders,
        body: body
    }
}
export {getOptionsv2, getOptions};
