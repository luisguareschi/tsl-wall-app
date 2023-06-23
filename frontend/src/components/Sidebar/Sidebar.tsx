import styles from "./Sidebar.module.css"
import server from "@/Functions/Server";
import {HiHome, HiSearch} from "react-icons/hi";
import {CgProfile} from "react-icons/cg";
import {IoAddCircleOutline} from "react-icons/io5";
import {useRouter} from "next/navigation";
import {userData} from "@/app/page";
import SearchUser from "@/components/SearchUser/SearchUser";
import {useState} from "react";

interface props {
    userData: userData;
    setUser: (value: object) => void;
    setShowCreatePost: (value: boolean) => void;
}
const Sidebar = ({userData, setUser, setShowCreatePost}:props) => {
    const [showSearchUser, setShowSearchUser] = useState<boolean>(false)
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
            alert('Logged out')
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

        <>
            <div className={styles.container}>
                <div className={styles.topContainer}>
                    <div className={styles.title}>
                        TSL WALL
                    </div>
                    <button onClick={()=>router.push('/')}>
                        <HiHome/>
                        Home
                    </button>
                    <button onClick={()=>setShowSearchUser(!showSearchUser)}>
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
            <SearchUser show={showSearchUser} setShow={(value: boolean)=>setShowSearchUser(value)}/>
        </>
    )
}

export default Sidebar