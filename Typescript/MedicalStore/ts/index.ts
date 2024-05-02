let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;


let CurrentUserName: string;
let currentUser:string;
let currentUserBalance:number;
let quantity:number;

let NewUserNameStatus = true;



class User {

    UserId: string;
    UserName: string;
    readonly UserPassword: string;
    UserBalance: number;

    constructor(paramUserName: string, paramUserPassword: string, paramUserBalance: number) {

        
        UserIdAutoIncrement++;

        this.UserId = "UI" + UserIdAutoIncrement.toString();

        this.UserName = paramUserName;
        this.UserPassword=paramUserPassword;
        this.UserBalance=paramUserBalance;

    }

}

class MedicineInfo {
    MedicineId: string;
    MedicineName: string;
    
    MedicinePrice: number;
    MedicineCount: number;
    MedicineExpiry: Date;

    constructor(paramMedicineName: string,  paramMedicinePrice: number,paramMedicineCount: number,paramMedicineExpiry: Date) {
        MedicineIdAutoIncrement++;

        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineExpiry=paramMedicineExpiry;
    }

}



class Order {
    OrderId: string;
    MedicineId: string;
    UserId: string;

    MedicineName: string;
    MedicineCount: number;

    constructor(paramMedicineId: string, paramUserId: string, paramMedicineName: string, paramMedicineCount: number) {
        OrderIdAutoIncrement++;

        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;

        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
    }
}







let UserArrayList: Array<User> = new Array<User>();

UserArrayList.push(new User("Hemanth@gmail.com","123",100));
UserArrayList.push(new User("Harish@gmail.com", "456",200));

let MedicineList: Array<MedicineInfo> = new Array<MedicineInfo>();

MedicineList.push(new MedicineInfo("Paracetomol",  50,5,new Date(15,4,2024)));
MedicineList.push(new MedicineInfo("Colpal",  60,5,new Date(15,4,2024)));
MedicineList.push(new MedicineInfo("Stepsil",  70,5,new Date(15,4,2024)));
MedicineList.push(new MedicineInfo("Iodex",  80,5,new Date(15,4,2024)));
MedicineList.push(new MedicineInfo("Acetherol",  100,5,new Date(15,4,2024)));

let OrderList: Array<Order> = new Array<Order>();



function displaySignUp()
{
    let normalPage=document.getElementById("sign-in-form") as HTMLDListElement;
    let signUpPage=document.getElementById("sign-up-form") as HTMLDivElement;
    normalPage.style.display="none";
    signUpPage.style.display="flex";
   signUpPage.style.alignItems="center";
}
function displaySignIn()
{
    let normalPage=document.getElementById("sign-up-form") as HTMLDListElement;
    let signInPage=document.getElementById("sign-in-form") as HTMLDivElement;
    normalPage.style.display="none";
    signInPage.style.display="flex";
    signInPage.style.alignItems="center";
}
function takeToMainMenuBySignUp()
{
    if (NewUserNameStatus == true) {
        let newUserName = (document.getElementById('email-id') as HTMLInputElement).value;
        let newUserPassword = (document.getElementById('password') as HTMLInputElement).value;



        UserArrayList.push(new User(newUserName, newUserPassword,150));
        let container=document.getElementById("container") as HTMLDListElement;
        let menu=document.getElementById("menu") as HTMLDListElement;
        container.style.display="none";
        menu.style.display="inline";
        currentUser=UserArrayList[-1].UserId;
    }
    else
    {
        alert("Entered details are wrong");
    }
}



// function checkNewUserName(paramNewUserName: string) {
//     let newUserName = (document.getElementById(paramNewUserName) as HTMLInputElement).value;
//     let newUserNameMessage = document.getElementById(paramNewUserName + "Message") as HTMLLabelElement;
//     let newUserNameRegex = /^[a-zA-Z]{3,20}$/;

//     if (newUserNameRegex.test(newUserName)) {

