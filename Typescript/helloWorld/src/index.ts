let sales = 123_456_789;
let course = 'TypeScript';
let is_true = true;
//array
let numbers = [1, 2, 3];
//tuples
let user: [number, string, boolean, number] = [1, "rama", true, 5];
console.log(user);
//enum
enum Size { Small = 1, Medium, Large };
let mySize: Size = Size.Large;
console.log(mySize);
//fun
function calculateTax(income: number, taxYear: number): number {
    if (taxYear < 2022)
        return income * 1.2;
    return income * 1.5;
}
console.log(calculateTax(10000, 2023));
//fun2
function calculateTax1(income: number, taxYear = 2022): number {
    if (taxYear <= 2022)
        return income * 1.2;
    return income * 1.5;
}
console.log(calculateTax1(10000));
//objects
type Employee = {

    readonly id: number,
    name: string;
    retire: (date: Date) => void
}
let employee: Employee = {
    id: 1,
    name: 'ram',
    retire: (date: Date) => {
        console.log(date);
    }
}
//Union
function kgToLbs(weight: number | string): number {
    if (typeof weight === "number")
        return weight * 2.2;
    else
        return parseInt(weight) * 2.2;
}
console.log(kgToLbs(10));
console.log(kgToLbs('10'));
//Intersection
type Draggable = {
    drag: () => void
};
type Resizable = {
    resize: () => void
};
type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
    drag: () => { },
    resize: () => { }
};