import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";
import InputField from "../common/inputField";
import Button from "../common/button";
import RegisterForm from "./RegisterForm";

const LoginForm = () => {
    const {login} = useContext(AuthContext);
    const [form, setForm] = useState({username:'', password:''});
    const [error, setError] = useState('');
    const [showRegister,setShowRegister] = useState(false);
    const [showLogin,setShowLogin] = useState(true);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await loginUser(form);
            login(response.data.token);
        } catch (err) {
            setError(err.response?.data?.message || 'Login Failed');
        }
    };

    const handleRegisterSubmit = (e) => {
        setShowRegister(true);
        setShowLogin(false);
    };

    return (
       <>
            {showLogin && (
                <>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    <InputField label="username" type="text" name="username" value={form.username} onChange={handleChange} />
                    <InputField label="password" type="password" name="password" value={form.password} onChange={handleChange} />
                    <Button type="submit">Log In</Button>
                </form>

                <div style={{ marginTop: '1rem' }}>
                    <Button type="button" onClick={handleRegisterSubmit}>Register</Button>
                </div>
                </>
            )}
            {showRegister && <RegisterForm />}
        </>
    );
}

export default LoginForm;