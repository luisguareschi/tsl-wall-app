"use client"
import styles from './page.module.css'
import server from "@/Functions/Server";
import {useEffect, useState} from "react";

const Home = () => {
    const [user, setUser] = useState<object>({})

    useEffect(() => {
        getUserData()
    }, [])
    const getUserData = () => {
        server.get('/user/').then(r => {
            console.log(r.data.user)
            // alert(JSON.stringify(r.data.user))
            setUser(r.data.user)
        }).catch(r => {
            console.log(r.response.data)
            // alert(r.response.data.detail)
        })
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
            Hello world
            {JSON.stringify(user)}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
export default Home
