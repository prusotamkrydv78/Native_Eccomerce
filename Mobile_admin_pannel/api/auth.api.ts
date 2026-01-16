import api from "./api";

const loginApi = async (data: any) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

const getMeApi = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export { loginApi, getMeApi };