//         NewUserNameStatus = true;
//         newUserNameMessage.style.visibility = "hidden";
//     }
//     else {
//         NewUserNameStatus = false;
//         newUserNameMessage.innerHTML = "Please enter valid name";
//         newUserNameMessage.style.visibility = "visible";
//         newUserNameMessage.style.color = "tomato";
//         newUserNameMessage.style.marginLeft = "10px";
//     }

// }

// function checkNewUserAge(paramNewUserAge: string) {
//     let newUserAge = (document.getElementById(paramNewUserAge) as HTMLInputElement).value;
//     let newUserAgeMessage = document.getElementById(paramNewUserAge + "Message") as HTMLLabelElement;
//     let newUserAgeRegex = /^\d{1,2}$/;

//     if (newUserAgeRegex.test(newUserAge)) {

//         NewUserAgeStatus = true;
//         newUserAgeMessage.style.visibility = "hidden";
//     }
//     else {
//         NewUserAgeStatus = false;
//         newUserAgeMessage.innerHTML = "Please enter valid age";
//         newUserAgeMessage.style.visibility = "visible";
//         newUserAgeMessage.style.color = "tomato";
//         newUserAgeMessage.style.marginLeft = "10px";
//     }

// }

// function checkNewUserPhoneNumber(paramNewUserPhoneNumber: string) {
//     let newUserPhoneNumber = (document.getElementById(paramNewUserPhoneNumber) as HTMLInputElement).value;
//     let newUserPhoneNumberMessage = document.getElementById(paramNewUserPhoneNumber + "Message") as HTMLLabelElement;
//     let newUserPhoneNumberRegex = /^\d{10}$/;

//     if (newUserPhoneNumberRegex.test(newUserPhoneNumber)) {

//         NewUserPhoneNumberStatus = true;
//         newUserPhoneNumberMessage.style.visibility = "hidden";
//     }
//     else {
//         NewUserPhoneNumberStatus = false;
//         newUserPhoneNumberMessage.innerHTML = "Please enter valid phone number";
//         newUserPhoneNumberMessage.style.visibility = "visible";
//         newUserPhoneNumberMessage.style.color = "tomato";
//         newUserPhoneNumberMessage.style.marginLeft = "10px";
//     }

// }

// function existingUserPage() {
//     let homePage = document.getElementById('homePage') as HTMLDivElement;
//     let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
//     let availableUser = document.getElementById('availableUser') as HTMLLabelElement;

//     homePage.style.display = "none";
//     existingUserPage.style.display = "block";

//     availableUser.innerHTML = "<h2>Available User</h2>";


//     for (let i = 0; i < UserArrayList.length; i++) {

//         availableUser.innerHTML += `User Name : ${UserArrayList[i].UserName} | User Id : ${UserArrayList[i].UserId}<br>`;
//     }

// }

// function signIn() {

//     let noExistingUserIdChecker: boolean = false;
//     let existingUserId = (document.getElementById('existingUserId') as HTMLInputElement).value;

//     let existingUserIdRegex = /^UI\d{4}$/;

//     if (existingUserIdRegex.test(existingUserId)) {

//         for (let i = 0; i < UserArrayList.length; i++) {
//             if (UserArrayList[i].UserId == existingUserId) {

//                 CurrentUserId = UserArrayList[i].UserId;
//                 CurrentUserName = UserArrayList[i].UserName;

//                 medicinePage();

//                 return;
//             }
//             else {
//                 noExistingUserIdChecker = true;
//             }
//         }

//         if (noExistingUserIdChecker) {
//             alert("Enter Valid User Id");
//         }
//     }
//     else {
//         alert("Enter Valid User Id.");
//     }

