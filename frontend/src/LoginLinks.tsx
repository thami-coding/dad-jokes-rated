import useUser from './queries/useUser'
import type { TFormType } from './types/types'
import useGlobalState from './context/useGlobalState'
import styles from "./LoginLinks.module.css"
import { LogOut } from 'lucide-react'
import useLogout from './queries/useLogout'


export default function LoginLinks() {
    const { data, isPending, isError } = useUser()
    const { setIsLoginModalOpen, setMode } = useGlobalState()
    const { mutate } = useLogout()


    if (isPending) {
        <div>Loading...</div>
    }
    if (isError) {
        <div>Error logging in</div>
    }
    const handleClick = (mode: TFormType) => {
        setMode(mode)
        setIsLoginModalOpen(true)
    }
    const handleLogout = () => {
        mutate()
    }
    return (<>
        {data ?
            <button onClick={handleLogout} className={styles.iconBtn}>
                <LogOut className={styles.icon} />
            </button>
            : <div className={styles.toggle}>
                <button className={styles.loginBtn} onClick={() => handleClick("login")}>Login</button> / <button className={styles.loginBtn} onClick={() => handleClick("register")}>Signup</button>
            </div>
        }
    </>)
}

