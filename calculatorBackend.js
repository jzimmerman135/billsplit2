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

function enterName(event) {
    var x = event.keyCode;
    if (x == 13) {
        getName();
    }
}

function enterInitial(event) {
    var x = event.keyCode;
    if (x == 13) {
        getInitial();
    }
}

function getName(){
    hideWelcome();
    let input = document.getElementById("inBar");
    if (input.value.toLowerCase() == "quit" || input.value.toLowerCase() == "done"){
        input.value = "";
        if (document.getElementById("finishButton").disabled == false) {
            setFinalNames();
            initializeTotals();
            document.getElementById("finishButton").onclick = function () {finishItems()};
            document.getElementById("inBar").onkeydown = function () {enterItem(event)};
            document.getElementById("submitInput").onclick = function () {getInput()};
            updateMessage("Enter the first item")
        }
        return;
    }

    let name = promptFor("name");
    updateMessage("Enter next person");
    updateErrorMessage("");
    if (name != "invalid"){
        name = clean(name);
        names.push(name);
        let init = makeInitial(name);
        if (initials.includes(init)){
            initialTaken(init);
            document.getElementById("inBar").onkeydown = function () {enterInitial(event)};
            document.getElementById("submitInput").onclick = function () {getInitial(event)};
        } else {
            initials.push(init);
            displayInitial(init);
        }
        displayName(name,"header");
    }
    return;
}

function getInitial(){
    let newInit = promptFor("initial");
    if (newInit == "invalid"){
        return;
    }    
    initials.push(newInit);
    displayInitial(newInit);
    document.getElementById("finishButton").disabled = false;
    document.getElementById("inBar").onkeydown = function () {enterName(event)};
    document.getElementById("submitInput").onclick = function () {getName(event)};
    updateMessage("Enter next person");
}

function updateMessage(message) {
    document.getElementById("inMessage").innerHTML = message;
    document.getElementById("inBar").placeholder = "";
    document.getElementById("submitInput").disabled = true;
}

function updateErrorMessage(message) {
    document.getElementById("inBar").placeholder = message;
}

function finishNames(){
    document.getElementById("inBar").value = "quit";
    getName();
}

function setFinalNames(){
    var finalNames = document.getElementsByClassName("names");
    var finalInits = document.getElementsByClassName("initials");
    for (let i = 0; i < finalNames.length; i++) {
        finalNames[i].ondblclick = "none";
        finalInits[i].ondblclick = "none";
        finalNames[i].ontouchend = "none";
        finalInits[i].ontouchend = "none";
    }
}

function setFinalReceipt(){
    var finalItems = document.getElementsByClassName("items");
    var finalPrices = document.getElementsByClassName("prices");
    var finalSharedBy = document.getElementsByClassName("sharedBy");
    for (let i = 0; i < finalItems.length; i++) {
        finalItems[i].ondblclick = "none";
        finalPrices[i].ondblclick = "none";
        finalSharedBy[i].ondblclick = "none";
        finalItems[i].ontouchend = "none";
        finalPrices[i].ontouchend = "none";
        finalSharedBy[i].ontouchend = "none";
    }
}

function setFinalTax(){
    document.getElementById("minusTax").onmousedown = "none";
    document.getElementById("plusTax").onmousedown = "none";
    document.getElementById("plusTax").style.visibility = "hidden";
    document.getElementById("minusTax").style.visibility = "hidden";
}

