import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import supabase from "../client";

export default function Login(){
  const [alert, showAlert] = useState({
    message: "",
    show: false
  });

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const loginUser = async (values) => {
    const { error } = await supabase.auth.signInWithPassword(values);

    if(error){
      showAlert({
        show: true,
        message: error.message
      }); 
    } else {
      navigate("/todos");
    }
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {alert.show && 
          <div className="alert alert-error">
            <div className="inline-flex justify-stretch items-center">
              {alert.message}
              <button onClick={() => showAlert(false)} className="btn btn-ghost btn-circle">
                X
              </button>
            </div> 
          </div>
        }
        <form className="space-y-4" onSubmit={handleSubmit(loginUser)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" className="input input-bordered w-full" { ...register("email") } />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" type="password" className="input input-bordered w-full" { ...register("password") } />
          </div>
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        <p className="mt-4 text-center text-sm">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
      </div>
    </div>
  )
}