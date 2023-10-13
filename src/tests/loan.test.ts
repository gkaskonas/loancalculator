import assert from 'assert'
import { calculateLoanInterest } from '../utils/loan'

describe('test loan_calculator', function () {
    it('test loan_calculator.calculateLoanInterest', function (done) {
        let loan = {
            startDate: new Date('2021-01-01'),
            endDate: new Date('2021-01-30'),
            loanAmount: 10000,
            baseInterestRate: 2,
            margin: 1,
            loanCurrency: 'USD',
        }
        let loanResult = calculateLoanInterest(loan)
        assert.equal(loanResult.loanAmount, 10000)
        assert.equal(loanResult.baseInterestRate, 2)
        assert.equal(loanResult.margin, 1)
        assert.equal(loanResult.totalInterest, 23.84)
        assert.equal(loanResult.totalInterestWithoutMargin, 15.89)
        assert.equal(loanResult.details.length, 29)
        assert.equal(loanResult.details[0].accrualDate, '2021-01-01')
        assert.equal(loanResult.details[0].daysElapsed, 0)
        assert.equal(loanResult.details[0].dailyInterestWithoutMargin, 0.55)
        assert.equal(loanResult.details[0].dailyInterestAccrued, 0.82)
        assert.equal(loanResult.details[28].accrualDate, '2021-01-29')
        assert.equal(loanResult.details[28].daysElapsed, 28)
        assert.equal(loanResult.details[28].dailyInterestWithoutMargin, 0.55)
        assert.equal(loanResult.details[28].dailyInterestAccrued, 0.82)
        done()
    })
    it('test loan interest over 1 year', function (done) {
        let loan = {
            startDate: new Date('2021-01-01'),
            endDate: new Date('2022-01-01'),
            loanAmount: 10000,
            baseInterestRate: 10,
            margin: 2,
            loanCurrency: 'USD',
        }
        let loanResult = calculateLoanInterest(loan)
        assert.equal(loanResult.loanAmount, 10000)
        assert.equal(loanResult.baseInterestRate, 10)
        assert.equal(loanResult.margin, 2)
        assert.equal(loanResult.totalInterest, 1200)
        assert.equal(loanResult.totalInterestWithoutMargin, 1000)
        assert.equal(loanResult.details.length, 365)
        assert.equal(loanResult.details[0].accrualDate, '2021-01-01')
        assert.equal(loanResult.details[0].daysElapsed, 0)
        assert.equal(loanResult.details[0].dailyInterestWithoutMargin, 2.74)
        assert.equal(loanResult.details[0].dailyInterestAccrued, 3.29)
        assert.equal(loanResult.details[325].accrualDate, '2021-11-22')
        assert.equal(loanResult.details[325].daysElapsed, 325)
        assert.equal(loanResult.details[325].dailyInterestWithoutMargin, 2.74)
        assert.equal(loanResult.details[325].dailyInterestAccrued, 3.29)
        done()
    })
})
