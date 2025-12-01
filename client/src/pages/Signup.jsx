import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[A-Za-z ]+$/, "First name cannot contain numbers")
    .required("First name is required"),

  email: yup
  .string()
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
    "Enter a valid email"
  )
  .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .required("Password is required")
});


const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
  try {

    const userData = {
      ...formData,
      login_type: "N",
    };


    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      userData,
    });

    console.log("Success:", res.data);

    window.alert(res.data.message);

    reset();
    navigate("/login");

  } catch (err) {
    console.error(err);
    window.alert(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-80 border border-black p-6 rounded-lg">

        <h2 className="text-xl font-semibold text-center">Signup Form</h2>

        {/* First Name */}
        <div>
            <label htmlFor="username">Username</label>
            <input
            {...register("username")}
            type="text"
            id="username"
            className="border p-1 w-full"
            />
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
        </div>

        {/* Email */}
        <div>
            <label htmlFor="email">Email</label>
            <input
            {...register("email")}
            type="email"
            id="email"
            className="border p-1 w-full"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div>
            <label htmlFor="password">Password</label>
            <input
            {...register("password")}
            type="password"
            id="password"
            className="border p-1 w-full"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button type="submit" className="bg-blue-500 text-white py-1 rounded">
            Signup
        </button>

        <p className="text-center">
            Already have an account?{" "}
            <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
            >
            Login
            </span>
        </p>
        </form>
    </div>
  );
};

export default Signup;
