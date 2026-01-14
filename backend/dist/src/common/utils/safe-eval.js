"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeEval = safeEval;
exports.validateExpression = validateExpression;
exports.extractVariables = extractVariables;
const expr_eval_1 = require("expr-eval");
const parser = new expr_eval_1.Parser({
    operators: {
        add: true,
        concatenate: false,
        conditional: true,
        divide: true,
        factorial: false,
        multiply: true,
        power: true,
        remainder: true,
        subtract: true,
        logical: true,
        comparison: true,
        'in': false,
        assignment: false,
    },
});
parser.functions.min = Math.min;
parser.functions.max = Math.max;
parser.functions.abs = Math.abs;
parser.functions.round = Math.round;
parser.functions.floor = Math.floor;
parser.functions.ceil = Math.ceil;
parser.functions.sqrt = Math.sqrt;
parser.functions.IF = (condition, trueVal, falseVal) => {
    return condition ? trueVal : falseVal;
};
parser.functions.ROUND = (value, decimals = 0) => {
    const multiplier = Math.pow(10, decimals);
    return Math.round(value * multiplier) / multiplier;
};
function safeEval(expression, variables = {}) {
    try {
        const dangerousPatterns = [
            /\beval\b/i,
            /\bfunction\b/i,
            /\brequire\b/i,
            /\bimport\b/i,
            /\bexport\b/i,
            /\bwindow\b/i,
            /\bdocument\b/i,
            /\bprocess\b/i,
            /\bglobal\b/i,
            /\bconstructor\b/i,
            /\bprototype\b/i,
            /\b__proto__\b/i,
            /\[\s*["']/,
            /[`$]/,
        ];
        for (const pattern of dangerousPatterns) {
            if (pattern.test(expression)) {
                throw new Error(`Biểu thức chứa pattern không an toàn`);
            }
        }
        const expr = parser.parse(expression);
        const result = expr.evaluate(variables);
        if (typeof result !== 'number' || !isFinite(result)) {
            throw new Error('Kết quả không phải số hợp lệ');
        }
        return result;
    }
    catch (error) {
        throw new Error(`Lỗi tính biểu thức "${expression}": ${error.message}`);
    }
}
function validateExpression(expression, requiredVariables) {
    try {
        const expr = parser.parse(expression);
        const usedVariables = expr.variables();
        if (requiredVariables) {
            const missing = requiredVariables.filter(v => !usedVariables.includes(v));
            if (missing.length > 0) {
                return {
                    valid: false,
                    error: `Thiếu biến bắt buộc: ${missing.join(', ')}`,
                    usedVariables,
                };
            }
        }
        return { valid: true, usedVariables };
    }
    catch (error) {
        return {
            valid: false,
            error: error.message,
            usedVariables: [],
        };
    }
}
function extractVariables(expression) {
    try {
        const expr = parser.parse(expression);
        return expr.variables();
    }
    catch {
        return [];
    }
}
//# sourceMappingURL=safe-eval.js.map