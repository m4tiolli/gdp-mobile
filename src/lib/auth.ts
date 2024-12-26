import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp?: number; // A propriedade 'exp' é opcional
}

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Converte para segundos

    if (decoded.exp) {
      return decoded.exp > currentTime; // Retorna true se não expirou
    }

    return false; // Retorna false se não houver 'exp'
  } catch (error) {
    return false; // Retorna false se o token for inválido
  }
};
