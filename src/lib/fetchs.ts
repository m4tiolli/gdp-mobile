import { AlLProposals, NextProposals } from "@/interfaces/proposals"
import axios from "axios"
import { isTokenValid } from "@/lib/auth"
import { router } from "expo-router"
import { FatoresFinanceiros } from "@/interfaces/ef"
import { FieldValues, UseFormGetValues, UseFormSetValue } from "react-hook-form"
import { SelectDataType } from "@/mocks/infos.ef"
import { JWTPayload, UserData } from "@/interfaces/user"
import { jwtDecode } from "jwt-decode"

export const get = async (url: string, token: string, setState?: React.Dispatch<React.SetStateAction<any>>) => {
  try {
    if (isTokenValid(token)) {
      const response = await axios.get(url, { headers: { Authorization: "Bearer " + token } })
      if (setState) { setState(response.data) }
      else return response.data
    } else {
      if (window) {
        router.push("/login")
      }
    }
  } catch (error) {
    console.error(error)
    throw new Error
  }
}

export const fetchDataEmpresa = async (getValues: UseFormGetValues<FieldValues>, setValue: UseFormSetValue<FieldValues>) => {
  const cnpj = getValues("cnpjEmpresa").replace(/[^\d]/g, "") ?? "";

  try {
    const response = await axios.get(`https://open.cnpja.com/office/${cnpj}`, {
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_BEARER_CNPJ ?? ""}`,
      },
    });

    const { alias, company } = response.data;
    const { name } = company;

    setValue("nomeEmpresa", alias || "");
    setValue("razaoEmpresa", name || "");
  } catch (error) {
    console.error("Erro ao buscar dados do CNPJ:", error);
  }
};

export const fetchAllProposals = async (token: string, setProposals: React.Dispatch<React.SetStateAction<AlLProposals[]>>) => {
  return get("https://gdp.elosolutions.com.br/api/proposals/all-proposals", token, setProposals)
}

export const fetchFatoresFinanceiros = async (token: string, setFatoresFinanceiros?: React.Dispatch<React.SetStateAction<FatoresFinanceiros[]>>) => {
  if (setFatoresFinanceiros) await get("https://gdp.elosolutions.com.br/api/misc/ef/fatores-financeiros", token, setFatoresFinanceiros);
  else {
    const data: FatoresFinanceiros[] = await get("https://gdp.elosolutions.com.br/api/misc/ef/fatores-financeiros", token)
    const formattedData = data.map((row) => ({
      label: row.label,
      id: parseInt(row.value),
    }));
    return formattedData
  }
}

export const fetchNextProposals = async (token: string, setNextProposals: React.Dispatch<React.SetStateAction<NextProposals | undefined>>) => {
  return get("https://gdp.elosolutions.com.br/api/proposals/next-proposal/ef", token, setNextProposals)
}

export const fetchAllDepartamentos = async (token: string, setDepartamentos: React.Dispatch<React.SetStateAction<SelectDataType[] | undefined>>) => {
  const data = await get("https://gdp.elosolutions.com.br/api/departamentos", token)
  setDepartamentos(data.map((row: { label: string, value: string }) => ({ label: row.label, id: row.value })))
}

export const fetchUserData = async (token: string, setUserData: React.Dispatch<React.SetStateAction<UserData | undefined>>) => {
  const id = jwtDecode<JWTPayload>(token).id
  return get("https://gdp.elosolutions.com.br/api/profile?id=" + id, token, setUserData)
}