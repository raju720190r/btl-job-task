
import { useState } from 'react';
import FormOne from './FormOne';
import FormTwo from './FormTwo';

const Home = () => {
   const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(null);
  

  const handleNextStep = (data, file) => {
    setFormData(data);
    
    setStep(2);
  };
  return (
    <div>
      {step === 1 && <FormOne onNext={handleNextStep} />}
      {step === 2 && <FormTwo formData={formData}/>}
    </div>
  );
};

export default Home;