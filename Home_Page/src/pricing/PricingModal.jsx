function PricingModal({
    onClose,
    onSubmit,
    paymentName,
    setPaymentName,
    cardNumber,
    setCardNumber,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv,
    errorMessage,
    processing
}) {
    return (
        <div
            className="modal-overlay"
            onClick={() => {
                if (!processing) {
                    onClose();
                }
            }}
        >
            <div
                className="payment-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="payment-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="modal-close"
                    onClick={onClose}
                    disabled={processing}
                    aria-label="Close payment form"
                >
                    &times;
                </button>

                <h2 id="payment-title">Upgrade to Paid</h2>

                <p>
                    Enter demonstration payment details to upgrade
                    your DEV@Deakin account.
                </p>

                <p className="demo-warning">
                    Demo only: do not enter real payment details.
                </p>

                <form onSubmit={onSubmit}>
                    <label htmlFor="payment-name">
                        Name on card
                    </label>

                    <input
                        id="payment-name"
                        type="text"
                        autoComplete="off"
                        value={paymentName}
                        onChange={(event) =>
                            setPaymentName(event.target.value)
                        }
                        required
                    />

                    <label htmlFor="card-number">
                        Card number
                    </label>

                    <input
                        id="card-number"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        placeholder="Demo card number"
                        value={cardNumber}
                        onChange={(event) =>
                            setCardNumber(
                                event.target.value
                                    .replace(/[^\d ]/g, "")
                                    .slice(0, 23)
                            )
                        }
                        required
                    />

                    <div className="payment-row">
                        <div>
                            <label htmlFor="expiry-date">
                                Expiry (MM/YY)
                            </label>

                            <input
                                id="expiry-date"
                                type="text"
                                placeholder="MM/YY"
                                autoComplete="off"
                                maxLength={5}
                                value={expiryDate}
                                onChange={(event) =>
                                    setExpiryDate(
                                        event.target.value
                                            .replace(/[^\d/]/g, "")
                                            .slice(0, 5)
                                    )
                                }
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="cvv">CVV</label>

                            <input
                                id="cvv"
                                type="password"
                                inputMode="numeric"
                                autoComplete="off"
                                maxLength={4}
                                value={cvv}
                                onChange={(event) =>
                                    setCvv(
                                        event.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 4)
                                    )
                                }
                                required
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="pricing-error" role="alert">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="pricing-button payment-submit"
                        disabled={processing}
                    >
                        {processing
                            ? "Processing..."
                            : "Confirm Demo Upgrade"}
                    </button>

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onClose}
                        disabled={processing}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PricingModal;