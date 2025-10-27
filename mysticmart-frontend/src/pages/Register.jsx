import { useState } from 'react';
import './auth.css';

    export default function Register() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
    const form = e.currentTarget;
    const pass = form.querySelector('#regPassword')?.value;
    const confirm = form.querySelector('#confirmPassword')?.value;
    if (confirm !== undefined && pass !== confirm) {
        e.preventDefault();
        e.stopPropagation();
        const confirmInput = form.querySelector('#confirmPassword');
        confirmInput.setCustomValidity('Passwords do not match');
    } else if (confirm !== undefined) {
        form.querySelector('#confirmPassword').setCustomValidity('');
    }
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
          <div className="col-11 col-sm-9 col-md-7 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h1 className="h4 fw-bold mb-1">Create your account</h1>
                  <p className="text-muted mb-0">Join ShopSphere to track orders and manage your wishlist.</p>
                </div>

                <form
                  noValidate
                  className={validated ? 'needs-validation was-validated' : 'needs-validation'}
                  onSubmit={handleSubmit}
                >
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="firstName" placeholder="First name" required />
                        <label htmlFor="firstName">First name</label>
                        <div className="invalid-feedback">First name is required.</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="lastName" placeholder="Last name" required />
                        <label htmlFor="lastName">Last name</label>
                        <div className="invalid-feedback">Last name is required.</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="email" className="form-control" id="regEmail" placeholder="name@example.com" required />
                        <label htmlFor="regEmail">Email address</label>
                        <div className="invalid-feedback">Please provide a valid email.</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="input-group">
                        <span className="input-group-text">+91</span>
                        <input type="tel" className="form-control" id="phone" placeholder="Phone number" required pattern="[0-9]{10}" />
                        <div className="invalid-feedback">Enter a valid 10-digit phone number.</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="password" className="form-control" id="regPassword" placeholder="Password" required minLength={8} />
                        <label htmlFor="regPassword">Password</label>
                        <div className="form-text">Use 8+ characters with a mix of letters and numbers.</div>
                        <div className="invalid-feedback">Minimum 8 characters required.</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" required />
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <div className="invalid-feedback">Passwords must match.</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="terms" required />
                        <label className="form-check-label" htmlFor="terms">
                          I agree to the Terms and Privacy Policy
                        </label>
                        <div className="invalid-feedback">You must agree before submitting.</div>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Create account</button>

                  <div className="text-center mt-3">
                    <span className="text-muted">Already have an account?</span>
                    <a href="/login" className="ms-1 text-decoration-none">Sign in</a>
                  </div>
                </form>
              </div>
            </div>

            <p className="text-center text-muted mt-3 mb-0">
              Need help? <a href="/support" className="text-decoration-none">Contact support</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}