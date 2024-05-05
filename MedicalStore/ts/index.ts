let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;

let OrderStatus: string;
let CurrentUserName: string;
let currentUser: User;
let currentMedicine: MedicineInfo;
let currentUserBalance: number;
let quantity: number;
let globalOrderId: string;
let medicineID: string;

let NewUserNameStatus = true;
// const tableBody = document.querySelector("#medicine-table tbody") as HTMLTableSectionElement;
// let userName=(document.getElementById("uname") as HTMLInputElement)?.value;
// (document.getElementById("welcome-name") as HTMLElement).innerHTML=userName;

class User {

    UserId: string;
    Name:string;
    UserName: string;
    readonly UserPassword: string;
    UserBalance: number;

    constructor(paramName:string,paramUserName: string, paramUserPassword: string, paramUserBalance: number) {


        UserIdAutoIncrement++;

        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.Name=paramName;
        this.UserName = paramUserName;
        this.UserPassword = paramUserPassword;
        this.UserBalance = paramUserBalance;

    }

}

class MedicineInfo {
    MedicineId: string;
    MedicineName: string;

    MedicinePrice: number;
    MedicineCount: number;
    MedicineExpiry: Date;

    constructor(paramMedicineName: string, paramMedicinePrice: number, paramMedicineCount: number, paramMedicineExpiry: Date) {
        MedicineIdAutoIncrement++;

        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineExpiry = paramMedicineExpiry;
    }

}



class Order {
    OrderId: string;
    MedicineId: string;
    UserId: string;

    MedicineName: string;
    MedicineCount: number;
    OrderStatusCancel: string;

    constructor(paramMedicineId: string, paramUserId: string, paramMedicineName: string, paramMedicineCount: number,paramOrderStatus: string) {
        OrderIdAutoIncrement++;

        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;

        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.OrderStatusCancel=paramOrderStatus;
    }
}







let UserArrayList: Array<User> = new Array<User>();

UserArrayList.push(new User("Hemanth","Hemanth@gmail.com", "123", 100));
UserArrayList.push(new User("Harish","Harish@gmail.com", "456", 200));

let MedicineList: Array<MedicineInfo> = new Array<MedicineInfo>();

MedicineList.push(new MedicineInfo("Paracetomol", 50, 5, new Date("2024-05-31")));
MedicineList.push(new MedicineInfo("Colpal", 60, 5, new Date("2024-05-31")));
MedicineList.push(new MedicineInfo("Stepsil", 70, 5, new Date("2024-05-31")));
MedicineList.push(new MedicineInfo("Iodex", 80, 5, new Date("2024-05-31")));
MedicineList.push(new MedicineInfo("Acetherol", 100, 5, new Date("2024-05-31")));

let OrderList: Array<Order> = new Array<Order>();




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
function takeToMainMenuBySignUp() {
    if (NewUserNameStatus == true) {
        let newName=(document.getElementById("uname") as HTMLInputElement).value;
        let newUserName = (document.getElementById('sign-up-email-id') as HTMLInputElement).value;
        let newUserPassword = (document.getElementById('sign-up-password') as HTMLInputElement).value;



        UserArrayList.push(new User(newName,newUserName, newUserPassword, 150));
        let container = document.getElementById("container") as HTMLDListElement;
        let menu = document.getElementById("menu") as HTMLDListElement;
        container.style.display = "none";
        menu.style.display = "inline";
        currentUser = UserArrayList[UserArrayList.length];
    }
    else {
        alert("Entered details are wrong");
    }
}




function takeToMainMenuBySignIn() {
    let userEmail = (document.getElementById("email-id") as HTMLInputElement).value;
    let userPassword = (document.getElementById("password") as HTMLInputElement).value;
    let isTrue = true;
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserName == userEmail && UserArrayList[i].UserPassword == userPassword) {
            let container = document.getElementById("container") as HTMLDListElement;
            let menu = document.getElementById("menu") as HTMLDListElement;
            container.style.display = "none";
            menu.style.display = "inline";
            isTrue = false;
            currentUser = UserArrayList[i];
            currentUserBalance = UserArrayList[i].UserBalance;
            return;
        }

    }
    if (isTrue) {
        alert("Invalid credentials");
    }
}

