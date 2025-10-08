import { EXTERNAL_TUNNEL_URL } from "react-native-dotenv";
import { httpRequest } from "../core/http";
import { log } from "../core/logging";

const API_URL = `${EXTERNAL_TUNNEL_URL}/dev/player/auth/google`;

export function googleSignInAPI(idToken: string) {
  log(`[PLAYER.api] Signing in with Google token`);
  return httpRequest({
    url: API_URL,
    method: "post",
    data: { idToken },
  });
}
