import { useState } from 'react';
import './auth.css'; // custom overrides

export default function Login() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-8 col-md-6 col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h1 className="h4 fw-bold mb-1">ShopSphere</h1>
                  <p className="text-muted mb-0">Welcome back. Please sign in.</p>
                </div>

                <form
                  noValidate
                  className={validated ? 'needs-validation was-validated' : 'needs-validation'}
                  onSubmit={handleSubmit}
                >
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="loginUsername"
                      placeholder="username"
                      required
                    />
                    <label htmlFor="loginUsername">Username</label>
                    <div className="invalid-feedback">Please enter a valid username.</div>
                  </div>

                  <div className="form-floating mb-3 position-relative">
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      placeholder="Password"
                      required
                      minLength={6}
                    />
                    <label htmlFor="loginPassword">Password</label>
                    <div className="invalid-feedback">Password must be at least 6 characters.</div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <a href="/forgot" className="text-decoration-none">Forgot password?</a>
                  </div>

                  <button className="btn btn-primary w-100 py-2" type="submit">Login</button>

                  <div className="text-center mt-3">
                    <span className="text-muted">New here?</span>
                    <a href="/register" className="ms-1 text-decoration-none">Create an account</a>
                  </div>

                  <div className="text-center mt-4">
                    <small className="text-muted">Or continue with</small>
                  </div>

                  <div className="d-flex gap-2 mt-2">
                    <button type="button" className="btn btn-outline-secondary w-100">Google</button>
                    <button type="button" className="btn btn-outline-secondary w-100">GitHub</button>
                  </div>
                </form>
              </div>
            </div>

            <p className="text-center text-muted mt-3 mb-0">
              By continuing, you agree to our <a href="/terms" className="text-decoration-none">Terms</a> &amp; <a href="/privacy" className="text-decoration-none">Privacy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}