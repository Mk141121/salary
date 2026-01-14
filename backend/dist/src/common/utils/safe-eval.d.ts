export declare function safeEval(expression: string, variables?: Record<string, number>): number;
export declare function validateExpression(expression: string, requiredVariables?: string[]): {
    valid: boolean;
    error?: string;
    usedVariables: string[];
};
export declare function extractVariables(expression: string): string[];
