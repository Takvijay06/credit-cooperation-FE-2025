export const decodeJwt = (token: string) => {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};
