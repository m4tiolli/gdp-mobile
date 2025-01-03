import { JwtPayload } from "jwt-decode";

export interface UserData {
  id: number;
  nome: string;
  departamento: string;
  telefone1: string;
  telefone2: string;
  email: string;
  senha: string;
  administrador: number;
  assinatura: string;
  ativo: number;
}

export interface JWTPayload extends JwtPayload {
  id: number;
  nome: string;
}