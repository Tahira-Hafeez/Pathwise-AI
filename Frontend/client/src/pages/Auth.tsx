import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BrandMark from "@/components/BrandMark";

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/${isLogin ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isLogin ? { email, password } : { name, email, password }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const detail = Array.isArray(result.detail)
          ? result.detail.map((item: { msg?: string }) => item.msg).filter(Boolean).join(" ")
          : result.detail;
        throw new Error(detail ?? "Unable to complete authentication.");
      }

      if (!isLogin) {
        const loginResponse = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const loginResult = await loginResponse.json().catch(() => ({}));

        if (!loginResponse.ok) {
          throw new Error(loginResult.detail ?? "Account created, but automatic sign in failed.");
        }

        result.access_token = loginResult.access_token;
result.name = loginResult.name;
result.email = loginResult.email;
      }

      if (!result.access_token) {
        throw new Error("Authentication succeeded without a token.");
      }

      localStorage.setItem("access_token", result.access_token);
localStorage.setItem("user_name", result.name);
localStorage.setItem("user_email", result.email);

navigate("/dashboard");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to complete authentication.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--paper)] text-[var(--ink)]">
      <div className="hidden md:flex md:w-1/2 bg-[var(--ink)] p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <BrandMark />
          <div className="mt-12 max-w-md">
            <p className="eyebrow">YOUR NEXT STEP, MADE CLEAR</p>
            <h1 className="text-5xl font-bold leading-tight font-display">
              Clarity is the <br />
              <span className="text-[var(--moss)] italic font-serif">ultimate leverage.</span>
            </h1>
            <p className="mt-6 text-[var(--paper)]/75 text-lg">
              Join other career switchers and students finding their sensible next step with PathWise AI.
            </p>
          </div>
        </div>

        <div className="auth-illustration" aria-label="Abstract route illustration">
          <span className="auth-orbit auth-orbit-one" />
          <span className="auth-orbit auth-orbit-two" />
          <span className="auth-sun" />
          <span className="auth-route" />
          <span className="auth-waypoint auth-waypoint-one" />
          <span className="auth-waypoint auth-waypoint-two" />
          <span className="auth-waypoint auth-waypoint-three" />
        </div>

      </div>

      <div className="flex-1 flex flex-col p-8 md:p-16 lg:p-24 justify-center">
        <div className="max-w-md w-full mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-sm font-medium text-[var(--ink)] hover:text-[var(--ink-soft)] transition-colors mb-8 group"
            type="button"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </button>

          <div className="mb-10">
            <h2 className="text-3xl font-bold font-display">
              {isLogin ? "Welcome Back" : "Start Your Path"}
            </h2>
            <p className="text-[var(--ink)]/70 mt-2">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-[var(--ink-soft)] font-semibold underline decoration-[var(--amber)] decoration-2 underline-offset-4"
                type="button"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <label className="block space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/60 ml-1">Full Name</span>
                <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Alex Cristache" required />
              </label>
            )}
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/60 ml-1">Email Address</span>
              <span className="relative block">
                <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" className="h-12 bg-[var(--paper-deep)] pl-10" required />
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink)]/30" />
              </span>
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/60 ml-1">Password</span>
              <span className="relative block">
                <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" className="h-12 bg-[var(--paper-deep)] pl-10" required minLength={8} />
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink)]/30" />
              </span>
            </label>

            {error && <p className="text-sm text-[var(--amber)]" role="alert">{error}</p>}
            <Button className="w-full h-12 bg-[var(--ink)] hover:bg-[var(--ink-soft)] text-[var(--paper)] font-bold uppercase tracking-wider" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
              {!isSubmitting && <ArrowRight size={18} className="ml-2" />}
            </Button>
          </form>

          <p className="mt-12 text-center text-xs text-[var(--ink)]/50 leading-relaxed">
            By continuing, you agree to PathWise AI&apos;s <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
