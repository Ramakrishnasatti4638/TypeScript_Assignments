"use strict";
let sales = 123456789;
let course = 'TypeScript';
let is_true = true;
let numbers = [1, 2, 3];
let user = [1, "rama", true, 5];
console.log(user);
var Size;
(function (Size) {
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large";
})(Size || (Size = {}));
;
let mySize = Size.Large;
console.log(mySize);
function calculateTax(income, taxYear) {
    if (taxYear < 2022)
        return income * 1.2;
    return income * 1.5;
}
console.log(calculateTax(10000, 2023));
function calculateTax1(income, taxYear = 2022) {
    if (taxYear <= 2022)
        return income * 1.2;
    return income * 1.5;
}
console.log(calculateTax1(10000));
let employee = {
    id: 1,
    name: 'ram',
    retire: (date) => {
        console.log(date);
    }
};
function kgToLbs(weight) {
    if (typeof weight === "number")
        return weight * 2.2;
    else
        return parseInt(weight) * 2.2;
}
console.log(kgToLbs(10));
console.log(kgToLbs('10'));
//# sourceMappingURL=index.js.map