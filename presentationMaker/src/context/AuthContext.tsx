import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { account, ID } from '../services/appwrite/api'
import { Models } from 'appwrite'

type AuthContextType = {
    user: Models.User<Models.Preferences> | null
    login: (email: string, pass: string) => Promise<void>
    register: (email: string, pass: string, name: string) => Promise<void>
    logout: () => Promise<void>
    loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkUserStatus()
    }, [])

    const checkUserStatus = async () => {
        try {
            const accountDetails = await account.get()
            setUser(accountDetails)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (email: string, pass: string) => {
        await account.createEmailPasswordSession(email, pass)
        await checkUserStatus()
    }

    const register = async (email: string, pass: string, name: string) => {
        await account.create(ID.unique(), email, pass, name)
        await login(email, pass)
    }

    const logout = async () => {
        await account.deleteSession('current')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}