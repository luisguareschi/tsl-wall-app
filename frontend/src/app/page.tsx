"use client"
import styles from './page.module.css'
import server from "@/Functions/Server";
import {useEffect, useState} from "react";
import Sidebar from "@/components/Sidebar/Sidebar";

const Home = () => {
    const [user, setUser] = useState<object>({})

    useEffect(() => {
        getUserData()
    }, [])
    const getUserData = () => {
        server.get('/user/').then(r => {
            console.log(r.data.user)
            setUser(r.data.user)
        }).catch(r => {
            console.log(r.response.data)
        })
    }

    return (
        <div className={styles.container}>
            Hello world
            {JSON.stringify(user)}
            <Sidebar userData={user}
                     setUser={(value) => setUser(value)}/>
        </div>
    )
}
export default Home
