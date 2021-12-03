

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
                    "name" : "Kev",
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
        receipts.push(ex_receipt0);
        receipts.push(ex_receipt1);
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
    let title = document.createElement("span"); 
    let sharedDiv = document.createElement("div");

    title.className = "receiptTitle"; //title related stuff
    let tnode = document.createTextNode(receipt.title); //add title
    title.appendChild(tnode);
    newReceipt.appendChild(title);
    tnode = document.createTextNode(" on " + receipt.date); //add date
    newReceipt.appendChild(tnode);
    
    sharedDiv.className = "sharedBy"; //where 
    sharedDiv.innerHTML = "with "
    for (let i=0; i < receipt.people.length; i++){ //add names
        let nameDiv = document.createElement("div");
        nameDiv.className = "names";
        let currColor = nameColors[(i + 1) % nameColors.length];
        nameDiv.style.background = currColor;
        tnode = document.createTextNode(receipt.people[i].name);
        nameDiv.appendChild(tnode);
        sharedDiv.appendChild(nameDiv);
    }
    if (receipt.payer != -1){ //identify payer
        let payerName = sharedDiv.getElementsByClassName("names")[receipt.payer];
        payerName.className += " payer";
        payerName.style.fontSize = "16px";
    }
    newReceipt.appendChild(sharedDiv);
    newReceipt.onclick = () => { showFullReceipt(index); };
    return newReceipt;
};

function showFullReceipt(i){
    console.log(receipts[i]);
}