import { Link } from "react-router-dom";
import { pricingPlans } from "./pricingData";

function PricingCards({ plan, currentUser, onUpgrade, checkingPlan }) {
    return (
        <section className="pricing-cards">
            {pricingPlans.map((item) => {
                const isPaid = item.name === "Paid";
                const isCurrentPlan = plan === item.name;

                return (
                    <div
                        className={`pricing-card ${isPaid ? "paid-card" : ""}`}
                        key={item.name}
                    >
                        {isPaid && (
                            <div className="popular-label">
                                MORE FEATURES
                            </div>
                        )}

                        <h2>{item.name}</h2>

                        <p className="plan-description">
                            {item.description}
                        </p>

                        <p className="plan-price">
                            {item.price} <span>{item.period}</span>
                        </p>

                        <ul>
                            {item.features.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>

                        {isCurrentPlan && currentUser ? (
                            <button
                                className="current-plan-button"
                                disabled
                            >
                                Your Current Plan
                            </button>
                        ) : isPaid ? (
                            <button
                                className="pricing-button"
                                onClick={onUpgrade}
                                disabled={checkingPlan}
                            >
                                {checkingPlan ? "Checking Plan..." : "Upgrade Plan"}
                            </button>
                        ) : (
                            <Link
                                to="/signup"
                                className="pricing-button"
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                );
            })}
        </section>
    );
}

export default PricingCards;