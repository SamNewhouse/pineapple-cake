import { EXTERNAL_TUNNEL_URL } from "react-native-dotenv";
import { httpRequest } from "../core/http";

export function signupAPI(email: string, password: string) {
  return httpRequest({
    url: `${EXTERNAL_TUNNEL_URL}/dev/auth/signup`,
    method: "post",
    data: { email, password },
  });
}

export function loginAPI(email: string, password: string) {
  return httpRequest({
    url: `${EXTERNAL_TUNNEL_URL}/dev/auth/login`,
    method: "post",
    data: { email, password },
  });
}
