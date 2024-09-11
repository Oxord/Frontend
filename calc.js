var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var space = ' ';
var operations = ['+', '-', '*', '/']; //одинарные кавычки
var openedBracket = '(';
var closedBracket = ')';
var calc = function (expression) {
    var calcExpressionResult = function (num1, num2, action) {
        var operand1 = Number(num1);
        var operand2 = Number(num2);
        switch (action) {
            case '+': return operand1 + operand2;
            case '-': return operand1 - operand2;
            case '*': return operand1 * operand2;
            case '/': return operand1 / operand2;
            default: return NaN;
        }
    };
    var deleteAllBrackets = function (line) {
        line = line.replaceAll(openedBracket, "");
        line = line.replaceAll(closedBracket, "");
        return line;
    };
    var isExpressionValid = function (expression) {
        var bracketsAmount = 0;
        for (var i = 0; i < expression.length; i++) {
            switch (expression[i]) {
                case '(':
                    bracketsAmount++;
                    break;
                case ')':
                    bracketsAmount--;
                    break;
            }
        }
        if (bracketsAmount === 0) {
            return true;
        }
        else {
            return false;
        }
    };
    var operationResult = 0;
    var operation = '';
    var firstOperand = '';
    var secondOperand = '';
    var whatWeRead = 'action';
    var isError = false;
    if (isExpressionValid(expression)) {
        expression = deleteAllBrackets(expression);
        var operationSteck = [];
        var operandQueue = [];
        var expressionChars = expression.split(' ');
        for (var i = 0; i < expressionChars.length; i++) {
            var el = expressionChars[i];
            if (operations.includes(el)) {
                operationSteck = __spreadArray(__spreadArray([], operationSteck, true), [el], false);
            }
            else if (!isNaN(Number(el)) && el !== '') {
                operandQueue.unshift(el);
            }
            else if (el !== '') {
                console.log("'".concat(el, "' does not not recognized as an operation or operand"));
                return NaN;
            }
        }
        var result_1 = 0;
        for (var i = operationSteck.length - 1, j = operandQueue.length - 1; i >= 0 && j >= 0; i--, j--) {
            if (i === operationSteck.length - 1) {
                if (operationSteck[i]) {
                    var operation_1 = operationSteck[i];
                    if (operandQueue[j] && operandQueue[j - 1]) {
                        var firstOperand_1 = operandQueue[j];
                        j--;
                        var secondOperand_1 = operandQueue[j];
                        result_1 = calcExpressionResult(firstOperand_1, secondOperand_1, operation_1);
                    }
                }
            }
            else {
                if (operationSteck[i]) {
                    var operation_2 = operationSteck[i];
                    if (operandQueue[j]) {
                        var operandTwo = operandQueue[j];
                        result_1 = calcExpressionResult(result_1, operandTwo, operation_2);
                    }
                }
            }
            if (i === 0 && j >= 1 || i >= 1 && j === 0) {
                console.log('Incorrect input! Check amount of parameters');
                return NaN;
            }
        }
        return result_1;
    }
    else {
        console.log('You have a error');
        return NaN;
    }
};
var inputExpression = process.argv[2];
var result = calc(inputExpression);
if (!isNaN(result)) {
    console.log(result);
}
