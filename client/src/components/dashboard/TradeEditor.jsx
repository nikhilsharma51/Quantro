import React, { useState } from 'react';
import useAppStore from '../../store/useAppStore';


const TradeEditor = ({ trade }) => {
  const updateTrade = useAppStore((s) => s.updateTrade);

  const [formData , setFormData] = useState({
    ...trade
  });

  const handleChange = (field , value) =>{
    setFormData((prev)=>({
      ...prev,
      [field] : Number(value),
    }));
  };

  const handleSave = () =>{
    updateTrade(formData);
  };

  return (
    <div className="bg-[#111827] p-4 rounded-xl space-y-3">
      <h3 className="text-sm font-medium">Edit Trade</h3>

      <div className="grid grid-cols-2 gap-3">
         <input
          className="bg-[#020617] p-2 rounded"
          value={formData.entry}
          onChange={(e) => handleChange("entry", e.target.value)}
          placeholder="Entry Price"
        />
        <input
          className="bg-[#020617] p-2 rounded"
          value={formData.exit}
          onChange={(e) => handleChange("exit", e.target.value)}
          placeholder="Exit Price"
        />
        <input
          className="bg-[#020617] p-2 rounded"
          type='number'
          
          
          value = {formData.qty}
          placeholder='Quantity'
          onChange={(e)=> handleChange("qty" , e.target.value)}
        />
      </div>

       <button
        onClick={handleSave}
        className="bg-emerald-500 px-4 py-2 rounded text-black"
      >
        Save Changes
      </button>
    </div>
  );
};

export default TradeEditor;