// }
function takeToMainMenuBySignIn()
{
    let userEmail=(document.getElementById("email-id") as HTMLInputElement).value;
    let userPassword=(document.getElementById("password") as HTMLInputElement).value;
    let isTrue=true;
    for(let i=0;i<UserArrayList.length;i++)
        {
            if(UserArrayList[i].UserName==userEmail && UserArrayList[i].UserPassword==userPassword)
                {
                    let container=document.getElementById("container") as HTMLDListElement;
                    let menu=document.getElementById("menu") as HTMLDListElement;
                    container.style.display="none";
                    menu.style.display="inline";
                    isTrue=false;
                    currentUser=UserArrayList[i].UserId;
                    currentUserBalance=UserArrayList[i].UserBalance;
                    return;
                }
            
        }
        if(isTrue)
            {
                alert("Invalid credentials");
            }
}
// function medicinePage() {

//     // let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
//     // let medicinePage = document.getElementById('medicinePage') as HTMLDivElement;
//     // let greet = document.getElementById('greet') as HTMLLabelElement;

//     // existingUserPage.style.display = "none";
//     // medicinePage.style.display = "block";
//     document.getElementById("medicine-details-content").style.display="flex";

//     // greet.innerHTML = `<h3>Hello ${CurrentUserName}</h3>`;
// }
function displayMedicineDetails()
{
    let purchase=document.getElementById("purchase-content") as HTMLDivElement;
    let cancel=document.getElementById("cancel-medicine-content") as HTMLDivElement;
    let topup=document.getElementById("topup-content") as HTMLDivElement;
    let balance=document.getElementById("show-balance-content") as HTMLDivElement;
    let order=document.getElementById("order-details-content") as HTMLDivElement;
    let medicine=document.getElementById("medicine-details-content") as HTMLDivElement;
    purchase.style.display="none";
    cancel.style.display="none";
    topup.style.display="none";
    balance.style.display="none";
    order.style.display="none";
    medicine.style.display="flex";
}

// function medicineListCheck() {
//     let medicineInfo = document.getElementById('medicineInfo') as HTMLLabelElement;

//     let medicineList = document.getElementById('medicineList') as HTMLSelectElement;

//     let medicineName = medicineList[medicineList.selectedIndex].innerHTML;

//     for (let i = 0; i < MedicineList.length; i++) {

//         if (MedicineList[i].MedicineName == medicineName) {
//             medicineInfo.innerHTML = `Medicine Id : ${MedicineList[i].MedicineId} --- Medicine Name : ${MedicineList[i].MedicineName} --- Medicine Count : ${MedicineList[i].MedicineCount} --- Medicine Price : ${MedicineList[i].MedicinePrice} `;

//             displayRequiredCount();
//         }

//     }
// }

// function displayRequiredCount() {
//     let medicineInfo = document.getElementById('medicineInfo') as HTMLLabelElement;
//     let requiredCount = document.getElementById('requiredCount') as HTMLDivElement;

//     medicineInfo.style.display = "block";
//     requiredCount.style.display = "block";
// }
function  displayPurchaseDetails()
{
    let purchase=document.getElementById("purchase-content") as HTMLDivElement;
    let cancel=document.getElementById("cancel-medicine-content") as HTMLDivElement;
    let topup=document.getElementById("topup-content") as HTMLDivElement;
    let balance=document.getElementById("show-balance-content") as HTMLDivElement;
    let order=document.getElementById("order-details-content") as HTMLDivElement;
    let medicine=document.getElementById("medicine-details-content") as HTMLDivElement;
    cancel.style.display="none";
    topup.style.display="none";
    balance.style.display="none";
    order.style.display="none";
    medicine.style.display="none";
    purchase.style.display="flex";
}
function buyMedicine()
{
    let purchase=document.getElementById("purchase-content") as HTMLDivElement;
    let buyForm=document.getElementById("buy-medicine") as HTMLDivElement;
    purchase.style.display="none";
    buyForm.style.display="flex";
    
}
function buyTheMedicines()
{
    let purchase=document.getElementById("purchase-content") as HTMLDivElement;
    let buyForm=document.getElementById("buy-medicine") as HTMLDivElement;
    let quantity=(document.getElementById("quantity") as HTMLInputElement).value;
    let availableQuantity=5;
    if(parseInt(quantity)>availableQuantity)
        {
            alert("Quantity entered is greater than available quantity");
            return;
        }
    if(currentUserBalance>50)
        {
            alert("Purchase successfull");
            buyForm.style.display="none";
            purchase.style.display="flex";
    
        }

}
// function buyMedicine() {

