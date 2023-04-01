import { useEffect, useState } from "react"
import { AppContext, IAppContext } from "../contexts/AppContext"

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [percentage, setPercentage] = useState<number | null>(null)

  return (
    <AppContext.Provider value={{ email, isSending, percentage, setEmail, setIsSending, setPercentage }}>
      {children}
    </AppContext.Provider>
  )
}