function promptFor(type){
    let result = document.getElementById("inBar").value;
    document.getElementById("inBar").value = "";

    if (type == "item"){
        if (invalidate(type,result)){
            updateErrorMessage("Please enter an item.");
            return "invalid";
        };
        updateMessage("Enter the price");
        return result;
    }
    if (type == "price"){
        if (invalidate(type,result)){
            updateErrorMessage("Price invalid please try again.");
            return "invalid";
        }
        updateMessage("Enter who it is shared by");
        if (items.length == 1){
            updateErrorMessage("Enter only initials or 'all' for everyone");
        }
        return result;
    }
    if (type == "sharedBy"){
        if (invalidate(type,result)){
            updateErrorMessage("Please enter valid initials.");
            return "invalid";
        };
        updateMessage("Enter an item");
        return result;
    }
    if (type == "name"){
        if (invalidate(type,result)){
            updateErrorMessage("Please enter a valid name");
            return "invalid";
        }
        return result;
    }
    if (type == "initial"){
        if (invalidate(type,result)){
            updateErrorMessage("Please enter a valid initial");
            return "invalid";
        }
        return result[0].toLowerCase();
    }
    return;
}

function finishItems(){
    document.getElementById("inBar").value = "quit";
    getInput();
}

function getInput(){
    let input = document.getElementById("inBar");
    if (input.value.toLowerCase() == "quit" || input.value.toLowerCase() == "done"){
        document.getElementById("inBar").value = "";
        if (document.getElementById("finishButton").disabled == false) {
            document.getElementById("inBar").value = "";
            finishCalculator();
        }
        return;
    }
    var num;
    if (promptCount == 0){
        num = promptFor("item");
        if (num == "invalid"){
            return;
        };
        items.push(num);
        display(num,"items");
        promptCount++;
        document.getElementById("finishButton").disabled = true;
    }
    else if (promptCount == 1){
        num = promptFor("price");
        if (num == "invalid"){
            return;
        };
        display(num,"prices");
        prices.push(num);
        updateTotalBar();
        promptCount++;
    }
    else if (promptCount == 2){
        num = promptFor("sharedBy");
        if (num == "invalid"){
            return;
        };
        num = cleanSharedBy(num);
        sharedBy.push(num);
        displaySharedBy(num);
        promptCount++;
        document.getElementById("finishButton").disabled = false;
    }
    else{
        promptCount = 0;
        getInput();
    }
}

function display(value, type, static){
    document.getElementById("fullReceipt").style.display = "flex";
    let location = createLocation(type);
    const para = document.createElement("li");
    para.id = location;
    para.className = type;
    const tnode = document.createTextNode(value);
    para.appendChild(tnode);
    if (typeof static === "undefined"){
        para.ondblclick = function() {editItem(location)};
        para.ontouchend = function() {editOnDoubleTap(location);}
    }
    if (type == "items"){
        const element = document.createElement("div");
        element.className = "receiptRow";
        element.id = createLocation("receiptRow");
        document.getElementById("fullReceipt").appendChild(element);
        element.appendChild(para);
    } else {
        const element = document.getElementById(createLocation("receiptRow"));
        element.appendChild(para);
    }
}

function displayName(value, where){
    const nameDiv = document.createElement("div");
    nameDiv.className = "names";
    let currColor;
    currColor = nameColors[(names.length % nameColors.length)];
    if (where != "header"){
        currColor = nameColors[(names.indexOf(value)+1) % nameColors.length ];
    }
    nameDiv.style.backgroundColor = currColor;
    const tnode = document.createTextNode(value);
    nameDiv.appendChild(tnode);
    if (where == "header"){
        let location = "names" + (names.length).toString();
        nameDiv.id = location;
        where = "namesHRow";
        nameDiv.ondblclick = function() {editItem(location)};
        nameDiv.ontouchend = function() {editOnDoubleTap(location);}
    }
    if (where == "totals"){
        let location = "totalsName" + (names.indexOf(value)+1);
        nameDiv.id = location;
        where = "totals" + (names.indexOf(value)+1);
        nameDiv.onclick = function() {updatePayer(location)};
    }
    const element = document.getElementById(where)
    element.appendChild(nameDiv);
}

function createLocation(type){
    let x = items.length;
    return type + x.toString();
}

function enterItem(event) {
    var x = event.keyCode;
    if (x == 13) {
    getInput();
    }
}

