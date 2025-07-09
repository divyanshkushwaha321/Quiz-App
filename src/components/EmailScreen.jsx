import { useState } from "react"
import "../styles/EmailScreen.css"

const EmailScreen = ({ onEmailSubmit, translations }) => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  /**
   * Validate email format using regex
   * @param {string} email - Email address to validate
   * @returns {boolean} - True if email is valid format
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = () => {
    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    onEmailSubmit(email)
  }

  const handleInputChange = (e) => {
    setEmail(e.target.value)
    // Clear error when user starts typing
    if (error) setError("")
  }

  return (
    <div className="email-screen">
      <div className="email-content">
        {/* Screen title */}
        <h1 className="email-title">Email</h1>
        <p className="email-subtitle">Enter your email to get full access</p>

        <div className="email-form">
          {/* Email input with error state styling */}
          <div className="input-container">
            <input
              type="email"
              className={`email-input ${error ? "error" : ""}`} // Add error class for styling
              placeholder="Your email"
              value={email}
              onChange={handleInputChange}
            />
            {/* Show error message if validation fails */}
            {error && <div className="error-message">{error}</div>}
          </div>

          {/* Privacy policy and terms notice */}
          <div className="privacy-notice">
            <p>
              By continuing I agree with{" "}
              <a href="#" className="privacy-link">
                Privacy policy
              </a>{" "}
              and{" "}
              <a href="#" className="privacy-link">
                Terms of use
              </a>
              .
            </p>
          </div>
        </div>

        {/* Submit button - disabled when email is invalid */}
        <button
          className={`next-button ${!email.trim() || error ? "disabled" : ""}`}
          onClick={handleSubmit}
          disabled={!email.trim() || !!error}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default EmailScreen
