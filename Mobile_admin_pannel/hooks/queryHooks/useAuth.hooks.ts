import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/authStore";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const user = {
        id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
      };
      const tokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      setAuth(user, tokens);
    },
  });
};
