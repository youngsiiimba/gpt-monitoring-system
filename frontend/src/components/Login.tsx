import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Building2, LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock validation - accept any email/password for POC
    if (email && password) {
      navigate("/dashboard");
    }
  };

  const handleSSOLogin = () => {
    // Mock SSO - in production this would redirect to Azure AD/Active Directory
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#1F2937]">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F4F4F4] dark:bg-[#111827] items-center justify-center p-8 lg:p-12">
        <div className="max-w-md">
          <div className="mb-8">
            <Building2 className="h-12 w-12 text-[#1F2937] dark:text-[#F9FAFB] mb-4" />
            <h1 className="text-[32px] font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
              GPT Monitoring & Reporting System
            </h1>
            <p className="text-[16px] text-[#4B5563] dark:text-[#D1D5DB]">
              Streamline quarterly performance reporting, automate document generation, and provide comprehensive dashboards for oversight and decision-making.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-[#4B5563] dark:text-[#D1D5DB] mt-0.5" />
              <div>
                <div className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                  Secure Authentication
                </div>
                <div className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
                  Integrated with Active Directory for enterprise-grade security
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md p-6 md:p-8 dark:bg-[#111827] dark:border-[#374151]">
          <div className="mb-8">
            <h2 className="text-[28px] font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
              Welcome Back
            </h2>
            <p className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
              Sign in to access the Monitoring & Reporting System
            </p>
          </div>

          {/* Active Directory SSO Button */}
          <Button
            type="button"
            onClick={handleSSOLogin}
            className="w-full bg-[#0078D4] hover:bg-[#006CBE] text-white h-12 text-[16px] font-medium mb-6"
          >
            <Shield className="h-5 w-5 mr-2" />
            Sign in with Active Directory
          </Button>

          <div className="relative mb-6">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white dark:bg-[#111827] px-4 text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
                OR
              </span>
            </div>
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">
                Email or Username
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
                className="h-12 rounded-[4px] border-[#E5E7EB] text-[16px] placeholder:text-[#9CA3AF] focus:border-[#4B5563] dark:border-[#374151] dark:bg-[#1F2937] dark:text-[#F9FAFB]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-12 rounded-[4px] border-[#E5E7EB] text-[16px] placeholder:text-[#9CA3AF] focus:border-[#4B5563] dark:border-[#374151] dark:bg-[#1F2937] dark:text-[#F9FAFB]"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#1F2937] text-white hover:bg-[#4B5563] h-12 rounded-[4px] text-[16px] font-medium"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Sign In
            </Button>
          </form>

          {/* Active Directory Integration Notice */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-[4px]">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-[12px] font-medium text-blue-900 dark:text-blue-300 mb-1">
                  Active Directory Integration
                </div>
                <div className="text-[12px] text-blue-800 dark:text-blue-400">
                  This system is integrated with Azure Active Directory (Azure AD) for single sign-on (SSO) authentication. Use your organizational credentials to sign in securely.
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