function editItem(id){
        var toEdit = document.getElementById(id);
        var innerData = toEdit.innerHTML;
        toEdit.innerHTML = "";
        var x = document.createElement("input");
        if (classFromId(id) == "initials" || classFromId(id) == "prices"){
            x.style.width = "2em";
        }
        toEdit.appendChild(x);
        x.value = innerData;
        x.select();
        x.addEventListener("keydown", function(e) {
            if (e.code == "Enter" || e.code==13) {
                setNewData(id);
                toEdit.ondblclick = function() {editItem(id);}
            }
        });
        toEdit.ondblclick = function() {
            setNewData(id);
            toEdit.ondblclick = function() {editItem(id);}
        };

        function setNewData(id){
            let newData = x.value;
            if (invalidate(id,x.value)){
                return;
            }
            editData(id, newData);
            x.remove();
            toEdit.innerHTML = newData;
            if (classFromId(id)=="initials" && initials.length == names.length){
                updateMessage("Enter next person");
                document.getElementById("finishButton").disabled = false;
            }
        }
}

function editData(id, newData){
    let i;
    if (id[0] == "i" && id[1] == "t"){
        i = id.substring('items'.length);
        i = parseInt(i);
        items[i-1] = newData;
    }
    else if (id[0] == "p"){
        i = id.substring('prices'.length);
        i = parseInt(i);
        prices[i-1] = newData;
    }
    else if (id[0] == "s"){
        i = id.substring('sharedBy'.length);
        i = parseInt(i);
        sharedBy[i-1] = newData;
    }
    else if (id[0] == "n"){
        i = id.substring('names'.length);
        i = parseInt(i);
        newData = clean(newData);
        names[i-1] = newData;
    }
    else if (id[0] == "i"){
        i = id.substring('initials'.length);
        i = parseInt(i);
        initials[i-1] = makeInitial(newData);
    }
}

function invalidate(id,val){
    if (id[0] == "i" && id[1] == "t"){
        if (val == ""){
            return true;
        }
    }
    else if (id[0] == "p"){
        if (val == ""){
            return true;
        }
        else if (isNaN(val)){
            return true;
        }
    }
    else if (id[0] == "s"){
        if (val == ""){
            return true;
        }
    }
    else if (id[0] == "n"){
        if (val == "" && !isNaN(val)){
            return true;
        }
    }
    else if (id[0] == "i" && id[1] == "n"){
        if (val.length != 1){
            return true;
        }
        if (val.toLowerCase() == "quit" || val.toLowerCase() == "done"){
            return true;
        }
        //val != this same initial imtrying to edit
        //(i.e. if I am changing a in anesu, i can still set it back to a)
        if (initials.includes(val) && 
        val != initials[parseInt(id.substring('initials'.length)) -1])
        {
            initialTaken(val);
            return true;
        }
    }
    else {
        return false;
    }
}

function initialTaken(newInit){
    updateMessage(`The initial '${newInit}' already belongs to ${names[initials.indexOf(newInit)]}` );
    updateErrorMessage("Please try a new initial");
    document.getElementById("finishButton").disabled = true;
}

function clean(name){
    name = name.toLowerCase();
    name = removeWhitespace(name);
    name = capFirstLetter(name);
    return name;
} 

function removeWhitespace(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function makeInitial(name) {
    return name.charAt(0).toLowerCase();
}

function displayInitial(initial){
    let location = "initials" + (initials.length).toString()
    const nameDiv = document.createElement("div");
    nameDiv.id = location;
    nameDiv.className = "initials";
    nameDiv.style.backgroundColor = nameColors[ (initials.length % nameColors.length )];
    const tnode = document.createTextNode(initial);
    nameDiv.appendChild(tnode);
    nameDiv.ondblclick = function() {editItem(location)};
    nameDiv.ontouchend = function() {editOnDoubleTap(location);}
    const element = document.getElementById("initialsRow");
    element.appendChild(nameDiv);
}

function removeAllChildNodes(id) {
    let parent = document.getElementById(id);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function countOccurences(string, char){
    var count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] == char){
            count++;
        } 
    }
    return count;
}

