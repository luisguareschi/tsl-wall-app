"use client"
import styles from './page.module.css'
import server from "@/Functions/Server";
import {useEffect, useState} from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Post from "@/components/Post/Post";
import CreatePost from "@/components/CreatePost/CreatePost";
import getUserData from "@/Functions/getUserData";
import SearchUser from "@/components/SearchUser/SearchUser";

type userData = { username: string, email: string, user_id:number } | {}

const Home = () => {
    const [user, setUser] = useState<userData>({})
    const [posts, setPosts] = useState<[]>([])
    const [showCreatePost, setShowCreatePost] = useState<boolean>(false)

    useEffect(() => {
        getUserData().then(userData => setUser(userData))
        getPosts()
    }, [])

    const getPosts = () => {
        server.get('/get_posts/').then(r => {
            console.log(r.data)
            setPosts(r.data)
        }).catch(r => {
            console.log(r.response.data)
        })
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.contentContainer}>
                    <div className={styles.welcomeText}>
                        Hello, {'username' in user ? user.username : 'Guest'}.
                    </div>
                    {posts.length === 0 && (
                        <div className={styles.loadingText}>
                            Loading posts...
                        </div>
                    )}
                    {posts.map((post, index) => {
                        return (
                            <Post postData={post} key={index} userData={user}/>
                        )
                    })}
                    <Sidebar userData={user}
                             setUser={(value) => setUser(value)}
                             setShowCreatePost={(value: boolean)=>setShowCreatePost(value)}/>
                </div>
            </div>
            <CreatePost show={showCreatePost} setShow={(value: boolean)=>setShowCreatePost(value)}/>
        </>
    )
}
export default Home
export type {userData}
