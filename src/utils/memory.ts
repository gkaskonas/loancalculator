import { LoanCalculation } from '../types/loan'

const loanCalculations: LoanCalculation[] = []

export function postLoanCalculation(loanResult: LoanCalculation): void {
    loanCalculations.push(loanResult)
}

export function putLoanCalculation(
    loanResult: LoanCalculation,
    loanIndex: number
): void {
    loanCalculations[loanIndex] = loanResult
}

export function getLoanCalculations(): LoanCalculation[] {
    return loanCalculations
}

export function getLoanCalculation(index: number): LoanCalculation {
    if (loanCalculations.length === 0) {
        throw new Error('No loan calculations available.')
    }

    try {
        return loanCalculations[index]
    } catch (error) {
        throw new Error('No loan calculation available at this index.')
    }
}
