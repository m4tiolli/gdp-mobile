import { AlLProposals } from "@/interfaces/proposals"
import axios from "axios"
import { isTokenValid } from "@/lib/auth"
import { router } from "expo-router"

export const get = async (url: string, token: string) => {
  return axios.get(url, { headers: { Authorization: "Bearer " + token } })
}

export const fetchAllProposals = async (token: string, setProposals: React.Dispatch<React.SetStateAction<AlLProposals[]>>) => {
  try {
    if (isTokenValid(token)) {
      const response = await get("https://gdp.elosolutions.com.br/api/proposals/all-proposals", token)
      setProposals(response.data)
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