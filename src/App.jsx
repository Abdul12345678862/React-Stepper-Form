import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import back_icon from './assets/back-arrow.png';
import cross_icon from './assets/cross-icon.png';
import Button from "./components/UI/Button";
import ProgressBar from "./components/UI/ProgressBar";
import FirstPage from "./components/Form/FirstPage";
import SecondPage from "./components/Form/SecondPage"
import ThirdPage from "./components/Form/ThirdPage";

const STEPS = ["Step # 1", "Step # 2", "Step # 3"];
const STORAGE_KEY = "multistepFormData";
const STEP_KEY = "multistepFormStep";

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true); 

  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem(STEP_KEY);
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData
      ? JSON.parse(savedData)
      : {
          name: "",
          email: "",
          phone: "",
          comment: "",
          budget: ""
        };
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem(STEP_KEY, currentStep.toString());
  }, [currentStep]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (!isNaN(value)) {
          error = "Name cannot be a number";
        }
        break;
      case "email":
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format";
        break;
      case "phone":
        if (!/^\d{11}$/.test(value)) {
          error = "Phone must be 11 digits";
        } else if (/[^0-9]/.test(value)) {
          error = "Phone can't be letters";
        }
        break;
      case "comment":
        if (!value.trim()) {
          error = "Comment is required";
        } else if (!isNaN(value)) {
          error = "Comment cannot be a number";
        }
        break;
      case "budget":
        if (!value.trim()) {
          error = "Budget is required";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const isStepValid = () => {
    const currentFields =
      currentStep === 0
        ? ["budget"]
        : ["name", "email", "phone", "comment"];

    return currentFields.every(
      (field) => formData[field].trim() !== "" && !errors[field]
    );
  };

  const handleNext = () => {
    if (isStepValid()) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      const fieldsToValidate =
        currentStep === 0
          ? ["budget"]
          : ["name", "email", "phone", "comment"];
      fieldsToValidate.forEach((field) => {
        validateField(field, formData[field]);
      });
      toast.error("Please fill out all required fields correctly.");
    }
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleExit = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      comment: "",
      budget: ""
    });
    localStorage.removeItem(STORAGE_KEY);
    setIsFormVisible(false); 
  };

  const handleSubmit = () => {
    if (isStepValid()) {
      setIsSubmitting(true);

      // API call
      setTimeout(() => {
        toast.success("Form submitted successfully!");

        // Reset form fields and clear localStorage
        setFormData({
          name: "",
          email: "",
          phone: "",
          comment: "",
          budget: ""
        });
        localStorage.removeItem(STORAGE_KEY);

        // Reset 
        setCurrentStep(0);

        setIsSubmitting(false);
      }, 1000);
    } else {
      toast.error("Please fill out all required fields correctly.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <FirstPage
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 1:
        return (
          <SecondPage
            formData={formData}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            errors={errors}
          />
        );
      case 2:
        return <ThirdPage formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {isFormVisible ? (
        <div>
          <div className="flex justify-between my-7 px-4">
            <Button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center px-4 py-2 rounded bg-white hover:bg-gray-100"
            >
              <img className="w-5 h-5 mr-1 text-lg" src={back_icon} alt="" />Back
            </Button>
            <Button
              onClick={handleExit}
              className="flex items-center px-4 py-2 rounded bg-white hover:bg-gray-100"
            >
              Exit
              <img className="w-4 h-3 ml-1 text-lg" src={cross_icon} alt="" />
            </Button>
          </div>
          <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} />
          <div className="flex items-center justify-center min-h-screen bg-white">
            <div className=" bg-white p-8 rounded-2xl shadow-xl w-full max-w-md ">
              <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                {STEPS[currentStep]}
              </h1>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-between mt-8">
                {currentStep === STEPS.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`bg-green-500 text-white hover:bg-green-600 transition-colors ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Form Exited</h1>
            <p className="text-gray-600">You have exited the form. Thank you!</p>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;
