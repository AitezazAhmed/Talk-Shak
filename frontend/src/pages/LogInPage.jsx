import {React,useState} from 'react'
import toast from "react-hot-toast";
import { useAuthStore } from "../store/UseAuthStore"
import loginImage from '../assets/login.jpg';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import {Link} from 'react-router-dom'

const LogInPage = () => {
  const { login, isLoggingIn} = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const validateForm = () => {
      if (!formData.email.trim()) return toast.error("Email is required");
      if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
      if (!formData.password) return toast.error("Password is required");
      if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
      return true;
    
    };
    const handleSubmit = (e) => {
      e.preventDefault();
    const success = validateForm();

    if (success === true) login(formData);
    }
  return (
      <div>
         <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
     <div className="bg-white shadow-xl rounded-3xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
       
      
       <div className="hidden md:block">
         <img src={loginImage}></img>
       </div>
   
       <div className="p-10 flex flex-col justify-center">
         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Log In</h2>
         
          <form className="space-y-5" onSubmit={handleSubmit}>
        
           <div>
             <label className="block text-black mb-1">Email Address</label>
             <input type="email" placeholder="you@example.com" className="w-full px-4 text-black py-2 rounded-lg border placeholder-black border-black focus:outline-none focus:ring-2 focus:ring-purple-400"  value={formData.email}
                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}  />
           </div>
           <div  className="relative">
             <label className="block text-black mb-1">Password</label>
             <input  type={showPassword ? "text":"password"} placeholder="••••••••" className="w-full px-4 text-black py-2 rounded-lg border placeholder-black border-black focus:outline-none focus:ring-2 focus:ring-purple-400" value={formData.password}
                     onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
             <button
           type="button"
           className="absolute top-1/2 right-3 -translate-y-1/100 text-gray-500 hover:text-purple-600"
           onClick={ () => setShowPassword(!showPassword)}
         >
           {showPassword ? <Eye className="w-5 h-5" /> :   <EyeOff className="w-5 h-5"/> }
         </button> </div>
         <button type="submit" className="w-full py-3 flex justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-300" disabled={isLoggingIn}>
                 {isLoggingIn ? (
                   <>
                     <Loader2 className=" flex justify-center  size-10  animate-spin" />
                     Loading...
                   </>
                 ) : (
                   "Login"
                 )}
               </button>  
           <p className="text-center text-gray-500 text-sm mt-4">
             Create an account?<Link className="text-purple-600 hover:underline" to="/signup">Sign Up</Link>
           </p>
         </form> 
       </div>
     </div>
   </section>
   </div>
  )
}

export default LogInPage
