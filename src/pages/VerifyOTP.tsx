
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  
  const email = location.state?.email || "votre email";

  useEffect(() => {
    // Démarrer le compte à rebours
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
    try {
      // Vérification de base avant envoi
      if (otp.length !== 6) {
        toast.error("Veuillez entrer un code à 6 chiffres");
        return;
      }

      // Récupération des informations de l'utilisateur
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

      // Vérification de l'OTP
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

      // Envoi du user_id au endpoint OTP après vérification réussie
      const sendUserIdResponse = await fetch('http://localhost:3000/api/apiKeys/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.id  // On suppose que l'API retourne un champ user_id
        }),
      });

      if (!sendUserIdResponse.ok) {
        throw new Error('Erreur lors de l\'envoi du user_id');
      }

      // Si tout est OK
      toast.success("Vérification réussie!");
      localStorage.setItem("userEmail", email);
      navigate("/dashboard");

    } catch (error) {
      console.error('Erreur détaillée:', error);
      toast.error(error.message || "Une erreur est survenue lors de la vérification");
    }
  };

  const handleResendCode = () => {
    if (countdown === 0) {
      setIsResending(true);
      
      // Simuler l'envoi d'un nouveau code
      setTimeout(() => {
        toast.success("Un nouveau code a été envoyé à votre email");
        setCountdown(60);
        setIsResending(false);
      }, 1500);
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
          <div className="w-full flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleVerify}
            disabled={otp.length !== 6}
          >
            Vérifier
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
