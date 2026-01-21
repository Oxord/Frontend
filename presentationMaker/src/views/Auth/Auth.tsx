import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.ts'
import style from './Auth.module.css'

const Auth = () => {
    const { login, register } = useAuth()
    const [isLogin, setIsLogin] = useState(true)
    
    // Form state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        try {
            if (isLogin) {
                await login(email, password)
            } else {
                await register(email, password, name)
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Ошибка авторизации')
        }
    }

    return (
        <div className={style.authContainer}>
            <div className={style.authCard}>
                <h2 className={style.title}>{isLogin ? 'Вход' : 'Регистрация'}</h2>
                
                {error && <div className={style.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={{width: '100%'}}>
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Имя"
                            className={style.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        className={style.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        className={style.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className={style.button}>
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>

                <p className={style.toggleText} onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Нет аккаунта? Создать' : 'Уже есть аккаунт? Войти'}
                </p>
            </div>
        </div>
    )
}

export default Auth