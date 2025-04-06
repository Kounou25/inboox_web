import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const email = location.state?.email || "votre email";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isResending]);

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      if (otp.length !== 6) {
        toast.error("Veuillez entrer un code à 6 chiffres");
        return;
      }

      const email = location.state?.email;
      const userResponse = await fetch(`http://localhost:3000/api/users/userProfile/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const userData = await userResponse.json();
      
      if (!userResponse.ok) {
        throw new Error(userData.error || 'Erreur lors de la récupération du profil utilisateur');
      }

      const otpResponse = await fetch('/api/otp/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });

      const otpResult = await otpResponse.json();

      if (!otpResponse.ok) {
        throw new Error(otpResult.error || 'Erreur lors de la vérification de l\'OTP');
      }

      const sendUserIdResponse = await fetch('http://localhost:3000/api/apiKeys/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.id
        }),
      });

      if (!sendUserIdResponse.ok) {
        throw new Error('Erreur lors de l\'envoi du user_id');
      }

      toast.success("Vérification réussie!");
      localStorage.setItem("userEmail", email);
      navigate("/dashboard");

    } catch (error) {
      console.error('Erreur détaillée:', error);
      toast.error(error.message || "Une erreur est survenue lors de la vérification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    if (countdown === 0) {
      setIsResending(true);
      setTimeout(() => {
        toast.success("Un nouveau code a été envoyé à votre email");
        setCountdown(60);
        setIsResending(false);
      }, 1500);
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = otp.split("");
      newOtp[index] = value;
      setOtp(newOtp.join(""));
      
      // Déplacer le focus au champ suivant si un chiffre est entré
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gradient-blue">Vérification</h1>
          <p className="text-gray-600 mt-2">
            Nous avons envoyé un code de vérification à <span className="font-medium">{email}</span>
          </p>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full flex justify-center gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={otp[index] || ""}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                disabled={isLoading}
                className="w-12 h-12 text-center text-blue-600 font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            ))}
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleVerify}
            disabled={otp.length !== 6 || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Vérification...
              </div>
            ) : (
              "Vérifier"
            )}
          </Button>
          
          <div className="text-center text-sm">
            <p className="text-gray-600 mb-2">
              Vous n'avez pas reçu de code?
            </p>
            <Button
              variant="link"
              onClick={handleResendCode}
              disabled={countdown > 0}
              className={countdown > 0 ? "text-gray-400" : "text-blue-600"}
            >
              {countdown > 0 
                ? `Renvoyer le code (${countdown}s)` 
                : "Renvoyer le code"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;