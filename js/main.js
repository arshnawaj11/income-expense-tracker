 //select all var
const balance = document.querySelector("#balance");
const describtion =document.querySelector("#desc");
const inc_amt =document.querySelector("#inc-amt");
const exp_amt =document.querySelector("#exp-amt");
const amount =document.querySelector("#amount");
const trans=document.querySelector("#trans");
const form=document.querySelector("#form");
/*
const dummyData =[

{id: 1, describtion: "Flower" , amount: -20},
{id: 2, describtion: "Salary" , amount: 35000},
{id: 3, describtion: "Book" , amount: 10},
{id: 4, describtion: "Camera" , amount: -150},
{id: 5, describtion: "Petrol" , amount: -250},


];



let transactions = dummyData;
*/

const localStorageTrans =JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans")!==null?localStorageTrans:[];




function loadTransactionDetails(transaction){
    const sign= transaction.amount < 0? "-" : "+";
    const item=document.createElement("li")
    item.classList.add(transaction.amount < 0 ? "exp" : "inc")
     item.innerHTML = `
     ${transaction.describtion} 
     <span>${sign}  ${Math.abs(transaction.amount)} </span>
     <button class="btn-del" onclick="removeTrans(${transaction.id})">X</button>
     `;
     
     






    trans.appendChild(item);
//console.log(transaction)



}
function removeTrans(id){

    if(confirm("Are Sure You Want To Delete Transcation")){
        transactions=transactions.filter((transaction)=>transaction.id !=id);
        config();
        updateLocalStorage()
    } else{
        return;
    }


}
function updateAmount() {
    const amounts = transactions.map((transaction)=> transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item),0).toFixed(2);
    balance.innerHTML=`LKR ${total}`;

    const income = amounts.filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
     inc_amt.innerHTML=`LKR ${income}`;

     const expense = amounts.filter((item) => item < 0)
     .reduce((acc, item) => (acc += item), 0)
     .toFixed(2);
      exp_amt.innerHTML=`LKR ${Math.abs(expense)}`;


}
function config(){
 trans.innerHTML="";
 transactions.forEach(loadTransactionDetails);
 updateAmount()
 
}


function addTransaction(e) {
e.preventDefault();
     if(describtion.value.trim()=="" || amount.value.trim()== "" ){
         alert("Please Enter Describtion and Amount");
        }else{
               const transaction = {
               id: uniqueId(),
               describtion: describtion.value,
               amount:+amount.value,
               };   
               transactions.push(transaction);
               loadTransactionDetails(transaction);
               describtion.value = "";
               amount.value = "";
               updateAmount();
               updateLocalStorage()

              
         }

}

function uniqueId(){

    return Math.floor(Math.random() * 1000000);
}

form.addEventListener("submit", addTransaction);







window.addEventListener("load", function(){
config();



});


function updateLocalStorage(){

    localStorage.setItem("trans" , JSON.stringify(transactions));
}