"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let UserIdAutoIncrement = 1002;
let MedicineIdAutoIncrement = 15;
let OrderIdAutoIncrement = 100;
let OrderStatus;
let CurrentUserName;
let currentUser;
let currentMedicine;
let currentUserBalance;
let quantity;
let globalOrderId;
let medicineIDNew;
let NewUserNameStatus = true;
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
    return __awaiter(this, void 0, void 0, function* () {
        const UserArrayList = yield fetchUsers();
        if (NewUserNameStatus == true) {
            let newName = document.getElementById("uname").value;
            let newUserName = document.getElementById('sign-up-email-id').value;
            let newUserPassword = document.getElementById('sign-up-password').value;
            let confirmUserPassword = document.getElementById("confirm-password").value;
            if (NameCheck(newName)) {
                if (UserNameCheck(newUserName)) {
                    if (PasswordCheck(newUserPassword)) {
                        if (SamePassword(newUserPassword, confirmUserPassword)) {
                            const user = {
                                userID: 0,
                                name: newName,
                                userName: newUserName,
                                userPassword: newUserPassword,
                                userBalance: 100
                            };
                            UserIdAutoIncrement = user.userID;
                            addContact(user);
                            let signUpPage = document.getElementById("sign-up-form");
                            let signInPage = document.getElementById("sign-in-form");
                            signUpPage.style.display = "none";
                            signInPage.style.display = "flex";
                        }
                    }
                }
            }
        }
        else {
            alert("Entered details are wrong");
        }
    });
}
function NameCheck(name) {
    var letters = /^[A-Za-z]+$/;
    if (letters.test(name)) {
        return true;
    }
    else {
        alert('Username must have alphabet characters only');
        return false;
    }
}
function UserNameCheck(userName) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailformat.test(userName)) {
        return true;
    }
    else {
        alert('Invalid emailID');
        return false;
    }
}
function PasswordCheck(password) {
    var pass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/;
    if (pass.test(password) == false) {
        return true;
    }
    else {
        alert("Invalid password");
        return false;
    }
}
function SamePassword(pass1, pass2) {
    if (pass1 != pass2) {
        alert("Password does not match");
        return false;
    }
    return true;
}
function takeToMainMenuBySignIn() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserArrayList = yield fetchUsers();
        let userEmail = document.getElementById("email-id").value;
        let userPassword = document.getElementById("password").value;
        let isTrue = true;
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].userName == userEmail && UserArrayList[i].userPassword == userPassword) {
                let container = document.getElementById("container");
                let menu = document.getElementById("menu");
                container.style.display = "none";
                menu.style.display = "inline";
                isTrue = false;
                currentUser = UserArrayList[i];
                currentUserBalance = UserArrayList[i].userBalance;
                return;
            }
        }
        if (isTrue) {
            alert("Invalid credentials");
        }
    });
}
function displayMedicineList() {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchMedicines();
        const tableBody = document.querySelector("#medicine-table tbody");
        tableBody.innerHTML = "";
        MedicineList.forEach((medicine) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${medicine.medicineName}</td>
                <td>${medicine.medicinePrice}</td>
                <td>${medicine.medicineCount}</td>
                <td>${medicine.medicineExpiry.toString().split('T')[0].split('-').reverse().join('/')}</td>
                <td>
                    <input type="button" value="Edit" id="edit-btn" onclick="setMedicineIdNew(${medicine.medicineID});">
                    <input type="button" value="Delete" id="delete-btn" onclick="deleteRow(${medicine.medicineID});">
                </td>
            `;
            tableBody.appendChild(row);
        });
    });
}
;
function deleteRow(id) {
    // MedicineList = MedicineList.filter((item) => item.medicineId != id);
    deleteMedicine(id);
    displayMedicineList();
}
function displayEditForm() {
    editRow(medicineIDNew);
}
function setMedicineIdNew(id) {
    medicineIDNew = id;
    hideAll();
    let buyForm = document.getElementById("edit-form");
    buyForm.style.display = "flex";
}
function editRow(id) {
    let medicineName = document.getElementById("medicine-name").value;
    let medicinePrice = document.getElementById("medicine-price").value;
    let medicineQuantity = document.getElementById("medicine-quantity").value;
    let medicineExpiry = document.getElementById("medicine-expiry").value;
    const editMedicine = {
        medicineID: medicineIDNew,
        medicineName: medicineName,
        medicinePrice: parseInt(medicinePrice),
        medicineCount: parseInt(medicineQuantity),
        medicineExpiry: new Date(medicineExpiry)
    };
    updateMedicine(medicineIDNew, editMedicine);
    displayMedicineList();
}
;
function displayAddForm() {
    hideAll();
    let displayForm = document.getElementById("add-form");
    let medicine = document.getElementById("medicine-details-content");
    let medicineTable = document.getElementById("medicine-table");
    medicine.style.display = "flex";
    medicineTable.style.display = "none";
    displayForm.style.display = "block";
}
function addRow() {
    return __awaiter(this, void 0, void 0, function* () {
        let medName = document.getElementById("add-medicine-name").value;
        let medPrice = document.getElementById("add-price").value;
        let medQuantity = document.getElementById("add-quantity").value;
        let medExpiry = document.getElementById("add-expiry").value;
        const MedicineList = yield fetchMedicines();
        const medicine = {
            medicineID: 0,
            medicineName: medName,
            medicinePrice: parseInt(medPrice),
            medicineCount: parseInt(medQuantity),
            medicineExpiry: new Date(medExpiry)
        };
        addMedicine(medicine);
        alert("Medicine added successfully");
        displayMedicineDetails();
    });
}
function displayMedicineDetails() {
    hideAll();
    let medicine = document.getElementById("medicine-details-content");
    let medicineTable = document.getElementById("medicine-table");
    medicine.style.display = "flex";
    medicineTable.style.display = "block";
    displayMedicineList();
}
;
function displayMedicineListForPurchase() {
    return __awaiter(this, void 0, void 0, function* () {
        const tableBody = document.querySelector("#purchase-table tbody");
        const MedicineList = yield fetchMedicines();
        tableBody.innerHTML = "";
        MedicineList.forEach((medicine) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${medicine.medicineName}</td>
                <td>${medicine.medicinePrice}</td>
                <td>${medicine.medicineCount}</td>
                <td>${medicine.medicineExpiry.toString().split('T')[0].split('-').reverse().join('/')}</td>
                <td>
                 <input type="button" value="BUY" id="${medicine.medicineID}" onclick="setMedicineID('${medicine.medicineID}');">
                </td>
            `;
            tableBody.appendChild(row);
        });
    });
}
;
function setMedicineID(id) {
    medicineIDNew = id;
    let purchase = document.getElementById("purchase-content");
    let buyForm = document.getElementById("buy-medicine");
    purchase.style.display = "none";
    buyForm.style.display = "flex";
}
function displayPurchaseDetails() {
    hideAll();
    let purchase = document.getElementById("purchase-content");
    purchase.style.display = "flex";
    displayMedicineListForPurchase();
}
;
function getQuantity() {
    let quantity = document.getElementById("quantity").value;
    buyTheMedicines(parseInt(quantity));
}
;
function buyTheMedicines(quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchMedicines();
        const OrderList = yield fetchOrders();
        for (let i = 0; i < MedicineList.length; i++) {
            if (medicineIDNew == MedicineList[i].medicineID) {
                if (MedicineList[i].medicineCount >= quantity) {
                    if (quantity * MedicineList[i].medicinePrice <= currentUser.userBalance) {
                        const order = {
                            orderID: 0,
                            medicineID: MedicineList[i].medicineID,
                            userID: currentUser.userID,
                            medicineName: MedicineList[i].medicineName,
                            medicineCount: quantity,
                            orderStatusCancel: "Ordered"
                        };
                        addOrder(order);
                        currentUser.userBalance -= quantity * MedicineList[i].medicinePrice;
                        const user = {
                            userID: currentUser.userID,
                            userName: currentUser.userName,
                            userBalance: currentUser.userBalance,
                            name: currentUser.name,
                            userPassword: currentUser.userPassword
                        };
                        updateUser(currentUser.userID, user);
                        const medicine = {
                            medicineID: MedicineList[i].medicineID,
                            medicineName: MedicineList[i].medicineName,
                            medicinePrice: MedicineList[i].medicinePrice,
                            medicineCount: MedicineList[i].medicineCount - quantity,
                            medicineExpiry: MedicineList[i].medicineExpiry
                        };
                        updateMedicine(MedicineList[i].medicineID, medicine);
                        alert("Purchase successfull");
                        hideAll();
                        return;
                    }
                    else {
                        alert("Insufficient balance");
                        break;
                    }
                }
                alert("Given quantity is more than required quantity");
                break;
            }
        }
    });
}
function displayMedicineForCancel() {
    return __awaiter(this, void 0, void 0, function* () {
        const OrderList = yield fetchOrders();
        const tableBody = document.querySelector("#cancel-table tbody");
        tableBody.innerHTML = "";
        OrderList.forEach((order) => {
            if (order.userID == currentUser.userID) {
                const row = document.createElement("tr");
                row.innerHTML = `
                        <td>${order.medicineName}</td>
                        <td>${order.medicineCount}</td>
                        <td>
                        
                        <input type="button" value="CANCEL" id="cancel-btn" onclick="cancelMedicine('${order.orderID}')">
                        </td>
                        <td id="${order.orderID}">${order.orderStatusCancel}</td>
                    `;
                tableBody.appendChild(row);
            }
        });
    });
}
function cancelMedicine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        globalOrderId = id;
        const MedicineList = yield fetchMedicines();
        let changeID = id.toString();
        const OrderList = yield fetchOrders();
        for (let i = 0; i < OrderList.length; i++) {
            for (let j = 0; j < MedicineList.length; j++) {
                if (OrderList[i].orderID == id && MedicineList[j].medicineID == OrderList[i].medicineID && OrderList[i].orderStatusCancel != "Cancelled") {
                    const editOrder = {
                        orderID: globalOrderId,
                        medicineID: OrderList[i].medicineID,
                        userID: OrderList[i].userID,
                        medicineName: OrderList[i].medicineName,
                        medicineCount: OrderList[i].medicineCount,
                        orderStatusCancel: "Cancelled"
                    };
                    document.getElementById(changeID).innerHTML = "Cancelled";
                    updateOrder(globalOrderId, editOrder);
                    currentUser.userBalance += MedicineList[i].medicinePrice * OrderList[i].medicineCount;
                    const user = {
                        userID: currentUser.userID,
                        userName: currentUser.userName,
                        userBalance: currentUser.userBalance,
                        name: currentUser.name,
                        userPassword: currentUser.userPassword
                    };
                    updateUser(currentUser.userID, user);
                    const editMedicine = {
                        medicineID: MedicineList[j].medicineID,
                        medicineName: MedicineList[j].medicineName,
                        medicinePrice: MedicineList[j].medicinePrice,
                        medicineCount: MedicineList[j].medicineCount + OrderList[i].medicineCount,
                        medicineExpiry: MedicineList[j].medicineExpiry
                    };
                    updateMedicine(MedicineList[j].medicineID, editMedicine);
                }
            }
        }
    });
}
function medicineCount(id, medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchMedicines();
        for (let i = 0; i < MedicineList.length; i++) {
            if (id == MedicineList[i].medicineID) {
                MedicineList[i].medicineCount += medicine;
                currentUser.userBalance += MedicineList[i].medicinePrice * medicine;
                const user = {
                    userID: currentUser.userID,
                    userName: currentUser.userName,
                    userBalance: currentUser.userBalance,
                    name: currentUser.name,
                    userPassword: currentUser.userPassword
                };
                updateUser(currentUser.userID, user);
                break;
            }
        }
    });
}
function displayCancelDetails() {
    hideAll();
    let cancel = document.getElementById("cancel-medicine-content");
    cancel.style.display = "flex";
    displayMedicineForCancel();
}
//Order details
function displayOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        const OrderList = yield fetchOrders();
        const tableBody = document.querySelector("#order-table tbody");
        tableBody.innerHTML = "";
        OrderList.forEach((order) => {
            if (order.userID == currentUser.userID) {
                const row = document.createElement("tr");
                row.innerHTML = `
                        <td>${order.medicineName}</td>
                        <td>${order.medicineCount}</td>

                    `;
                tableBody.appendChild(row);
            }
        });
    });
}
function displayOrderDetails() {
    hideAll();
    let order = document.getElementById("order-details-content");
    order.style.display = "flex";
    displayOrders();
}
function displayTopUp() {
    hideAll();
    let topUp = document.getElementById("topup-content");
    topUp.style.display = "flex";
}
function rechargeAmount() {
    let amount = document.getElementById("amount-to-recharge").value;
    currentUser.userBalance += parseInt(amount);
    const user = {
        userID: currentUser.userID,
        userName: currentUser.userName,
        userBalance: currentUser.userBalance,
        name: currentUser.name,
        userPassword: currentUser.userPassword
    };
    updateUser(currentUser.userID, user);
    alert("recharge successfull");
    displayMedicineList();
}
function displayShowBalanceDetails() {
    hideAll();
    let showbalance = document.getElementById("show-balance-content");
    showbalance.style.display = "flex";
    let balance = document.getElementById("display-balance");
    balance.value = (currentUser.userBalance).toString();
}
function hideAll() {
    let purchase = document.getElementById("purchase-content");
    let cancel = document.getElementById("cancel-medicine-content");
    let topup = document.getElementById("topup-content");
    let balance = document.getElementById("show-balance-content");
    let order = document.getElementById("order-details-content");
    let medicine = document.getElementById("medicine-details-content");
    let buymedicine = document.getElementById("buy-medicine");
    let buyForm = document.getElementById("edit-form");
    let displayForm = document.getElementById("add-form");
    purchase.style.display = "none";
    cancel.style.display = "none";
    topup.style.display = "none";
    balance.style.display = "none";
    order.style.display = "none";
    medicine.style.display = "none";
    buymedicine.style.display = "none";
    buyForm.style.display = "none";
    displayForm.style.display = "none";
}
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5137/api/User';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchMedicines() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5137/api/Medicine';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5137/api/Order';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function addContact(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5137/api/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function addMedicine(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5137/api/Medicine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function addOrder(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5137/api/Order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function updateMedicine(id, contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5137/api/Medicine/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
function updateUser(id, contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5137/api/User/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
function updateOrder(id, contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5137/api/Order/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
function deleteMedicine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5137/api/Medicine/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
    });
}