function cleanSharedBy(initList){
    initList = initList.toLowerCase();
    let cleaned = "";
    if (initList == "all"){
        for (let i = 0; i < initials.length; i++) {
            cleaned += initials[i];
            
        }
    }
    else {
        for (let i = 0; i < initials.length; i++) {
            for (let j = 0; j < initList.length; j++) {
                if (initList[j] == initials[i]) {
                    cleaned += initials[i];
                }     
            }
        }
    }
    console.log(initList + " cleaned to " + cleaned)
    return cleaned;
}


function editSharedBy(id){
    var toEdit = document.getElementById(id);
    removeAllChildNodes(id);
    var x = document.createElement("input");
    toEdit.appendChild(x);
    x.value = sharedBy[parseInt(id.substring('sharedBy'.length)) -1 ]
    if (!isMobile()){
        x.select();
    }
    x.addEventListener("keydown", function(e) {
        if (e.code == "Enter" || e.code == 13) {
            setNewData(id);
            toEdit.ondblclick = function() {editSharedBy(id);}
        }
    });
    toEdit.ondblclick = function() {
        setNewData(id);
        toEdit.ondblclick = function() {editSharedBy(id);}
    }
    
    function setNewData(id){
        let newData = x.value;
        newData = cleanSharedBy(newData);
        editData(id,newData);
        x.remove();
        for (let i = 0; i < newData.length; i++) {
            let name = names[initials.indexOf(newData[i])];
            displayName(name,id);
        }
    }
}

function displaySharedBy(initList, static) {
    let row = document.createElement("li");
    row.className = "sharedBy";
    let location = "sharedBy" + items.length.toString();
    row.id = location;
    if (typeof static === "undefined"){
        row.ondblclick = function() {editSharedBy(location);}
        row.ontouchend = function() {editOnDoubleTap(location);}
    }
    document.getElementById(createLocation("receiptRow")).appendChild(row);
    for (let i = 0; i < initList.length; i++) {
        let name = names[initials.indexOf(initList[i])];
        displayName(name,location);
    }
}

function finishCalculator(){
    setFinalReceipt();
    setFinalTax();
    document.getElementById("typeBar").style.display = "none";
    document.getElementById("fButtonBox").style.display = "none";
    updateMessage("Click on whoever is paying");
    document.getElementsByClassName("inReg")[0].style.margin = "0.5em";
    calculateTotals();
    displayTotals();
}

function calculateTotals(){
    for (let item = 0; item < sharedBy.length; item++) {
        console.log(sharedBy[item]);
        for (let j = 0; j < sharedBy[item].length; j++) {
            let k = initials.indexOf(sharedBy[item][j]);
            let toAdd = parseFloat(prices[item]) / parseInt(sharedBy[item].length);
            toAdd = parseFloat(toAdd.toFixed(2));
            totals[k] += parseFloat(toAdd);
        }
    }
}

function getLength(obj){
    if (typeof obj !== "undefined") { 
        return obj.length;
    }
    return 0;
}

function initializeTotals(){
    for (var i=0;i<names.length;i++){ 
        totals[i] = 0;
    }
}

function displayTotals(){
    for (let i = 0; i < names.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.id = "totals"+(i+1);
        newDiv.className = "totals";
        var tnode = document.createTextNode(" owes: $");
        document.getElementById("totalsRow").appendChild(newDiv);
        displayName(names[i],"totals");
        let owes = document.createElement("div");
        owes.appendChild(tnode);
        owes.className = "owes";
        newDiv.appendChild(owes);
    }
    updateTotals();
}