//     let proceed : boolean = true;
//     let finalMedicineRequiredCount : number = 0;

//     let medicineList = document.getElementById('medicineList') as HTMLSelectElement;
//     let medicineRequiredCount = (document.getElementById('medicineRequiredCount') as HTMLInputElement).value;

//     let medicineName = medicineList[medicineList.selectedIndex].innerHTML;

//     let medicineRequiredCountRegex = /^\d{1,3}$/;

//     if (medicineRequiredCountRegex.test(medicineRequiredCount) && +medicineRequiredCount > 0) {
//         for (let i = 0; i < MedicineList.length; i++) {

//             if (MedicineList[i].MedicineName == medicineName) {

                
//                 if (MedicineList[i].MedicineCount > 0) {

//                     if((MedicineList[i].MedicineCount - +medicineRequiredCount) < 0)
//                     {
//                         proceed = confirm(`We only have ${MedicineList[i].MedicineCount} ${MedicineList[i].MedicineName}. Do you want to buy ${MedicineList[i].MedicineCount} ${MedicineList[i].MedicineName}?`)
                        
//                         if(proceed)
//                         {
//                             finalMedicineRequiredCount = MedicineList[i].MedicineCount;
//                         }
//                     }
//                     else
//                     {
//                         finalMedicineRequiredCount = +medicineRequiredCount;
//                     }

//                     if(proceed)
//                     {
//                         MedicineList[i].MedicineCount = MedicineList[i].MedicineCount - finalMedicineRequiredCount;

//                         OrderList.push(new Order(MedicineList[i].MedicineId, CurrentUserId, MedicineList[i].MedicineName, finalMedicineRequiredCount));
//                         alert("Purchase Success.");
//                         displayHomePage();
//                     }
                   
//                 }
//                 else if(MedicineList[i].MedicineCount <= 0) {
//                     alert("Out of Stock, you can buy alternative medicine.");
//                 }
//             }

//         }
//     }
//     else {
//         alert("Please enter valid Required Count");
//     }


// }

// function showHistory() {
//     let historyDisplay = document.getElementById('historyDisplay') as HTMLLabelElement;
//     historyDisplay.style.display = "block";

//     let orderCount: number = 0;
//     historyDisplay.innerHTML = "<h3>Order History</h3>";

//     for (let i = 0; i < OrderList.length; i++) {
//         if (OrderList[i].UserId == CurrentUserId) {
//             historyDisplay.innerHTML += `You buyed ${OrderList[i].MedicineCount} ${OrderList[i].MedicineName}<br>`;
//             orderCount++;
//         }
//     }

//     if (orderCount == 0) {
//         historyDisplay.innerHTML += "Order History is empty.<br>";
//     }
// }

// function displayHomePage() {
//     CurrentUserId = "";
//     CurrentUserName = "";

//     let medicineList = document.getElementById('medicineList') as HTMLSelectElement;
//     medicineList.selectedIndex = 0;

//     let requiredCount = document.getElementById('requiredCount') as HTMLDivElement;
//     let medicineInfo = document.getElementById('medicineInfo') as HTMLLabelElement;
//     let historyDisplay = document.getElementById('historyDisplay') as HTMLLabelElement;

//     let medicinePage = document.getElementById('medicinePage') as HTMLDivElement;
//     let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
//     let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
//     let homePage = document.getElementById('homePage') as HTMLDivElement;

//     (document.getElementById('medicineRequiredCount') as HTMLInputElement).value = null;
//     (document.getElementById('existingUserId') as HTMLInputElement).value = null;

//     requiredCount.style.display = "none";
//     historyDisplay.style.display = "none";
//     medicinePage.style.display = "none";
//     medicineInfo.style.display = "none";
//     newUserPage.style.display = "none";
//     existingUserPage.style.display = "none";
//     homePage.style.display = "block";
// }