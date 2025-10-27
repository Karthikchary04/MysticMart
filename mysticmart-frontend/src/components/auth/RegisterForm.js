import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { registerUser } from "../../services/authService";
import InputField from "../common/inputField";
import Button from "../common/button";

const RegisterForm = () => {
    const [form,setForm] = useState({firstName:'', lastName:'',username:'',email:'',password:''});
    const {register} = useContext(AuthContext);
    const {error,setError} = useState('');

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = registerUser(form);
            register(response)
        } catch(err) {
            setError(err.response?.data?.message || 'Registration Failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <InputField name="firstName" label="firstName" type="text" onChange={handleChange} value={form.firstName}/>
            <InputField name="lastName" label="lastName" type="text" onChange={handleChange} value={form.lastName}/>
            <InputField name="email" label="email" type="text" onChange={handleChange} value={form.email}/>
            <InputField name="username" label="username" type="text" onChange={handleChange} value={form.username}/>
            <InputField name="password" label="password" type="text" onChange={handleChange} value={form.password}/>
            <Button type='submit'>Register</Button>
        </form>
    )
};

export default RegisterForm;