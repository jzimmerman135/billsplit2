/*****************************************
        NAVIGATION BAR VARIABLES
* NOTE: These MUST BE ON EVERY PAGE *
******************************************/
/* USE TO TEST FOR GUEST USERS */

var username = getUsername(true);
var guestUser = isUserGuest(username);
updateNavItems(guestUser);
var holdOpen = false; //drop menu variables
var holdLength = 750;
var hideTimer;

/*****************************************
          CALCULATOR VARIABLES
******************************************/

/* USE THESE WHEN DEALING WITH A FULL RECEIPT */
var nameColors = ["#add45c","#6AD2FF","#F6E65E","#28E1D4",
                  "#ff5732","#d478FD","#7883fd","#FFAD37",
                  "#F31656"];
var promptCount = 0;
var names = [];
var initials = [];
var items = [];
var prices = [];
var sharedBy = [];
var tax = 1.0625;
var totals = [];
var payer = -1;

//use only on fullcalculator.html
document.getElementById("submitInput").disabled = true;

/*****************************************
          HISTORY PAGE VARIABLES
******************************************/

/* CALL TO BUILD A LIST OF PREVIOUS RECEIPTS FOR THE HISTORY PAGE */
var receipts = getExampleReceipts(username);
createReceiptList(receipts);


/*******************************************
        REQUESTS FOR NEW FUNCTIONS
 *******************************************/
/*
    getReceipts(username);

    Purpose:
        Get info from database
    Parameter: 
        username
    Returns: 
        an array of correctly formatted receipts that the user
        is a part of

    Where to find function: 
        historyBackend.js
*/

/*
    getUsername();

    Purpose:
        Get username from cookies
    Parameter: 
        Nothing or anything you need to make it work
    Returns: 
        if guest user returns "none"
        if user has username returns username, e.g. "example_user244"

    Where to find function: 
        guestUserLogic.js
*/