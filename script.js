const balance = document.getElementById('balance'); 
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById("list");
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const dummyTransc = [
    {id:1, text: "Flower", amount: 20},
    {id:2, text: "Salary", amount: 300},
    {id:3, text: "Book", amount: -10},
    {id:4, text: "Camera", amount: 150},
];

let Transactions = [];


 
// Add Transactions
function addTransaction(e){
    e.preventDefault();
    if(
        text.value.trim() === "" || amount.value.trim() == ""
    ){
        alert("Please enter valid values!");
    } else {
        const transaction = {
            id : generateID(),
            text : text.value,
            amount : +amount.value,
        };

        Transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        text.value = "";
        amount.value = "";
    }
}  


// Generate id
function generateID(){
    return Math.floor(Math.random()*100000000);
}



function addTransactionDOM(transc){
    const sign = transc.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(
        transc.amount < 0 ? "minus" : "plus"
    )

    item.innerHTML = `
    ${transc.text}<span>${sign}${Math.abs(transc.amount)}</span>
    <button class="delete-btn" onClick="removeTransaction(${transc.id})">x</button>
    `;

    list.appendChild(item);
}


//remove Transaction

function removeTransaction(id){
    Transactions = Transactions.filter(
        (transaction) => transaction.id !== id
    );
    Init();
}

// Update values

function updateValues(){
    const amounts = Transactions.map(Transactions => Transactions.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0)* -1
    ).toFixed(2);
    
    // console.log(total);
    // console.log(income);
    // console.log(expense);

    balance.innerText = `$Rs. {total}`;
    money_plus.innerText = `$Rs. {income}`;
    money_minus.innerText = `$Rs. {expense}`;
}

//Init App
function Init(){
    list.innerHTML = "";
    Transactions.forEach(addTransactionDOM);
    updateValues()
}

// addTransaction(Transactions);
Init();
form.addEventListener("submit", addTransaction);
