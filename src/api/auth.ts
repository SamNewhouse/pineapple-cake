import { httpRequest } from "../core/http";
import { EXPO_PUBLIC_TUNNEL_URL } from "../core/variables";

export function signupAPI(email: string, password: string) {
  return httpRequest({
    url: `${EXPO_PUBLIC_TUNNEL_URL}/dev/auth/signup`,
    method: "post",
    data: { email, password },
  });
}

export function loginAPI(email: string, password: string) {
  return httpRequest({
    url: `${EXPO_PUBLIC_TUNNEL_URL}/dev/auth/login`,
    method: "post",
    data: { email, password },
  });
}
