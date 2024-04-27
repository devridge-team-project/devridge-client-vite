import { useMutation } from "@tanstack/react-query";
import { SignIn } from "@/components";
import { signApi } from "@/connection";
import { useNavigate } from "react-router-dom";
import { useSignStore, useSignUpStore } from "@/shared";

export default function SignInPage() {
  const navigate = useNavigate();
  const { signIn } = useSignStore();
  const { isSuccess, mutate } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: signApi.in,
  });
  if (isSuccess) {
    alert("로그인 성공");
    signIn();
    navigate("/");
  }

  return <SignIn signIn={mutate} />;
}
