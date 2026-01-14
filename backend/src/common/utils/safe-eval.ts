/**
 * Safe Expression Evaluator
 * Sử dụng expr-eval để tính toán biểu thức an toàn
 * Thay thế new Function() có thể bị khai thác code injection
 */

import { Parser } from 'expr-eval';

// Tạo parser với các hàm toán học cơ bản
const parser = new Parser({
  operators: {
    // Chỉ cho phép các toán tử cơ bản
    add: true,
    concatenate: false, // Không cho phép nối chuỗi
    conditional: true,  // Cho phép điều kiện ? :
    divide: true,
    factorial: false,   // Không cần
    multiply: true,
    power: true,
    remainder: true,
    subtract: true,
    // Toán tử logic
    logical: true,
    comparison: true,
    // Không cho phép assignment hoặc array
    'in': false,
    assignment: false,
  },
});

// Thêm các hàm an toàn
parser.functions.min = Math.min;
parser.functions.max = Math.max;
parser.functions.abs = Math.abs;
parser.functions.round = Math.round;
parser.functions.floor = Math.floor;
parser.functions.ceil = Math.ceil;
parser.functions.sqrt = Math.sqrt;

// Hàm IF cho công thức điều kiện
parser.functions.IF = (condition: number | boolean, trueVal: number, falseVal: number): number => {
  return condition ? trueVal : falseVal;
};

// Làm tròn đến n chữ số thập phân
parser.functions.ROUND = (value: number, decimals = 0): number => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
};

/**
 * Tính toán biểu thức toán học một cách an toàn
 * @param expression Biểu thức toán học (VD: "LUONG_CO_BAN * CONG_THUC_TE / CONG_CHUAN")
 * @param variables Các biến và giá trị (VD: { LUONG_CO_BAN: 10000000, CONG_THUC_TE: 22, CONG_CHUAN: 26 })
 * @returns Kết quả số
 */
export function safeEval(expression: string, variables: Record<string, number> = {}): number {
  try {
    // Validate biểu thức không chứa các pattern nguy hiểm
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
      /\[\s*["']/,  // Không cho phép truy cập thuộc tính bằng []
      /[`$]/,       // Không cho phép template literals
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(expression)) {
        throw new Error(`Biểu thức chứa pattern không an toàn`);
      }
    }

    // Parse và evaluate
    const expr = parser.parse(expression);
    const result = expr.evaluate(variables);

    // Kiểm tra kết quả hợp lệ
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Kết quả không phải số hợp lệ');
    }

    return result;
  } catch (error) {
    throw new Error(`Lỗi tính biểu thức "${expression}": ${error.message}`);
  }
}

/**
 * Validate biểu thức trước khi lưu
 * @param expression Biểu thức cần validate
 * @param requiredVariables Danh sách biến phải có (optional)
 * @returns true nếu hợp lệ
 */
export function validateExpression(
  expression: string,
  requiredVariables?: string[]
): { valid: boolean; error?: string; usedVariables: string[] } {
  try {
    const expr = parser.parse(expression);
    const usedVariables = expr.variables();

    // Kiểm tra các biến bắt buộc
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
  } catch (error) {
    return {
      valid: false,
      error: error.message,
      usedVariables: [],
    };
  }
}

/**
 * Lấy danh sách biến từ biểu thức
 */
export function extractVariables(expression: string): string[] {
  try {
    const expr = parser.parse(expression);
    return expr.variables();
  } catch {
    return [];
  }
}
