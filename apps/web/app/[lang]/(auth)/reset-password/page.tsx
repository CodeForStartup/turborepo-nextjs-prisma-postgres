import React from "react"

const ResetPasswordPage: React.FC = () => {
  return (
    <div>
      <h1>Forgot Password</h1>
      <form>
        <label>
          Email:
          <input type="email" />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  )
}

export default ResetPasswordPage
