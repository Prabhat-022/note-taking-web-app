import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    console.log('register data:', data);
    try {
      const response = await axios.post(
        "/api/v1/user/register",
        data
      );
      console.log(response.data);
      window.location.href = "/login";
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">
          Join us
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md"
                {...register("fullName", { required: true })}
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="userName">
                User Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md"
                {...register("userName", { required: true })}
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-md"
                {...register("email", { required: true })}
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md"
                {...register("password", { required: true })}
              />
            </div>
            <div className="mt-4 text-red-500">
              {error && <p>{error}</p>}
            </div>
            <div className="mt-6">
              <button className="px-6 py-2 mb-1 text-white bg-blue-500 rounded">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
