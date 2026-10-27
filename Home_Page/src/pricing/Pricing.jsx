import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

import PricingCards from "./PricingCards";
import PricingModal from "./PricingModal";
import "./Pricing.css";

const API_URL = "http://localhost:3000";

function Pricing() {
  const { currentUser, loading } = useAuth();

  const [plan, setPlan] = useState("Free");
  const [checkingPlan, setCheckingPlan] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [paymentName, setPaymentName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Load the current user's plan through Express.
  useEffect(() => {
    let cancelled = false;

    async function loadPlan() {
      if (loading) return;

      setCheckingPlan(true);
      setErrorMessage("");

      if (!currentUser) {
        setPlan("Free");
        setCheckingPlan(false);
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setPlan("Free");
        setErrorMessage("Please log in again to check your subscription.");
        setCheckingPlan(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load your plan.");
        }

        if (!cancelled) {
          setPlan(data.user.plan || "Free");
        }
      } catch (error) {
        console.error("Error loading plan:", error);

        if (!cancelled) {
          setErrorMessage(error.message || "Unable to load your plan.");
        }
      } finally {
        if (!cancelled) {
          setCheckingPlan(false);
        }
      }
    }

    loadPlan();

    return () => {
      cancelled = true;
    };
  }, [currentUser, loading]);

  function handleUpgradeClick() {
    setMessage("");
    setErrorMessage("");

    if (!currentUser) {
      setMessage("Please log in before upgrading your plan.");
      return;
    }

    if (checkingPlan) {
      setMessage("Please wait while we check your subscription.");
      return;
    }

    if (errorMessage) {
      setMessage("Your plan could not be checked. Please try again.");
      return;
    }

    if (plan === "Paid") {
      setMessage("You are already on the Paid plan.");
      return;
    }

    setShowModal(true);
  }

  async function handlePayment(event) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (!currentUser) {
      setShowModal(false);
      setMessage("Please log in before upgrading.");
      return;
    }

    const cleanCardNumber = cardNumber.replace(/\s/g, "");

    if (paymentName.trim().length < 2) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!/^\d{13,19}$/.test(cleanCardNumber)) {
      setErrorMessage("Please enter a valid demonstration card number.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      setErrorMessage("Enter the expiry date as MM/YY.");
      return;
    }

    const [month, year] = expiryDate.split("/").map(Number);
    const now = new Date();
    const expiryYear = 2000 + year;

    if (
      expiryYear < now.getFullYear() ||
      (expiryYear === now.getFullYear() &&
        month < now.getMonth() + 1)
    ) {
      setErrorMessage("The expiry date has passed.");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      setErrorMessage("Enter a valid 3 or 4 digit CVV.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("Your session has expired. Please log in again.");
      return;
    }

    setProcessing(true);

    try {
      const response = await fetch(`${API_URL}/upgrade`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upgrade failed.");
      }

      setPlan(data.plan || "Paid");
      setShowModal(false);
      setMessage(
        "Your demonstration upgrade was successful! You are now on the Paid plan."
      );

      setPaymentName("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
    } catch (error) {
      console.error("Upgrade error:", error);
      setErrorMessage(error.message || "The upgrade could not be saved.");
    } finally {
      setProcessing(false);
    }
  }

  function closeModal() {
    if (!processing) {
      setShowModal(false);
      setErrorMessage("");
    }
  }

  return (
    <div className="pricing-page">
      <section className="pricing-heading">
        <p className="pricing-label">DEV@DEAKIN MEMBERSHIP</p>

        <h1>Choose Your Plan</h1>

        <p>
          Find the right plan for your learning and development journey.
        </p>

        {currentUser && (
          <div className="current-plan">
            Your current plan:{" "}
            <strong>{checkingPlan ? "Checking..." : plan}</strong>
          </div>
        )}
      </section>

      <PricingCards
        plan={plan}
        currentUser={currentUser}
        onUpgrade={handleUpgradeClick}
        checkingPlan={checkingPlan}
      />

      {message && (
        <p className="pricing-message" role="status">
          {message}
        </p>
      )}

      {errorMessage && !showModal && (
        <p className="pricing-error" role="alert">
          {errorMessage}
        </p>
      )}

      {!currentUser && (
        <p className="login-reminder">
          Already have an account? <Link to="/login">Log in</Link> to upgrade
          your plan.
        </p>
      )}

      <p className="pricing-note">
        Subscription features and prices are for demonstration purposes only.
        No real payment is taken. Do not enter real card details.
      </p>

      {showModal && (
        <PricingModal
          onClose={closeModal}
          onSubmit={handlePayment}
          paymentName={paymentName}
          setPaymentName={setPaymentName}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          expiryDate={expiryDate}
          setExpiryDate={setExpiryDate}
          cvv={cvv}
          setCvv={setCvv}
          errorMessage={errorMessage}
          processing={processing}
        />
      )}
    </div>
  );
}

export default Pricing;