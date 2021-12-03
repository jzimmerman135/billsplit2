/*  USE COOKIES TO RETURN THESE VALUES */

function getUsername(demo){
    if (demo = true){
        return "example_user244";
    }
    else {
        return "none";
    }
}

function isUserGuest(username){
    if (username == "none"){
        return true;
    }
    return false;
}