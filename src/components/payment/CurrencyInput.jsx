import React, { useState } from 'react';

const CurrencyInput = ({
  value,
  onChange,
  currency,
  symbols,
  onCurrencyChange,
  currencies,
}) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const input = e.target.value;
    const num = parseFloat(input);

    if (input === '') {
      setAmount(input);
      setError('');
      return;
    }

    if (!/^\d*\.?\d*$/.test(input)) {
      setError('Please enter only numbers.');
      return;
    }

    // Check for more than 2 decimal places
    if (!/^\d*(\.\d{0,2})?$/.test(input)) {
      setError('Only two decimal places allowed.');
      return;
    }

    // Validation rules
    if (isNaN(num) || num < 1 || num > 100000) {
      setError('Please enter a valid amount between 1 and 100000.');
      return;
    }

    setAmount(input);
    setError('');
    onChange(input);
  };

  const handleBlur = () => {
    if (amount === '')
      return;

    const amount_trailing_zero = amount.endsWith('.') ? amount + '0' : amount;
    const num = parseFloat(amount_trailing_zero)

    if (isNaN(num))
      return;

    const formatted = num.toFixed(2);

    setAmount(formatted);
    onChange(formatted);
  };

  return (
    <>
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full max-w-md">
        <div className="flex flex-col items-center justify-center px-3 py-2 bg-gray-50 border-r border-gray-300 text-[#ad46ff] font-semibold">
          <span>{symbols[currency]}</span>
          <select
            value={currency}
            onChange={(e) => onCurrencyChange?.(e.target.value)}
            className="bg-transparent text-[#ad46ff] font-semibold focus:outline-none cursor-pointer"
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={handleInputChange}
          onBlur={handleBlur}
          aria-label="Donation amount input"
          placeholder="10.00"
          className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"
        />
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-1 pl-2">{error}</p>
      )}
    </>
  );
};

export default CurrencyInput;