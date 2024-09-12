const space = ' ';
const operations: string[] = ['+', '-', '*', '/'];
const openedBracket = '(';
const closedBracket = ')'; 

type linkOnExpressionType = {
    expression: string;
}

const calc = (expression: string): number => {
    const calcExpressionResult = (num1: string | number, num2: string, action: string): number => {
        const operand1 = Number(num1)
        const operand2 = Number(num2)
        switch (action) {
            case '+': return operand1 + operand2
            case '-': return operand1 - operand2
            case '*': return operand1 * operand2
            case '/': {
                if (operand2 === 0){
                    return NaN
                }
                else{
                    return operand1 / operand2
                }
            }
            default: return NaN
        } 
    }
    const deleteAllBrackets = (line: string): string => {
        line = line.replaceAll(openedBracket, "");
        line = line.replaceAll(closedBracket, "");
        return line
    }
    const isExpressionValid = (expression: string): boolean => {
        let bracketsAmount = 0;
        for(let i = 0; i < expression.length; i++){
            switch (expression[i]){
                case '(': bracketsAmount++; break
                case ')': bracketsAmount--; break
            }
        }
        if (bracketsAmount === 0 && expression != ''){
            return true
        }
        else{
            return false
        }
    } 
    if (isExpressionValid(expression)){
        expression = deleteAllBrackets(expression)
        let operationSteck: string[] = []
        let operandQueue: string[] = []
        const expressionChars: string[] = expression.split(' ')
        for ( let i = 0; i < expressionChars.length; i++ ){
            let el = expressionChars[i]
            if (operations.includes(el)){
                operationSteck = [...operationSteck, el]
            }
            else if(!isNaN(Number(el)) && el !== '') {
                operandQueue.unshift(el)
            }
            else if(el !== ''){
                console.log(`'${el}' does not not recognized as an operation or operand`)
                return NaN
            }
        }
        let result: number = 0
        for (let i = operationSteck.length - 1, j = operandQueue.length - 1; i >= 0 && j >= 0; i--, j-- ){
            if (i === operationSteck.length - 1){
                if (operationSteck[i]){
                    const operation: string = operationSteck[i] 
                    if (operandQueue[j] && operandQueue[j-1]){
                        const firstOperand: string = operandQueue[j]
                        j--
                        const secondOperand: string = operandQueue[j]
                        result = calcExpressionResult(firstOperand, secondOperand, operation)
                    }
                }
            }
            else{
                if(operationSteck[i]){
                    const operation = operationSteck[i]
                    if(operandQueue[j]){
                        const operandTwo = operandQueue[j]
                        result = calcExpressionResult(result, operandTwo, operation)
                    }
                }
            }
            if (i === 0 && j >= 1 || i >= 1 && j === 0){
                console.log('Incorrect input! Check amount of parameters')
                return NaN
            }
            if (isNaN(result)){
                console.log('Error! It cannot be divided by 0!')
                return NaN
            } 
        }
        return result;
    }
    else{
        console.log('You have a error');
        return NaN
    } 
}
        
        

const inputExpression: string = process.argv[2];
const result: number = calc(inputExpression)
if (!isNaN(result)) {
    console.log(result)
}