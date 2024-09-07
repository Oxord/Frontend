const space = " ";
const operations: string[] = ['+', '-', '*', '/'];
const nums: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const openedBracket = "(";
const closedBracket = ")"; 

type linkOnExpressionType = {
    expression: string;
}

const calc = (expression: string): number => {
    const calcExpressionResult = (num1: string, num2: string, action: string): number => {
        const operand1 = parseInt(num1);
        const operand2 = parseInt(num2);
        switch (action) {
            case "+": return operand1 + operand2;
            case "-": return operand1 - operand2;
            case "*": return operand1 * operand2;
            case "/": return operand1 / operand2;
            default: return NaN;   
        } 
    }
    let operationResult: number = 0;
    let operation: string = "";
    let firstOperand: string = "";
    let secondOperand: string = "";
    let whatWeRead: string = "action";
    let isError: boolean = false;

    for (const i = 0; linkOnExpression.expression.length > 0 && !isError; ){
        
        if (linkOnExpression.expression[i] !== space){
            if (linkOnExpression.expression[i] == openedBracket || (operations.includes(linkOnExpression.expression[i]) && whatWeRead === "operand1")) {
                if (linkOnExpression.expression[i] == openedBracket){
                    linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
                }
                secondOperand = calc(linkOnExpression.expression).toString();
                whatWeRead = "operand1";
            }
            if (whatWeRead === "action"){
                if (operations.includes(linkOnExpression.expression[i])){
                    operation = linkOnExpression.expression[i];   
                    whatWeRead = "operand1";
                }   
            }
            if (whatWeRead === "operand1" || whatWeRead === "operand2"){
                if (nums.includes(linkOnExpression.expression[i])){
                    if(whatWeRead === "operand2"){
                        for ( i; linkOnExpression.expression[i] !== space && linkOnExpression.expression.length > 0; ){
                            secondOperand = secondOperand + linkOnExpression.expression[i];
                            linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
                        }
                        linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
                        break;
                    }
                    if(whatWeRead === "operand1"){
                        for ( i; linkOnExpression.expression[i] !== space && linkOnExpression.expression.length > 0; ){
                            firstOperand = firstOperand + linkOnExpression.expression[i];
                            linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
                        }
                        if (secondOperand === ""){
                            whatWeRead = "operand2";
                        }
                        else{
                            linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
                            break;
                        }
                    }
                }
                else if(!operations.includes(linkOnExpression.expression[i])){
                    isError = true;
                    console.log("Incorrect input! Expected number.");
                }
            }
        }

        linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
        if (linkOnExpression.expression[i] === closedBracket ){
            linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
        }
    }
    
    operationResult = calcExpressionResult(firstOperand, secondOperand, operation);
    return operationResult;
}

const inputExpression: string = process.argv[2];
const linkOnExpression: linkOnExpressionType = {expression: inputExpression}
console.log(calc(linkOnExpression.expression));