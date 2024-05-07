let UserIdAutoIncrement = 1002;
let MedicineIdAutoIncrement = 15;
let OrderIdAutoIncrement = 100;

let OrderStatus: string;
let CurrentUserName: string;
let currentUser: Users;
let currentMedicine: Medicines;
let currentUserBalance: number;
let quantity: number;
let globalOrderId: number;
let medicineIDNew: number;

let NewUserNameStatus = true;



interface Users {

    userID: number;
    name: string;
    userName: string;
    userPassword: string;
    userBalance: number;




}

interface Medicines {
    medicineID: number;
    medicineName: string;

    medicinePrice: number;
    medicineCount: number;
    medicineExpiry: Date;


}





interface Orders {
    orderID: number;
    medicineID: number;
    userID: number;

    medicineName: string;
    medicineCount: number;
    orderStatusCancel: string;

}










function displaySignUp() {
    let normalPage = document.getElementById("sign-in-form") as HTMLDListElement;
    let signUpPage = document.getElementById("sign-up-form") as HTMLDivElement;
    normalPage.style.display = "none";
    signUpPage.style.display = "flex";
    signUpPage.style.alignItems = "center";
}
function displaySignIn() {
    let normalPage = document.getElementById("sign-up-form") as HTMLDListElement;
    let signInPage = document.getElementById("sign-in-form") as HTMLDivElement;
    normalPage.style.display = "none";
    signInPage.style.display = "flex";
    signInPage.style.alignItems = "center";
}
async function takeToMainMenuBySignUp() {
    const UserArrayList = await fetchUsers();
    if (NewUserNameStatus == true) {
        let newName = (document.getElementById("uname") as HTMLInputElement).value;
        let newUserName = (document.getElementById('sign-up-email-id') as HTMLInputElement).value;
        let newUserPassword = (document.getElementById('sign-up-password') as HTMLInputElement).value;
        let confirmUserPassword=(document.getElementById("confirm-password") as HTMLInputElement).value;
        if(NameCheck(newName))
            {
                if(UserNameCheck(newUserName))
                    {
                        if(PasswordCheck(newUserPassword))
                            {
                                if(SamePassword(newUserPassword,confirmUserPassword))
                                    {
                                        const user: Users = {
                                            userID: 0,
                                            name: newName,
                                            userName: newUserName,
                                            userPassword: newUserPassword,
                                            userBalance: 100
                                        };
                                        UserIdAutoIncrement = user.userID;
                                        addContact(user);
                                        let signUpPage = document.getElementById("sign-up-form") as HTMLDListElement;
                                        let signInPage = document.getElementById("sign-in-form") as HTMLDivElement;
                                        signUpPage.style.display = "none";
                                        signInPage.style.display="flex";
                                    }
                            }
                    }
            }


        
        
    }
    else {
        alert("Entered details are wrong");
    }
}



function NameCheck(name:string){
    var letters = /^[A-Za-z]+$/;
    if (letters.test(name)) {
        
        return true;
        
    }
    else {
        alert('Username must have alphabet characters only');
        return false;
    }
}

function UserNameCheck(userName:string)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailformat.test(userName)) {
        
        return true;
        
    }
    else {
        alert('Invalid emailID');
        return false;
    }
}

function PasswordCheck(password:string)
{
    var pass= /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/
    if(pass.test(password)==false)
        {
            return true;
        }
    else{
        alert("Invalid password");
        return false;
    }
}
function SamePassword(pass1:string,pass2:string)
{
    if(pass1!=pass2){
        alert("Password does not match");
        return false;
    }
    return true;
}
async function takeToMainMenuBySignIn() {
    const UserArrayList = await fetchUsers();
    let userEmail = (document.getElementById("email-id") as HTMLInputElement).value;
    let userPassword = (document.getElementById("password") as HTMLInputElement).value;
    let isTrue = true;
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].userName == userEmail && UserArrayList[i].userPassword == userPassword) {
            let container = document.getElementById("container") as HTMLDListElement;
            let menu = document.getElementById("menu") as HTMLDListElement;
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
}

