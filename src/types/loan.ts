export interface LoanDetail {
    accrualDate: string
    daysElapsed: number
    dailyInterestWithoutMargin: string
    dailyInterestAccrued: string
}

export interface LoanInput {
    startDate: Date
    endDate: Date
    loanAmount: number
    loanCurrency: string
    baseInterestRate: number
    margin: number
}

export interface LoanCalculation extends LoanInput {
    details: LoanDetail[]
    totalInterest: string
    totalInterestWithoutMargin: string
}
