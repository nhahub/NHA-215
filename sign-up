// SignUpForm.jsx
import React, { useReducer, useRef } from "react";

/**
 * Usage:
 * - Put this component in a route, e.g., /signup
 * - Tailwind must be available in your project
 *
 * Notes:
 * - Replace '/api/signup' with your real API endpoint
 * - Server should return { ok: true } on success or { ok: false, error: "..."} on failure
 */

// --- Initial state & reducer ---
const initialState = {
  values: { name: "", email: "", password: "", confirm: "" },
  errors: {},           // field-specific error strings
  touched: {},          // track touched fields for validation display
  loading: false,
  serverError: null,
  success: false,
  showPassword: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        // clear server error when user types
        serverError: null,
      };
    case "SET_TOUCHED":
      return { ...state, touched: { ...state.touched, [action.field]: true } };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_SERVER_ERROR":
      return { ...state, serverError: action.error, loading: false };
    case "SET_SUCCESS":
      return { ...state, success: true, loading: false };
    case "TOGGLE_SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    default:
      return state;
  }
}

// --- Simple validators ---
function validate(values) {
  const errs = {};
  if (!values.name.trim()) errs.name = "Name is required.";
  if (!values.email) errs.email = "Email is required.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Enter a valid email.";

  if (!values.password) errs.password = "Password is required.";
  else if (values.password.length < 8)
    errs.password = "Password must be at least 8 characters.";
  // you can add more (symbols, uppercase, numbers)

  if (!values.confirm) errs.confirm = "Please confirm your password.";
  else if (values.password !== values.confirm) errs.confirm = "Passwords do not match.";

  return errs;
}

// returns strength score 0..3 and label
function passwordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;
  const label = ["Very weak", "Weak", "Fair", "Strong"][Math.min(score, 3)];
  return { score, label };
}

export default function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { values, errors, touched, loading, serverError, success, showPassword } = state;
  const emailRef = useRef(null);

  // validate on every change (or you can validate on blur / submit only)
  React.useEffect(() => {
    const e = validate(values);
    dispatch({ type: "SET_ERRORS", errors: e });
  }, [values]);

  const handleChange = (e) => {
    dispatch({ type: "SET_FIELD", field: e.target.name, value: e.target.value });
  };

  const handleBlur = (e) => {
    dispatch({ type: "SET_TOUCHED", field: e.target.name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // final validation
    const eObj = validate(values);
    if (Object.keys(eObj).length) {
      dispatch({ type: "SET_ERRORS", errors: eObj });
      // focus first invalid field
      const first = Object.keys(eObj)[0];
      const el = document.querySelector(`[name="${first}"]`);
      if (el) el.focus();
      return;
    }

    dispatch({ type: "SET_LOADING", loading: true });
    try {
      // Example: call API
      const resp = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: values.name, email: values.email, password: values.password }),
        credentials: "include", // if you use cookies for auth
      });

      const data = await resp.json();

      if (!resp.ok) {
        // server error message expected in data.error
        dispatch({ type: "SET_SERVER_ERROR", error: data.error || "Signup failed" });
        // optionally focus email if it's taken
        if (data.field === "email" && emailRef.current) emailRef.current.focus();
        return;
      }

      // success: redirect or show message
      dispatch({ type: "SET_SUCCESS" });
      // example: window.location = '/welcome' or show message
    } catch (err) {
      dispatch({ type: "SET_SERVER_ERROR", error: "Network error. Try again." });
    }
  };

  const { score, label } = passwordStrength(values.password);

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Account created 🎉</h2>
        <p className="text-gray-700">Check your email to verify your account. Redirecting…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-md bg-white p-8 rounded-xl shadow"
        aria-describedby={serverError ? "server-error" : undefined}
      >
        <h1 className="text-2xl font-bold mb-2">Create your account</h1>
        <p className="text-sm text-gray-500 mb-6">Join us — it only takes a minute.</p>

        {serverError && (
          <div id="server-error" role="alert" className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">
            {serverError}
          </div>
        )}

        {/* Name */}
        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Full name</span>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              touched.name && errors.name ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="Your full name"
            aria-invalid={!!(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? "error-name" : undefined}
          />
          {touched.name && errors.name && (
            <p id="error-name" className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </label>

        {/* Email */}
        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            ref={emailRef}
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              touched.email && errors.email ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="you@example.com"
            aria-invalid={!!(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? "error-email" : undefined}
          />
          {touched.email && errors.email && (
            <p id="error-email" className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </label>

        {/* Password */}
        <label className="block mb-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <span className="text-xs text-gray-500">min 8 characters</span>
          </div>

          <div className="relative mt-1">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full rounded-md border px-3 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                touched.password && errors.password ? "border-red-300" : "border-gray-200"
              }`}
              placeholder="Choose a strong password"
              aria-invalid={!!(touched.password && errors.password)}
              aria-describedby={touched.password && errors.password ? "error-password" : "pw-strength"}
            />
            <button
              type="button"
              onClick={() => dispatch({ type: "TOGGLE_SHOW_PASSWORD" })}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded text-gray-600 hover:bg-gray-100"
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* password strength */}
          <div id="pw-strength" className="mt-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0,1,2].map((i) => (
                  <span key={i} className={`h-1.5 w-8 rounded ${score > i ? "bg-indigo-500" : "bg-gray-200"}`}></span>
                ))}
              </div>
              <span className="text-gray-500">{label}</span>
            </div>
          </div>

          {touched.password && errors.password && (
            <p id="error-password" className="mt-1 text-xs text-red-600">{errors.password}</p>
          )}
        </label>

        {/* Confirm */}
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Confirm password</span>
          <input
            name="confirm"
            type={showPassword ? "text" : "password"}
            value={values.confirm}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              touched.confirm && errors.confirm ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="Repeat your password"
            aria-invalid={!!(touched.confirm && errors.confirm)}
            aria-describedby={touched.confirm && errors.confirm ? "error-confirm" : undefined}
          />
          {touched.confirm && errors.confirm && (
            <p id="error-confirm" className="mt-1 text-xs text-red-600">{errors.confirm}</p>
          )}
        </label>

        {/* Terms */}
        <div className="text-sm text-gray-600 mb-4">
          By creating an account you agree to our{" "}
          <a href="/terms" className="text-indigo-600 underline">Terms</a> and{" "}
          <a href="/privacy" className="text-indigo-600 underline">Privacy Policy</a>.
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading || Object.keys(errors).length > 0}
            className={`flex-1 inline-flex justify-center items-center gap-2 rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500
              ${loading || Object.keys(errors).length > 0 ? "bg-indigo-300 text-white cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
            aria-busy={loading}
          >
            {loading ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2"/><path d="M2 12a10 10 0 0110-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
            ) : null}
            Create account
          </button>

          <a href="/login" className="text-sm text-gray-600 hover:underline">Already registered?</a>
        </div>
      </form>
    </div>
  );
}
