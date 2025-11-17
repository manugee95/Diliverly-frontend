import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLeftPanel from "../AuthLeftPanel";

export default function VerifyEmail() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    console.log("Verification Code:", verificationCode);

    // TODO: Integrate API here
    navigate("/vendor-setup");
  };

  return (
    <div className="min-h-screen flex bg-white flex-col lg:flex-row">
      {/* LEFT PANEL - Hides on small screens */}
      <div className="hidden lg:block lg:w-1/2">
        <AuthLeftPanel />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-20 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
          </div>

          <h1 className="text-xl font-normal text-gray-800 mb-2">
            Verify Your Email
          </h1>

          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            We've sent a 6-digit verification code to your email.
            <br /> Enter it below.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-8 gap-2 sm:gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) =>
                    handleChange(e.target.value.replace(/\D/g, ""), index)
                  }
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg font-light 
                  outline-0 rounded-lg focus:ring-2 focus:ring-green-500 transition-all bg-gray-50"
                />
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white py-3 rounded-lg font-medium shadow-sm">
              Verify Email
            </motion.button>
          </form>

          <p className="text-sm text-gray-500 mt-6 mb-3">
            Didn’t receive the code?
          </p>

          <Link
            to="#"
            className="text-green-600 font-medium hover:underline text-sm"
          >
            Resend code
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
