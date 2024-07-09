import React, { useState } from "react";

const FirstPage = ({ formData, handleInputChange, errors }) => {
  const [selectedBudget, setSelectedBudget] = useState(formData.budget);

  const handleBudgetChange = (e) => {
    const budget = e.target.textContent;
    setSelectedBudget(budget);
    handleInputChange({ target: { name: "budget", value: budget } });
  };

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold text-center mb-8">What is your monthly digital marketing budget?</h1>
      <div className="flex flex-col gap-4">
        <label
          htmlFor=""
          className={`cursor-pointer shadow-md rounded-md p-4 ${selectedBudget === '<$1000/mon' ? 'bg-orange-100 text-orange-800' : 'text-gray-600'}`}
          onClick={handleBudgetChange}
        >
          &#60;$1000/mon
        </label>
        <label
          htmlFor=""
          className={`cursor-pointer shadow-md rounded-md p-4 ${selectedBudget === '$1,000 - $2,000' ? 'bg-orange-100 text-orange-800' : 'text-gray-600'}`}
          onClick={handleBudgetChange}
        >
          $1,000 - $2,000
        </label>
        <label
          htmlFor=""
          className={`cursor-pointer shadow-md rounded-md p-4 ${selectedBudget === '$2,000 - $5,000' ? 'bg-orange-100 text-orange-800' : 'text-gray-600'}`}
          onClick={handleBudgetChange}
        >
          $2,000 - $5,000
        </label>
        <label
          htmlFor=""
          className={`cursor-pointer shadow-md rounded-md p-4 ${selectedBudget === '$5,000 - $10,000' ? 'bg-orange-100 text-orange-800' : 'text-gray-600'}`}
          onClick={handleBudgetChange}
        >
          $5,000 - $10,000
        </label>
        <label
          htmlFor=""
          className={`cursor-pointer shadow-md rounded-md p-4 ${selectedBudget === '$10,000 - $25,000' ? 'bg-orange-100 text-orange-800' : 'text-gray-600'}`}
          onClick={handleBudgetChange}
        >
          $10,000 - $25,000
        </label>
        <label
          htmlFor=""
          className={`cursor-pointer shadow-md rounded-md p-4 ${selectedBudget === '$25,000 +' ? 'bg-orange-100 text-orange-800' : 'text-gray-600'}`}
          onClick={handleBudgetChange}
        >
          $25,000 +
        </label>
      </div>
      {errors.budget && (
        <p className="text-red-500 text-sm mt-2">{errors.budget}</p>
      )}
    </div>
  );
};

export default FirstPage;
