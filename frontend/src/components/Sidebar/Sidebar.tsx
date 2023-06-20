import styles from "./Sidebar.module.css"
import server from "@/Functions/Server";

interface props {
    userData: { user: string, email: string } | {};
    setUser: (value: object) => void;
}
const Sidebar = ({userData, setUser}:props) => {
    const handleLogin = () => {
        window.location.href = '/login'
    }

    const handleLogout = () => {
        server.get('/logout/',
            {withCredentials: true}
        ).then(r => {
            console.log(r)
            setUser({})
        }).catch(r => {
            console.log(r.response.data)
            alert(r.response.data.detail)
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.title}>
                    TSL WALL
                </div>
                <button>
                    Home
                </button>
                <button>
                    Search
                </button>
                <button>
                    Profile
                </button>
            </div>
            {Object.keys(userData).length === 0 && (
                <button className={styles.loginButton} onClick={handleLogin}>
                    Login
                </button>
            )}
            {Object.keys(userData).length !== 0 && (
                <button className={styles.loginButton} onClick={handleLogout}>
                    Logout
                </button>
            )}
        </div>
    )
}

export default Sidebar