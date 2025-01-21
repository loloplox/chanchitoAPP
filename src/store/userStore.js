import { create } from "zustand"
import { persist } from "zustand/middleware"

const userStore = create(
    persist(
        set => ({
            user: {},
            setUser: user => set({ user }),
            logout: () => set({ user: {} })
        }),
        { name: "user-auth" }
    )
)

export default userStore