async function displayMedicineList() {
    const MedicineList = await fetchMedicines();
    const tableBody = document.querySelector("#medicine-table tbody") as HTMLTableSectionElement;
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
};
function deleteRow(id: number) {
    // MedicineList = MedicineList.filter((item) => item.medicineId != id);
    deleteMedicine(id);
    displayMedicineList();
}
function displayEditForm() {
    editRow(medicineIDNew);
}
function setMedicineIdNew(id: number) {
    medicineIDNew = id;
    hideAll();

    let buyForm = document.getElementById("edit-form") as HTMLDivElement;
    buyForm.style.display = "flex";

}
function editRow(id: number) {

    let medicineName = (document.getElementById("medicine-name") as HTMLInputElement).value;
    let medicinePrice = (document.getElementById("medicine-price") as HTMLInputElement).value;
    let medicineQuantity = (document.getElementById("medicine-quantity") as HTMLInputElement).value;
    let medicineExpiry = (document.getElementById("medicine-expiry") as HTMLInputElement).value;
    const editMedicine: Medicines = {
        medicineID: medicineIDNew,
        medicineName: medicineName,
        medicinePrice: parseInt(medicinePrice),
        medicineCount: parseInt(medicineQuantity),
        medicineExpiry: new Date(medicineExpiry)

    };
    updateMedicine(medicineIDNew, editMedicine);
    displayMedicineList();

};
function displayAddForm() {
    hideAll();
    let displayForm = document.getElementById("add-form") as HTMLDivElement;
    let medicine = document.getElementById("medicine-details-content") as HTMLDivElement;
    let medicineTable = document.getElementById("medicine-table") as HTMLDivElement;
    medicine.style.display = "flex";
    medicineTable.style.display = "none";
    displayForm.style.display = "block";
}
async function addRow() {
    let medName = (document.getElementById("add-medicine-name") as HTMLInputElement).value;
    let medPrice = (document.getElementById("add-price") as HTMLInputElement).value;
    let medQuantity = (document.getElementById("add-quantity") as HTMLInputElement).value;
    let medExpiry = (document.getElementById("add-expiry") as HTMLInputElement).value;
    const MedicineList = await fetchMedicines();
    const medicine: Medicines = {
        medicineID: 0,
        medicineName: medName,
        medicinePrice: parseInt(medPrice),
        medicineCount: parseInt(medQuantity),
        medicineExpiry: new Date(medExpiry)
    };
    addMedicine(medicine);
    alert("Medicine added successfully");
    displayMedicineDetails();
}


function displayMedicineDetails() {

    hideAll();
    let medicine = document.getElementById("medicine-details-content") as HTMLDivElement;
    let medicineTable = document.getElementById("medicine-table") as HTMLDivElement;
    medicine.style.display = "flex";
    medicineTable.style.display = "block";
    displayMedicineList();
};




async function displayMedicineListForPurchase() {
    const tableBody = document.querySelector("#purchase-table tbody") as HTMLTableSectionElement;
    const MedicineList = await fetchMedicines();
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
};
function setMedicineID(id: number) {
    medicineIDNew = id;
    let purchase = document.getElementById("purchase-content") as HTMLDivElement;
    let buyForm = document.getElementById("buy-medicine") as HTMLDivElement;
    purchase.style.display = "none";
    buyForm.style.display = "flex";

}
function displayPurchaseDetails() {

    hideAll();
    let purchase = document.getElementById("purchase-content") as HTMLDivElement;
    purchase.style.display = "flex";
    displayMedicineListForPurchase();
};

function getQuantity() {


    let quantity = (document.getElementById("quantity") as HTMLInputElement).value
    buyTheMedicines(parseInt(quantity));
};

