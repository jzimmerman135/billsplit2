    /* Open when someone clicks on the  element */
    var holdOpen = false;
    var holdLength = 750;
    var closeBtn = document.getElementsByClassName("fa fa-close");

    function toggleNav() {
        holdOpen += 1;
        holdOpen %= 2;
        if (!holdOpen){  
            document.getElementsByClassName("fa fa-bars")[0].style.display = "block";
            closeBtn[0].style.display = "none"; 
            forceClose();
            return;
        }
        document.getElementsByClassName("fa fa-bars")[0].style.display = "none";
        closeBtn[0].style.display = "block";
    }

    function forceClose() {
        document.getElementsByClassName("hamburger")[0].onmouseover = "null";
        document.getElementById("dropMenu").style.transform = "translateX(110%)";
        setTimeout(() => {
            document.getElementsByClassName("hamburger")[0].onmouseover = openNav;
        }, holdLength);
    }
      
    function openNav() {
        cancelClose();
        document.getElementById("dropMenu").style.transform = "translateX(0%)";
    }

    var closeTimer;
    function closeNav() {
        closeTimer = setTimeout(() => {
            if (!holdOpen){
                document.getElementById("dropMenu").style.transform = "translateX(110%)";
            }
        }, holdLength);
    }

    function cancelClose(){
        clearTimeout(closeTimer);
    }

    if (guestUser){
        var x = document.getElementsByName("userItem");
        for (let i=0; i < x.length; i++){
            x[i].style.display = "none";
        }
    }
    else {
        var x = document.getElementsByName("guestItem");
        for (let i=0; i < x.length; i++){
            x[i].style.display = "none";
        }
    }