function displayMedicineList() {
    const tableBody = document.querySelector("#medicine-table tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    MedicineList.forEach((medicine) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${medicine.MedicineName}</td>
                <td>${medicine.MedicinePrice}</td>
                <td>${medicine.MedicineCount}</td>
                <td>${medicine.MedicineExpiry.toDateString()}</td>
                <td>
                    <input type="button" value="Edit" id="edit-btn" onclick="setMedicineIdNew('${medicine.MedicineId}');">
                    <input type="button" value="Delete" id="delete-btn" onclick="deleteRow('${medicine.MedicineId}');">
                </td>
            `;
        tableBody.appendChild(row);
    });
};
function deleteRow(id: string) {
    MedicineList = MedicineList.filter((item) => item.MedicineId != id);
    displayMedicineList();
}
function displayEditForm() {
    editRow(medicineID);
}
function setMedicineIdNew(id: string) {
    medicineID = id;
    hideAll();

    let buyForm = document.getElementById("edit-form") as HTMLDivElement;
    buyForm.style.display = "flex";

}
function editRow(id: string) {

    let medicineName = (document.getElementById("medicine-name") as HTMLInputElement).value;
    let medicinePrice = (document.getElementById("medicine-price") as HTMLInputElement).value;
    let medicineQuantity = (document.getElementById("medicine-quantity") as HTMLInputElement).value;
    let medicineExpiry = (document.getElementById("medicine-expiry") as HTMLInputElement).value;
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineId == id) {
            MedicineList[i].MedicineName = medicineName;
            MedicineList[i].MedicinePrice = parseInt(medicinePrice);
            MedicineList[i].MedicineCount = parseInt(medicineQuantity);
            MedicineList[i].MedicineExpiry = new Date(medicineExpiry);
            hideAll();
            return;
        }
    }
    displayMedicineList();

};
function displayAddForm()
{
    hideAll();
    let displayForm=document.getElementById("add-form") as HTMLDivElement;
    let medicine=document.getElementById("medicine-details-content") as HTMLDivElement;
    let medicineTable=document.getElementById("medicine-table") as HTMLDivElement;
    medicine.style.display="flex";
    medicineTable.style.display="none";
    displayForm.style.display="block";
}
function addRow()
{
    let medName=(document.getElementById("add-medicine-name") as HTMLInputElement).value;
    let medPrice=(document.getElementById("add-price") as HTMLInputElement).value;
    let medQuantity=(document.getElementById("add-quantity") as HTMLInputElement).value;
    let medExpiry=(document.getElementById("add-expiry") as HTMLInputElement).value;
    let newMedicine: MedicineInfo=new MedicineInfo(medName,parseInt(medPrice),parseInt(medQuantity),new Date(medExpiry));
    MedicineList.push(newMedicine);
    alert("Medicine added successfully");
    displayMedicineDetails();
}


function displayMedicineDetails() {

    hideAll();
    let medicine = document.getElementById("medicine-details-content") as HTMLDivElement;
    let medicineTable=document.getElementById("medicine-table") as HTMLDivElement;
    medicine.style.display = "flex";
    medicineTable.style.display="block";
    displayMedicineList();
};




function displayMedicineListForPurchase() {
    const tableBody = document.querySelector("#purchase-table tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    MedicineList.forEach((medicine) => {

        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${medicine.MedicineName}</td>
                <td>${medicine.MedicinePrice}</td>
                <td>${medicine.MedicineCount}</td>
                <td>${medicine.MedicineExpiry.toDateString()}</td>
                <td>
                 <input type="button" value="BUY" id="${medicine.MedicineId}" onclick="setMedicineID('${medicine.MedicineId}');">
                </td>
            `;
        tableBody.appendChild(row);
    });
};
function setMedicineID(id: string) {
    medicineID = id;
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

function buyTheMedicines(quantity: number) {

    for (let i = 0; i < MedicineList.length; i++) {
        if (medicineID == MedicineList[i].MedicineId) {
            if (MedicineList[i].MedicineCount >= quantity) {
                if (quantity * MedicineList[i].MedicinePrice <= currentUser.UserBalance) {
                    let newOrder: Order = new Order(medicineID, currentUser.UserId, MedicineList[i].MedicineName, quantity,"Ordered");
                    OrderList.push(newOrder);
                    currentUser.UserBalance -= quantity * MedicineList[i].MedicinePrice;
                    MedicineList[i].MedicineCount -= quantity;
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




function displayMedicineForCancel() {
    const tableBody = document.querySelector("#cancel-table tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    OrderList.forEach((order) => {
        if (order.UserId == currentUser.UserId) {
            const row = document.createElement("tr");
            row.innerHTML = `
                        <td>${order.MedicineName}</td>
                        <td>${order.MedicineCount}</td>
                        <td>
                        
                        <input type="button" value="CANCEL" id="cancel-btn" onclick="cancelMedicine('${order.OrderId}')">
                        </td>
                        <td id="${order.OrderId}">${order.OrderStatusCancel}</td>
                    `;
            tableBody.appendChild(row);
        }

    });
}
function cancelMedicine(id: string) {
    globalOrderId = id;
    let status = document.getElementById(globalOrderId) as HTMLElement;

    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].OrderId == id) {
            medicineCount(OrderList[i].MedicineId, OrderList[i].MedicineCount);
            OrderList[i].OrderStatusCancel="Cancelled";
            (document.getElementById(globalOrderId) as HTMLElement).innerHTML="Cancelled";
            (document.getElementById("cancel-btn") as HTMLInputElement).disabled = true;
            break;
        }
    }
}
function medicineCount(id: string, medicine: number) {
    for (let i = 0; i < MedicineList.length; i++) {
        if (id == MedicineList[i].MedicineId) {
            MedicineList[i].MedicineCount += medicine;
            currentUser.UserBalance+=MedicineList[i].MedicinePrice*medicine;
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
function displayOrders() {
    const tableBody = document.querySelector("#order-table tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    OrderList.forEach((order) => {
        if (order.UserId == currentUser.UserId) {
            const row = document.createElement("tr");
            row.innerHTML = `
                        <td>${order.MedicineName}</td>
                        <td>${order.MedicineCount}</td>

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
    currentUser.UserBalance += parseInt(amount);
    alert("recharge successfull");
    displayMedicineList();
}
function displayShowBalanceDetails() {
    hideAll();
    let showbalance = document.getElementById("show-balance-content") as HTMLDivElement;
    showbalance.style.display = "flex";
    let balance = document.getElementById("display-balance") as HTMLInputElement;
    balance.value = (currentUser.UserBalance).toString();


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
    let displayForm=document.getElementById("add-form") as HTMLDivElement;
    purchase.style.display = "none";
    cancel.style.display = "none";
    topup.style.display = "none";
    balance.style.display = "none";
    order.style.display = "none";
    medicine.style.display = "none";
    buymedicine.style.display = "none";
    buyForm.style.display = "none";
    displayForm.style.display="none";
}