function updatePayer(id){
    document.getElementById("inputReg").style.display = "none";
    if (payer != -1){
        let y = document.getElementsByClassName("payer");
        y[0].className = "names";
    }
    let i = id.replace(/\D/g,"");
    i = parseInt(i);
    if (payer == i-1){
        payer = -1;
    } else {
        payer = i - 1;
    }
    console.log("payer is " + payer);
    updateTotals();
}

function updateTotals() {
    if (payer > -1){
        var p = document.getElementById("totalsName"+(payer+1));
        p.className += " payer";
    }
    
    var newTotals = [];
    let x = document.getElementsByClassName("owes")
    for (let i = 0; i < totals.length; i++) { 
        if (i == payer){
            newTotals[payer] = (parseFloat(sum(totals)) - parseFloat(totals[payer])) * tax;
            x[payer].innerHTML = " is owed: $" + newTotals[i].toFixed(2);
        }
        else {
            newTotals[i] = totals[i] * tax;
            x[i].innerHTML = " owes: $" + newTotals[i].toFixed(2);
        }
    }
}

function classFromId(id){
    return id.replace(/[0-9]/g, '');
}

function updateTotalCost(){
    let array = [];
    for (let i = 0; i < prices.length; i++) {
        array[i] = parseFloat(prices[i].toFixed(2));
    }
    document.getElementById("receiptTotal").innerHTML = sum(array);
}

function sum(arr){
    let ints = [];
    ints = arr;
    if (ints.length == 1){
        return ints[0];
    }
    return parseFloat(ints[0]) + parseFloat(sum(ints.slice(1)));
}

function editOnDoubleTap(id){
    disableContextMenu(id);

    var x = document.getElementById(id)
    x.ontouchend = function () {editId(id);}
    timer = setTimeout(function () {x.ontouchend = function () {editOnDoubleTap(id)};}, 500);
    return;
} 

function editId(id) {
    if (classFromId(id) == "sharedBy"){
        editSharedBy(id);
    } else {
        editItem(id);
    }
}

function isMobile() {
    return (window.innerWidth == 800)
}

function disableContextMenu(id) {
    //disable context menu
    document.getElementById(id).oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
    };
};

function updateSubmit() {
    if (document.getElementById("inBar").value == ""){
        document.getElementById("submitInput").disabled = true;
    } else {
        document.getElementById("submitInput").disabled = false;
    }
}

function updateTotalBar() {
    document.getElementsByClassName("totalBar")[0].style.display = "flex";
    let x = document.getElementById("totalVal");
    x.innerHTML = (parseFloat(sum(prices)) * tax).toFixed(2);
}

function changeTax(sym){
    if (sym == '+'){
        tax += 0.0025;
        document.getElementById('tax').innerHTML = "Tax:  " + ((tax-1)*100).toFixed(2) + "%";
    }
    else if (sym == '-'){
        tax -= 0.0025;
        document.getElementById('tax').innerHTML = "Tax:  " + ((tax-1)*100).toFixed(2) + "%";
    }
    updateTotalBar();
}

function addTax() {
    startCount('+');
}

function minusTax() {
    startCount('-');
}

function startCount(sym) {
    let t;
    let w;
    var id = "minusTax";
    var timer_is_on = 0;
    if (sym == '+'){
        id = "plusTax";
    }
    disableContextMenu(id);
    document.getElementById(id).onmouseup = stopCount;
    document.getElementById(id).onmouseout = stopCount;
    
    if (!timer_is_on) {
        changeTax(sym)
        timer_is_on = 1;
        w = setTimeout(timedCount, 1100)
    }

    function timedCount() {
        changeTax(sym);
        t = setTimeout(timedCount, 150);
    }
    function stopCount() {
        clearTimeout(t);
        clearTimeout(w);
        timer_is_on = 0;
    }
}

function hideWelcome() {
        document.getElementById("welcomeSub").style.display = "none";
        document.getElementById("welcome").style.display = "none";
}