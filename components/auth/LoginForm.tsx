"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/(public)/auth/actions";
import { useAuthStore } from "@/lib/stores/authStore";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    global?: string;
  }>({});
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!email || !password) {
      setErrors({
        email: !email ? "이메일을 입력해주세요." : "",
        password: !password ? "비밀번호를 입력해주세요." : "",
      });
      return;
    }

    try {
      setLoading(true);
      const result = await loginAction({ email, password });

      if (result.success && result.user) {
        setUser(result.user);
        toast.success(result.message);
        router.push("/");
      } else {
        setErrors({ global: result.error });
        toast.error(result.error);
      }
    } catch (error) {
      const errorMessage = "로그인 중 오류가 발생했습니다.";
      setErrors({ global: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="max-w-sm mx-auto p-6 border rounded-xl shadow-sm space-y-4"
      onSubmit={onSubmit}
    >
      <h2 className="text-xl font-semibold mb-2">로그인</h2>

      {/* 이메일 */}
      <div className="space-y-1">
        <Input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* 비밀번호 */}
      <div className="space-y-1">
        <Input
          type="password"
          placeholder="6자 이상의 비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      {errors.global && <p className="text-red-500 text-sm">{errors.global}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}
