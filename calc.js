var space = " ";
var operations = ['+', '-', '*', '/'];
var nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var calc = function (expression) {
    var calcExpressionResult = function (num1, num2, action) {
        var operand1 = parseInt(num1);
        var operand2 = parseInt(num2);
        switch (action) {
            case "+": return operand1 + operand2;
            case "-": return operand1 - operand2;
            case "*": return operand1 * operand2;
            case "/": return operand1 / operand2;
            default: return NaN;
        }
    };
    var operationResult = 0;
    var operation = "";
    var firstOperand = "";
    var secondOperand = "";
    var whatWeRead = "action";
    var isError = false;
    for (var i = 0; linkOnExpression.expression.length > 0 && !isError;) {
        if (linkOnExpression.expression[i] !== space) {
            if (whatWeRead === "action") {
                if (operations.includes(linkOnExpression.expression[i])) {
                    operation = linkOnExpression.expression[i];
                    whatWeRead = "operand1";
                }
                else {
                    isError = true;
                    console.log("Incorrect input! Expected operation. But we got: ", linkOnExpression.expression[i]);
                }
            }
            if (linkOnExpression.expression[i] == "(") {
                linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
                secondOperand = calc(linkOnExpression.expression).toString();
                whatWeRead = "operand1";
            }
            if (whatWeRead === "operand1" || whatWeRead === "operand2") {
                if (nums.includes(linkOnExpression.expression[i])) {
                    if (whatWeRead === "operand2") {
                        for (i; linkOnExpression.expression[i] !== space && linkOnExpression.expression.length > 0;) {
                            secondOperand = secondOperand + linkOnExpression.expression[i];
                            linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
                        }
                        linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
                        break;
                    }
                    if (whatWeRead === "operand1") {
                        for (i; linkOnExpression.expression[i] !== space && linkOnExpression.expression.length > 0;) {
                            firstOperand = firstOperand + linkOnExpression.expression[i];
                            linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
                        }
                        if (secondOperand === "") {
                            whatWeRead = "operand2";
                        }
                        else {
                            linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
                            break;
                        }
                    }
                }
                else if (!operations.includes(linkOnExpression.expression[i])) {
                    isError = true;
                    console.log("Incorrect input! Expected number. But we got: ", linkOnExpression.expression[i]);
                }
            }
        }
        linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
        if (linkOnExpression.expression[i] === ")") {
            linkOnExpression.expression = linkOnExpression.expression.slice(1, linkOnExpression.expression.length);
        }
    }
    operationResult = calcExpressionResult(firstOperand, secondOperand, operation);
    return operationResult;
};
var inputExpression = process.argv[2];
var linkOnExpression = { expression: inputExpression };
console.log(calc(linkOnExpression.expression));
