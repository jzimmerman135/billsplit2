    /*****************************************
        GUEST OR REPEAT USER FUNCTIONALITY
    ******************************************/
    
    function updateNavItems(guestUser){
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
    }
    /***********************************
          DROPDOWN MENU FUNCTIONALITY
    ************************************/

    //when hamburger clicked it holds the menu state as open
    function toggleNav() {
        holdOpen += 1;
        holdOpen %= 2;
        var closeBtn = document.getElementsByClassName("fa fa-close");
        if (!holdOpen){  
            document.getElementsByClassName("fa fa-bars")[0].style.display = "block";
            closeBtn[0].style.display = "none"; 
            forceClose();
            return;
        }
        document.getElementsByClassName("fa fa-bars")[0].style.display = "none";
        closeBtn[0].style.display = "block";
    }

    //immediately closes the menu
    function forceClose() {
        hideNav();
        let hamburger = document.getElementsByClassName("hamburger")[0];
        hamburger.onmouseover = "null"; 
        hamburger.onclick = "null"; //disable open events
        hamburger.onmouseout = function() {
            setTimeout(() => {
                hamburger.onmouseover = openNav;
                hamburger.onclick = toggleNav;
                hamburger.onmouseout = closeNav;
            }, 250); 
        };
    }
    
    //opens the menu on hover
    function openNav() {
        cancelClose();
        showNav();
    }

    //waits 0.75s to close menu when mouse leaves
    function closeNav() {
        hideTimer = setTimeout(() => {
            if (!holdOpen){
                hideNav();
            }
        }, holdLength);
    }

    //clear the close process if re-enters an menu open area
    function cancelClose(){
        clearTimeout(hideTimer);
    }
    
    function hideNav() {
        document.getElementById("dropMenu").style.transform = "translateX(110%)";
    }

    function showNav() {
        document.getElementById("dropMenu").style.transform = "translateX(0%)";        
    }