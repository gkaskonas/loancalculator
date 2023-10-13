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
    return loanCalculations[index]
}
