export function isUserLogin(){
    var currentUser = getCookie("currentuser")
    if(currentUser == ""){
        return false
    }

    return true
}

export function getCurrentUser(){
    var userString = getCookie("currentuser");
    if(userString == ""){
        return "";
    }
    return JSON.parse(userString);

}


export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


  export function deleteUserCookie(){
    deleteCookie("currentuser");
    deleteCookie("token");
    console.log("delete r nek")

  }

  export function deleteCookie(name) {
    document.cookie = name + '=; expires= Thu, 21 Aug 2014 20:00:00 UTC';
  }

  export function isHaveRoleAdmin() {
    var promise = new Promise((resolve,reject)=>{
      fetch('./Account/isHaveRoleAdmin',{
        headers: new Headers({
          'Authorization': 'Bearer '+ getCookie("token"), 
        })
      })
      .then(data => {
        resolve(data.ok)
      })
    })
    return promise
  }