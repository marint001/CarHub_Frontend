import React, { useState } from 'react';
import { FaDollarSign, FaPercentage, FaCalendarAlt } from 'react-icons/fa';

const FinancingCalculator = ({ carPrice = 50000 }) => {
  const [downPayment, setDownPayment] = useState(10000);
  const [interestRate, setInterestRate] = useState(5.9);
  const [loanTerm, setLoanTerm] = useState(60);
  const [taxRate, setTaxRate] = useState(8.5);

  const calculateMonthlyPayment = () => {
    const loanAmount = carPrice - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm;
    
    if (monthlyRate === 0) return loanAmount / numberOfPayments;
    
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - (carPrice - downPayment);

  return (
    <div className="finance-calculator">
      <h3>Financing Calculator</h3>
      
      <div className="calculator-inputs">
        <div className="input-group">
          <label>Vehicle Price: ${carPrice.toLocaleString()}</label>
        </div>
        
        <div className="input-group">
          <label><FaDollarSign /> Down Payment</label>
          <input 
            type="range" 
            min="0" 
            max={carPrice * 0.5} 
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
          />
          <span>${downPayment.toLocaleString()}</span>
        </div>
        
        <div className="input-group">
          <label><FaPercentage /> Interest Rate (%)</label>
          <input 
            type="range" 
            min="0" 
            max="15" 
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
          <span>{interestRate}%</span>
        </div>
        
        <div className="input-group">
          <label><FaCalendarAlt /> Loan Term (months)</label>
          <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}>
            <option value={36}>36 months (3 years)</option>
            <option value={48}>48 months (4 years)</option>
            <option value={60}>60 months (5 years)</option>
            <option value={72}>72 months (6 years)</option>
          </select>
        </div>
      </div>
      
      <div className="calculator-results">
        <div className="result-card">
          <h4>Monthly Payment</h4>
          <div className="amount">${monthlyPayment.toFixed(2)}</div>
        </div>
        <div className="result-card">
          <h4>Total Interest</h4>
          <div className="amount">${totalInterest.toFixed(2)}</div>
        </div>
        <div className="result-card">
          <h4>Total Cost</h4>
          <div className="amount">${totalPayment.toFixed(2)}</div>
        </div>
      </div>
      
      <button className="apply-financing">Apply for Financing →</button>
    </div>
  );
};

export default FinancingCalculator;