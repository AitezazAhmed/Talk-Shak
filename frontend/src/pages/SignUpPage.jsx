import {React,useState} from 'react'
import toast from "react-hot-toast";
import { useAuthStore } from "../store/UseAuthStore"
import signupImage from '../assets/singup.jpg';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import {Link} from 'react-router-dom'
const SignUpPage = () => {
  const { signup, isSigningUp } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ fullname: "", email: "", password: "" });
    const validateForm = () => {
      if (!formData.fullname.trim()) return toast.error("Full name is required");
      if (!formData.email.trim()) return toast.error("Email is required");
      if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
      if (!formData.password) return toast.error("Password is required");
      if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
      return true;
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      
    const success = validateForm();

    if (success === true) signup(formData);
  };
  return (
    <div>
      <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
  <div class="bg-white shadow-xl rounded-3xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
    
   
    <div class="hidden md:block">
      <img src={signupImage}></img>
    </div>

    <div class="p-10 flex flex-col justify-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Create an Account</h2>
      
       <form class="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label class="block text-black mb-1">Full Name</label>
          <input value={formData.fullname} onChange={(e)=setFormData({...formData, fullname:e.target.value})} type="text"  placeholder="Full Name" class="w-full px-4 py-2 text-black rounded-lg border placeholder-black border-black focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        <div>
          <label class="block text-black mb-1">Email Address</label>
          <input value={formData.email} onChange={(e)=setFormData({...formData, email:e.target.value})} type="email" placeholder="you@example.com" class="w-full px-4 text-black py-2 rounded-lg border placeholder-black border-black focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        <div  className="relative">
          <label class="block text-black mb-1">Password</label>
          <input value={formData.password} onChange={(e)=setFormData({...formData, password:e.target.value})} type={showPassword ? "text":"password"} placeholder="••••••••" class="w-full px-4 text-black py-2 rounded-lg border placeholder-black border-black focus:outline-none focus:ring-2 focus:ring-purple-400" />
          <button
        type="button"
        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-purple-600"
        onClick={ () => setShowPassword(!showPassword)}
      >
        {showPassword ? <Eye className="w-5 h-5" /> :   <EyeOff className="w-5 h-5"/> }
      </button> </div>
      <button type="submit" class="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-300" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>  
        <p class="text-center text-gray-500 text-sm mt-4">
          Already have an account?<Link class="text-purple-600 hover:underline" to="/login">Log In</Link>
        </p>
      </form> 
    </div>
  </div>
</section>
</div>
  )
}

export default SignUpPage
