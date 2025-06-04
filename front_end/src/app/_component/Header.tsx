import { cookies } from "next/headers"
import HeaderContent from "./HeaderContent"

const Header = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  return <HeaderContent accessToken={accessToken} />
}

export default Header
