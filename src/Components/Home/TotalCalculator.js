import React, { useState } from "react";

export const NewItemForm = () => {
  const [servingsInput, setServingsInput] = useState(null);
  const [servingsPerContainer, setservingsPerContainer] = useState(null);
  const [price, setPrice] = useState(null);

  


return (
    <>
    <section className="calculation">
                
                <div className="total"></div>  

                <div className="calculate_button">
                <button className="btn btn-primary" onChange={handleTotalCalculation}>
                    Calculate Total
                </button>
                </div>

            </section>
            
      <div>
        <strong>Meters :</strong>
        <input type="number" value={meters} onChange={handleMeterInput} />
      </div>
      <div>
        <strong>Kilometers :</strong>
        <input type="number" value={kilometers} onChange={handleKiloInput} />
      </div>
    </>
  );
}