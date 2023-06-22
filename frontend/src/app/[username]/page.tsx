"use client"
import styles from "./page.module.css";
import server from "@/Functions/Server";
import {useEffect, useState} from "react";
import {userData} from "@/app/page";
import getUserData from "@/Functions/getUserData";
import Post from "@/components/Post/Post";
import Sidebar from "@/components/Sidebar/Sidebar";
import CreatePost from "@/components/CreatePost/CreatePost";

interface props {
    params: {username: string}
}

const UserPage = ({params}:props) => {
    const [userData, setUserData] = useState<userData>({})
    const owner = 'username' in userData ? userData.username === params.username : false
    const [posts, setPosts] = useState<[]>([])
    const [loadingPosts, setLoadingPosts] = useState<boolean>(true)
    const [showCreatePost, setShowCreatePost] = useState<boolean>(false)
    const getUserPosts = () => {
        let data = {username: params.username}
        server.post('/get_user_posts/', data).then(r => {
            console.log(r.data)
            setPosts(r.data)
            setLoadingPosts(false)
        }).catch(r => {
            console.log(r.response.data)
        })
    }

    useEffect(() => {
        getUserPosts()
        getUserData().then(userData => setUserData(userData))
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <div className={styles.title}>
                    {params.username}'s Profile.
                </div>
                {posts.length === 0 && (
                    <div className={styles.secondaryText}>
                        {loadingPosts ? 'Loading posts...' : 'No posts to show.'}
                    </div>
                )}
                {posts.map((post, index) => {
                    return (
                        <Post postData={post} userData={userData} key={index} owner={owner}/>
                    )
                })}
            </div>
            <Sidebar userData={userData} setUser={(value)=>setUserData(value)}
                     setShowCreatePost={(value => setShowCreatePost(value))}/>
            <CreatePost show={showCreatePost} setShow={(value)=>setShowCreatePost(value)}/>
        </div>
    )
}

export default UserPage