import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/authStore"
import api from "@/lib/api/axios"
import { toast } from "sonner"

export const useAuthCallback = () => {
  const router = useRouter()
  const { setAuth } = useAuthStore()

  useEffect(() => {
    const completeLogin = async () => {
      try {
        const res = await api.post("/auth/refresh")
        setAuth(res.data.user, res.data.accessToken)
        toast.success("Welcome!")
        router.push("/")
      } catch (err) {
        toast.error("Authentication failed")
        router.push("/login")
      }
    }

    completeLogin()
  }, [])
}