async function buyTheMedicines(quantity: number) {
    const MedicineList = await fetchMedicines();
    const OrderList=await fetchOrders();
    for (let i = 0; i < MedicineList.length; i++) {
        if (medicineIDNew == MedicineList[i].medicineID) {
            if (MedicineList[i].medicineCount >= quantity) {
                if (quantity * MedicineList[i].medicinePrice <= currentUser.userBalance) {

                    const order: Orders = {
                        orderID: 0  ,
                        medicineID: MedicineList[i].medicineID,
                        userID: currentUser.userID,
                        medicineName: MedicineList[i].medicineName,
                        medicineCount: quantity,
                        orderStatusCancel: "Ordered"
                    };
                    addOrder(order);
                    
                    currentUser.userBalance -= quantity * MedicineList[i].medicinePrice;
                    const user: Users={
                        userID:currentUser.userID,
                        userName:currentUser.userName,
                        userBalance:currentUser.userBalance,
                        name:currentUser.name,
                        userPassword:currentUser.userPassword
                    }
                    updateUser(currentUser.userID,user);
                    const medicine: Medicines = {
                        medicineID: MedicineList[i].medicineID,
                        medicineName: MedicineList[i].medicineName,
                        medicinePrice: MedicineList[i].medicinePrice,
                        medicineCount: MedicineList[i].medicineCount - quantity,
                        medicineExpiry: MedicineList[i].medicineExpiry
                    }
                    updateMedicine(MedicineList[i].medicineID, medicine);
                    alert("Purchase successfull")
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

}




async function displayMedicineForCancel() {
    const OrderList = await fetchOrders();
    const tableBody = document.querySelector("#cancel-table tbody") as HTMLTableSectionElement;
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
}
async function cancelMedicine(id: number) {


    globalOrderId = id;
    const MedicineList = await fetchMedicines();
    let changeID = id.toString();
    const OrderList = await fetchOrders();
    for (let i = 0; i < OrderList.length; i++) {
        for (let j = 0; j < MedicineList.length; j++) {
            if (OrderList[i].orderID == id && MedicineList[j].medicineID == OrderList[i].medicineID && OrderList[i].orderStatusCancel != "Cancelled") {
                const editOrder: Orders = {
                    orderID: globalOrderId,
                    medicineID: OrderList[i].medicineID,
                    userID: OrderList[i].userID,
                    medicineName: OrderList[i].medicineName,
                    medicineCount: OrderList[i].medicineCount,
                    orderStatusCancel: "Cancelled"
                };
                (document.getElementById(changeID) as HTMLElement).innerHTML = "Cancelled";
                updateOrder(globalOrderId, editOrder);
                currentUser.userBalance += MedicineList[i].medicinePrice * OrderList[i].medicineCount
                const user: Users={
                    userID:currentUser.userID,
                    userName:currentUser.userName,
                    userBalance:currentUser.userBalance,
                    name:currentUser.name,
                    userPassword:currentUser.userPassword
                }
                updateUser(currentUser.userID,user);
                const editMedicine: Medicines = {
                    medicineID: MedicineList[j].medicineID,
                    medicineName: MedicineList[j].medicineName,
                    medicinePrice: MedicineList[j].medicinePrice,
                    medicineCount: MedicineList[j].medicineCount + OrderList[i].medicineCount,
                    medicineExpiry: MedicineList[j].medicineExpiry
                }
                updateMedicine(MedicineList[j].medicineID, editMedicine);

            }
        }

    }




}
async function medicineCount(id: number, medicine: number) {
    const MedicineList = await fetchMedicines();
    for (let i = 0; i < MedicineList.length; i++) {
        if (id == MedicineList[i].medicineID) {
            MedicineList[i].medicineCount += medicine;
            currentUser.userBalance += MedicineList[i].medicinePrice * medicine;
            const user: Users={
                userID:currentUser.userID,
                userName:currentUser.userName,
                userBalance:currentUser.userBalance,
                name:currentUser.name,
                userPassword:currentUser.userPassword
            }
            updateUser(currentUser.userID,user);
            break;
        }
    }
}
function displayCancelDetails() {

    hideAll();
    let cancel = document.getElementById("cancel-medicine-content") as HTMLDivElement;

    cancel.style.display = "flex";
    displayMedicineForCancel()
}

//Order details
async function displayOrders() {
    const OrderList = await fetchOrders();
    const tableBody = document.querySelector("#order-table tbody") as HTMLTableSectionElement;
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
}
function displayOrderDetails() {

    hideAll();
    let order = document.getElementById("order-details-content") as HTMLDivElement;
    order.style.display = "flex";
    displayOrders();
}
function displayTopUp() {
    hideAll();
    let topUp = document.getElementById("topup-content") as HTMLDivElement;
    topUp.style.display = "flex";
}

function rechargeAmount() {
    let amount = (document.getElementById("amount-to-recharge") as HTMLInputElement).value;
    currentUser.userBalance += parseInt(amount);
    const user: Users={
        userID:currentUser.userID,
        userName:currentUser.userName,
        userBalance:currentUser.userBalance,
        name:currentUser.name,
        userPassword:currentUser.userPassword
    }
    updateUser(currentUser.userID,user);
    alert("recharge successfull");
    displayMedicineList();
}
function displayShowBalanceDetails() {
    hideAll();
    let showbalance = document.getElementById("show-balance-content") as HTMLDivElement;
    showbalance.style.display = "flex";
    let balance = document.getElementById("display-balance") as HTMLInputElement;
    balance.value = (currentUser.userBalance).toString();


}
function hideAll() {
    let purchase = document.getElementById("purchase-content") as HTMLDivElement;
    let cancel = document.getElementById("cancel-medicine-content") as HTMLDivElement;
    let topup = document.getElementById("topup-content") as HTMLDivElement;
    let balance = document.getElementById("show-balance-content") as HTMLDivElement;
    let order = document.getElementById("order-details-content") as HTMLDivElement;
    let medicine = document.getElementById("medicine-details-content") as HTMLDivElement;
    let buymedicine = document.getElementById("buy-medicine") as HTMLDivElement;
    let buyForm = document.getElementById("edit-form") as HTMLDivElement;
    let displayForm = document.getElementById("add-form") as HTMLDivElement;
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

async function fetchUsers(): Promise<Users[]> {
    const apiUrl = 'http://localhost:5137/api/User';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}

async function fetchMedicines(): Promise<Medicines[]> {
    const apiUrl = 'http://localhost:5137/api/Medicine';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}

async function fetchOrders(): Promise<Orders[]> {
    const apiUrl = 'http://localhost:5137/api/Order';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}

async function addContact(contact: Users): Promise<void> {
    const response = await fetch('http://localhost:5137/api/User', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });
    if (!response.ok) {
        throw new Error('Failed to add contact');
    }
}

async function addMedicine(contact: Medicines): Promise<void> {
    const response = await fetch('http://localhost:5137/api/Medicine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });
    if (!response.ok) {
        throw new Error('Failed to add contact');
    }
}
async function addOrder(contact: Orders): Promise<void> {
    const response = await fetch('http://localhost:5137/api/Order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });
    if (!response.ok) {
        throw new Error('Failed to add contact');
    }
}
async function updateMedicine(id: number, contact: Medicines): Promise<void> {
    const response = await fetch(`http://localhost:5137/api/Medicine/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });
    if (!response.ok) {
        throw new Error('Failed to update contact');
    }

}
async function updateUser(id: number, contact: Users): Promise<void> {
    const response = await fetch(`http://localhost:5137/api/User/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });
    if (!response.ok) {
        throw new Error('Failed to update contact');
    }

}
async function updateOrder(id: number, contact: Orders): Promise<void> {
    const response = await fetch(`http://localhost:5137/api/Order/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });
    if (!response.ok) {
        throw new Error('Failed to update contact');
    }

}

async function deleteMedicine(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5137/api/Medicine/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }

}