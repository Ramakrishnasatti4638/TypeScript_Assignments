"use strict";
let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;
let CurrentUserName;
let currentUser;
let currentUserBalance;
let quantity;
let NewUserNameStatus = true;
class User {
    constructor(paramUserName, paramUserPassword, paramUserBalance) {
        UserIdAutoIncrement++;
        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.UserName = paramUserName;
        this.UserPassword = paramUserPassword;
        this.UserBalance = paramUserBalance;
    }
}
class MedicineInfo {
    constructor(paramMedicineName, paramMedicinePrice, paramMedicineCount, paramMedicineExpiry) {
        MedicineIdAutoIncrement++;
        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineExpiry = paramMedicineExpiry;
    }
}
class Order {
    constructor(paramMedicineId, paramUserId, paramMedicineName, paramMedicineCount) {
        OrderIdAutoIncrement++;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
    }
}
let UserArrayList = new Array();
UserArrayList.push(new User("Hemanth@gmail.com", "123", 100));
UserArrayList.push(new User("Harish@gmail.com", "456", 200));
let MedicineList = new Array();
MedicineList.push(new MedicineInfo("Paracetomol", 50, 5, new Date(15, 4, 2024)));
MedicineList.push(new MedicineInfo("Colpal", 60, 5, new Date(15, 4, 2024)));
MedicineList.push(new MedicineInfo("Stepsil", 70, 5, new Date(15, 4, 2024)));
MedicineList.push(new MedicineInfo("Iodex", 80, 5, new Date(15, 4, 2024)));
MedicineList.push(new MedicineInfo("Acetherol", 100, 5, new Date(15, 4, 2024)));
let OrderList = new Array();
function displaySignUp() {
    let normalPage = document.getElementById("sign-in-form");
    let signUpPage = document.getElementById("sign-up-form");
    normalPage.style.display = "none";
    signUpPage.style.display = "flex";
    signUpPage.style.alignItems = "center";
}
function displaySignIn() {
    let normalPage = document.getElementById("sign-up-form");
    let signInPage = document.getElementById("sign-in-form");
    normalPage.style.display = "none";
    signInPage.style.display = "flex";
    signInPage.style.alignItems = "center";
}
function takeToMainMenuBySignUp() {
    if (NewUserNameStatus == true) {
        let newUserName = document.getElementById('email-id').value;
        let newUserPassword = document.getElementById('password').value;
        UserArrayList.push(new User(newUserName, newUserPassword, 150));
        let container = document.getElementById("container");
        let menu = document.getElementById("menu");
        container.style.display = "none";
        menu.style.display = "inline";
        currentUser = UserArrayList[-1].UserId;
    }
    else {
        alert("Entered details are wrong");
    }
}
function takeToMainMenuBySignIn() {
    let userEmail = document.getElementById("email-id").value;
    let userPassword = document.getElementById("password").value;
    let isTrue = true;
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserName == userEmail && UserArrayList[i].UserPassword == userPassword) {
            let container = document.getElementById("container");
            let menu = document.getElementById("menu");
            container.style.display = "none";
            menu.style.display = "inline";
            isTrue = false;
            currentUser = UserArrayList[i].UserId;
            currentUserBalance = UserArrayList[i].UserBalance;
            return;
        }
    }
    if (isTrue) {
        alert("Invalid credentials");
    }
}
function displayMedicineDetails() {
    let purchase = document.getElementById("purchase-content");
    let cancel = document.getElementById("cancel-medicine-content");
    let topup = document.getElementById("topup-content");
    let balance = document.getElementById("show-balance-content");
    let order = document.getElementById("order-details-content");
    let medicine = document.getElementById("medicine-details-content");
    purchase.style.display = "none";
    cancel.style.display = "none";
    topup.style.display = "none";
    balance.style.display = "none";
    order.style.display = "none";
    medicine.style.display = "flex";
}
function displayPurchaseDetails() {
    let purchase = document.getElementById("purchase-content");
    let cancel = document.getElementById("cancel-medicine-content");
    let topup = document.getElementById("topup-content");
    let balance = document.getElementById("show-balance-content");
    let order = document.getElementById("order-details-content");
    let medicine = document.getElementById("medicine-details-content");
    cancel.style.display = "none";
    topup.style.display = "none";
    balance.style.display = "none";
    order.style.display = "none";
    medicine.style.display = "none";
    purchase.style.display = "flex";
}
function buyMedicine() {
    let purchase = document.getElementById("purchase-content");
    let buyForm = document.getElementById("buy-medicine");
    purchase.style.display = "none";
    buyForm.style.display = "flex";
}
function buyTheMedicines() {
    let purchase = document.getElementById("purchase-content");
    let buyForm = document.getElementById("buy-medicine");
    let quantity = document.getElementById("quantity").value;
    let availableQuantity = 5;
    if (parseInt(quantity) > availableQuantity) {
        alert("Quantity entered is greater than available quantity");
        return;
    }
    if (currentUserBalance > 50) {
        alert("Purchase successfull");
        buyForm.style.display = "none";
        purchase.style.display = "flex";
    }
}
