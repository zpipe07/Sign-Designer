import { createClient } from "@/src/utils/supabase/server"
import { HeaderView } from "@/src/components/Header/HeaderView"

export const Header = async () => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <HeaderView user={user} />
}
