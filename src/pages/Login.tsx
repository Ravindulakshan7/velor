import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../authStore';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - if email contains admin, make them an admin
    const role = email.includes('admin') ? 'admin' : 'customer';
    login({ email, name: email.split('@')[0], role });
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-[var(--color-velor-bg)]">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 h-[30vh] lg:h-auto relative hidden sm:block">
        <img 
          referrerPolicy="no-referrer"
          src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative bg-[var(--color-velor-bg)] lg:bg-white pt-24 lg:pt-12">
        
        <Link to="/" className="absolute top-6 left-6 md:top-8 md:left-8 text-[var(--color-velor-text)] hover:opacity-70 transition-opacity flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
          <ArrowLeft size={16} strokeWidth={1.5} /> Back
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-8 md:p-0 rounded-[24px] lg:rounded-none shadow-xl lg:shadow-none border border-[var(--color-velor-border)] lg:border-none"
        >
          <div className="text-center mb-10 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-serif italic tracking-tight mb-3">Welcome Back</h1>
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--color-velor-text-light)]">
              Sign in to your exclusive account
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6 md:space-y-8">
            <div className="relative group">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-[var(--color-velor-border)] py-3 text-[14px] md:text-base focus:outline-none focus:border-[var(--color-velor-text)] transition-colors bg-transparent peer placeholder-transparent rounded-none"
                placeholder="Email address"
                id="email"
              />
              <label htmlFor="email" className="absolute left-0 -top-3.5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-velor-text-light)] transition-all peer-placeholder-shown:text-[13px] peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[9px] peer-focus:md:text-[10px] cursor-text">Email Address</label>
            </div>
            
            <div className="relative group">
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-[var(--color-velor-border)] py-3 text-[14px] md:text-base focus:outline-none focus:border-[var(--color-velor-text)] transition-colors bg-transparent peer placeholder-transparent rounded-none"
                placeholder="Password"
                id="password"
              />
              <label htmlFor="password" className="absolute left-0 -top-3.5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-velor-text-light)] transition-all peer-placeholder-shown:text-[13px] peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[9px] peer-focus:md:text-[10px] cursor-text">Password</label>
            </div>
            
            <button type="submit" className="w-full py-4 md:py-5 bg-[var(--color-velor-text)] text-white text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold hover:bg-[#C4A484] transition-all duration-300 mt-8 rounded-full flex items-center justify-center gap-3 group shadow-xl shadow-black/10 hover:shadow-[#C4A484]/20">
              Sign In
            </button>
          </form>
          
          <div className="mt-10 md:mt-12 text-center flex flex-col items-center gap-4">
            <a href="#" className="text-[9px] md:text-[10px] uppercase tracking-widest text-[var(--color-velor-text-light)] hover:text-[#C4A484] transition-colors border-b border-transparent hover:border-[#C4A484] pb-1">
              Forgot Password?
            </a>
            <div className="w-8 h-[1px] bg-[var(--color-velor-border)] my-1"></div>
            <div className="text-[9px] md:text-[10px] text-[var(--color-velor-text-light)] flex flex-col md:flex-row items-center gap-2 md:gap-0">
              <span>Don't have an account?</span>
              <Link to="/register" className="text-[var(--color-velor-text)] uppercase tracking-widest md:ml-2 border-b border-[var(--color-velor-text)] pb-1 font-bold hover:text-[#C4A484] hover:border-[#C4A484] transition-colors">Register</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
