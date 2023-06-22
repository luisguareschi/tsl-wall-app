import styles from "./Sidebar.module.css"
import server from "@/Functions/Server";
import {HiHome, HiSearch} from "react-icons/hi";
import {CgProfile} from "react-icons/cg";
import {IoAddCircleOutline} from "react-icons/io5";
import {useRouter} from "next/navigation";
import {userData} from "@/app/page";

interface props {
    userData: userData;
    setUser: (value: object) => void;
    setShowCreatePost: (value: boolean) => void;
}
const Sidebar = ({userData, setUser, setShowCreatePost}:props) => {
    const router = useRouter()
    const handleLogin = () => {
        router.push('/login')
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

    const handlePostClicked = () => {
        if (Object.keys(userData).length === 0) {
            alert('Sign in to create a post')
            return
        }
        setShowCreatePost(true)
    }

    const handleProfileClicked = () => {
        if (!('username' in userData) ) {
            alert('Sign in to view your profile')
            return
        }
        router.push('/' + userData.username)
    }

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.title}>
                    TSL WALL
                </div>
                <button onClick={()=>router.push('/')}>
                    <HiHome/>
                    Home
                </button>
                <button>
                    <HiSearch/>
                    Search
                </button>
                <button onClick={handleProfileClicked}>
                    <CgProfile/>
                    Profile
                </button>
                <button onClick={handlePostClicked}>
                    <IoAddCircleOutline/>
                    Post
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