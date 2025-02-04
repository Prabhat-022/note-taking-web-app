import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { login } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(null);
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        console.log('login data:', data);
        try {
            const response = await axios.post("/api/v1/user/login", data);
            localStorage.setItem("token", response.data.token);
            window.location.href = "/";
            localStorage.setItem("user", JSON.stringify(response.data.user));
            dispatch(login(response.data.user));

        } catch (error) {
            setError(error.response.data.message);
        } 
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Login</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        <label className="block" htmlFor="email">Email</label>
                        <input type="email"
                            className="w-full px-4 py-2 mt-2 border rounded-md"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-red-500">Email is required</span>}
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="password">Password</label>
                        <input type="password"
                            className="w-full px-4 py-2 mt-2 border rounded-md"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <span className="text-red-500">Password is required</span>}
                    </div>
                    <button type="submit" className="w-full px-4 py-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold">Login</button>
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default Login;
