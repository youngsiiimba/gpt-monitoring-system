import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-[#1F2937]">
      <Card className="w-full max-w-md p-8 dark:bg-[#111827] dark:border-[#374151]">
        <h1 className="mb-8 text-[28px] font-bold text-[#1F2937] dark:text-[#F9FAFB]">
          Monitoring & Reporting System
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}

