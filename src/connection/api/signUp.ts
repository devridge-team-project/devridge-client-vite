import httpRequest from "../axios";
const api = httpRequest.server;

interface SocialLoginRequest {
  provider: string;
  code: string;
}
interface SocialLoginResponse {
  tempJwt: string;
  accessToken: string;
}

function createToken(provider: string, code: string) {
  return api.post<SocialLoginRequest, Partial<SocialLoginResponse>>(
    "/api/social-login",
    {
      provider,
      code,
    }
  );
}

function signUpAuth(data: any) {
  return api.post("/social-login/signUp", data);
}

const signUp = {
  auth: {
    token: {
      post: createToken,
    },
    post: signUpAuth,
  },
};

export default signUp;
