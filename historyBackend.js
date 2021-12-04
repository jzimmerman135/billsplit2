

function getExampleReceipts(userName){
    let receipts = new Array(); 
    if (userName != "none") {  
        let ex_receipt0 = 
        {
            "id": "as8943nks01",
            "date": "12/3/2021",
            "title" : "trader joe's groceries",
            "people" : [
                {
                    "username" : "jzimm135",
                    "name" : "Jacob",
                    "initial" : "j",
                    "owes" : 5.05
                },
                {
                    "username" : "ehe340",
                    "name" : "Eddy",
                    "initial" : "e",
                    "owes" : -19.37
                },
                {
                    "username" : "kev12",
                    "name" : "Kev",
                    "initial" : "k",
                    "owes" : 7.16
                },
                {
                    "username" : "none",
                    "name" : "Adnan",
                    "initial" : "a",
                    "owes" : 7.16
                }
            ],
            "tax": 5.25,
            "subtotal": 19,
            "total": 19.95,
            "payer": 1,
            "items": [{
                    "name": "eggs",
                    "price": 2.50,
                    "sharedBy": ["Jacob", "Eddy", "Kev", "Adnan"],
                    "sharedByString": "jeka"
                },
                {
                    "name": "butter",
                    "price": 4,
                    "sharedBy": ["Kev", "Adnan"],
                    "sharedByString": "ka"
                },
                {
                    "name": "chicken",
                    "price": 12.50,
                    "sharedBy": ["Jacob", "Kev", "Adnan"],
                    "sharedByString": "jka"
                }
            ]
        };
        let ex_receipt1 = 
        {
            "id": "as8943nks01",
            "date": "12/5/2021",
            "title" : "chipotle",
            "people" : [
                {
                    "username" : "jzimm135",
                    "name" : "Jacob",
                    "initial" : "j",
                    "owes" : -30.71
                },
                {
                    "username" : "ehe340",
                    "name" : "Eddy",
                    "initial" : "e",
                    "owes" : 11.90
                },
                {
                    "username" : "kev12",
                    "name" : "Kevin",
                    "initial" : "k",
                    "owes" : 10.31
                },
                {
                    "username" : "none",
                    "name" : "Adnan",
                    "initial" : "a",
                    "owes" : 8.50
                }
            ],
            "tax": 6.25,
            "subtotal": 41.3,
            "total": 43.88,
            "payer": 0,
            "items": [{
                    "name": "chicken burrito",
                    "price": 8.50,
                    "sharedBy": ["Kev"],
                    "sharedByString": "k"
                },
                {
                    "name": "burrito bowl",
                    "price": 20,
                    "sharedBy": ["Jacob", "Eddy"],
                    "sharedByString": "je"
                },
                {
                    "name": "quesadilla",
                    "price": 6.80,
                    "sharedBy": ["Adnan"],
                    "sharedByString": "a"
                },
                {
                    "name": "chips and guac",
                    "price": 6,
                    "sharedBy": ["Jacob", "Jacob", "Eddy", "Kev", "Adnan"],
                    "sharedByString": "jjeka"
                }
            ]
        };
        let ex2 = JSON.stringify(ex_receipt1);
        let ex_receipt2 = JSON.parse(ex2);
        ex_receipt2.title = "bfresh";
        receipts.push(ex_receipt0);
        receipts.push(ex_receipt1);
        receipts.push(ex_receipt2);
    }
    return receipts;
}

//build the receipt list
function createReceiptList(receipts){
    let receiptList = document.getElementById("receiptList");
    for (let i=0; i<receipts.length; i++){
        receiptList.appendChild(addReceipt(receipts[i],i));
    }
};


//Builds a new receipt item in the receiptList <ul>
//Takes in a receipt json
//and the index of which receipt it is working on relative to the receipts array
function addReceipt(receipt, index){
    let newReceipt = document.createElement("li"); 
    let title = createReceiptTitle(receipt.title, "receiptTitle");
    let date = createReceiptTitle(" on " + receipt.date, "receiptDate");
    let sharedDiv = document.createElement("div");

    
    newReceipt.appendChild(title);
    newReceipt.appendChild(date);
    displayReceiptNames(sharedDiv, receipt);
    if (receipt.payer != -1){ //identify payer
        highlightPayer(sharedDiv, receipt);
    }
    newReceipt.appendChild(sharedDiv);
    newReceipt.onclick = () => { showFullReceipt(newReceipt); };
    return newReceipt;
};

function createReceiptTitle(value, class_name){
    let title = document.createElement("div");
    title.className = class_name;
    title.className = class_name; //title related stuff
    let tnode = document.createTextNode(value); //add title
    title.appendChild(tnode);
    return title;
}

function displayReceiptNames(sharedDiv,receipt) {
    sharedDiv.className = "sharedBy"; //where 
    for (let i=0; i < receipt.people.length; i++){ //add names
        let nameDiv = document.createElement("div");
        nameDiv.className = "names";
        let currColor = nameColors[(i + 1) % nameColors.length];
        nameDiv.style.background = currColor;
        tnode = document.createTextNode(receipt.people[i].name);
        nameDiv.appendChild(tnode);
        sharedDiv.appendChild(nameDiv);
    }
}

function highlightPayer(x, receipt) {
    let payerName = x.getElementsByClassName("names")[receipt.payer];
    payerName.className += " payer";
    payerName.style.fontSize = "16px";
}

function showFullReceipt(x){
    x.style.opacity = "0";
}

function populateReceipt(receipt){
    clearArrayData();
    for (let i = 0; i < receipt.people.length; i++){
        names[i] = receipt.people[i].name;
        initials[i] = receipt.people[i].initial;
    }
    let static = true;
    for (let i = 0; i < receipt.items.length; i++){
        items[i] = receipt.items[i].name;
        display(receipt.items[i].name,"items", static); //not editable
        prices[i] = receipt.items[i].price;
        display(prices[i].toString(),"prices", static); //not editable
        sharedBy[i] = receipt.items[i].sharedByString;
        displaySharedBy(sharedBy[i], static); //not editable
    }
}

function clearArrayData(){
    names = [];
    initials = [];
    items = [];
    prices = [];
    sharedBy = [];
}