import { User, ResetPassWord } from "@/interface";
import httpRequest from "../axios";

const api = httpRequest.server;

function getUser() {
  return api.get<User>("/api/users/details");
}
const resetPassword = ({ password, email, tempJwt }: ResetPassWord) => {
  return api.patch("api/users/reset-password", { password, email, tempJwt });
};
const changePassword = (password: string) => {
  return api.patch("api/users/password", { password });
};
function postUser(data: FormData) {
  return api.postMultipart("/api/users", data);
}
function patchUser(data: FormData) {
  return api.patchFormData("/api/users", data);
}

const userApi = {
  get: getUser,
  post: postUser,
  patch: patchUser,
  patchPassword: changePassword,
  resetPassword,
};
export default userApi;
