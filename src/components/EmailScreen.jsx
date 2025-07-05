"use client"

import { useState } from "react"
import "../styles/EmailScreen.css"

/**
 * EmailScreen Component - Handles email input with validation
 * Validates email format and shows error states
 */
const EmailScreen = ({ onEmailSubmit, translations }) => {
  // Local state for email input and validation
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

  /**
   * Handle form submission with validation
   */
  const handleSubmit = () => {
    // Check if email is empty
    if (!email.trim()) {
      setError("Email is required")
      return
    }

    // Check if email format is valid
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    // Email is valid - clear error and submit
    setError("")
    onEmailSubmit(email)
  }

  /**
   * Handle input changes and clear errors
   */
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
          disabled={!email.trim() || !!error} // Disable if empty or has error
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default EmailScreen
