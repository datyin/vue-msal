import { useMSAL } from "@datyin/msal-vue";

export function login() {
  const msal = useMSAL();

  if (msal) {
    msal.loginRedirect({
      scopes: [
        "user.read",
      ],
    });
  }
}

export function logout() {
  const msal = useMSAL();

  if (msal) {
    msal.logoutRedirect();
  }
}
