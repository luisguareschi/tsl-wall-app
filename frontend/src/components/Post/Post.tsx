"use client";
import styles from "./Post.module.css"
import Image from "next/image"
import {BsHeartFill} from "react-icons/bs";
import {useEffect, useState} from "react";
import server from "@/Functions/Server";
import convertTimeStampToRelativeTime from "@/Functions/convertTimeStampToRelativeTime";
import stringToHslColor from "@/Functions/stringToHslColor";
import {userData} from "@/app/page";

interface props {
    postData: {id:number, title: string, content: string, user: string, image: string, created_at: string, user_likes: any}
    userData: userData;
    owner?: boolean;
}

const Post = ({postData, userData, owner}:props) => {
    const username = postData.user
    const [userLikes, setUserLikes] = useState(JSON.parse(postData.user_likes))
    const initials = username.substring(0, 2).toUpperCase();
    const color = stringToHslColor(username, 50, 50)
    let loggedInUsername = 'username' in userData ? userData.username : ''
    const [userLiked, setUserLiked] = useState<boolean>(userLikes.includes(loggedInUsername))

    const handleUserLike = () => {
        if (Object.keys(userData).length === 0) {
            alert('Please login to like a post')
            return
        }
        let likes = [...userLikes]
        if (!userLiked) {
            likes.push(loggedInUsername)
        }
        if (userLiked) {
            likes = likes.filter((like) => {
                return like !== loggedInUsername
            })
        }
        let likeString = JSON.stringify(likes)
        server.post('/like_post/',
            {
                post_id: postData.id,
                user_likes: likeString
            }).then(r =>{
                setUserLikes(likes)
                setUserLiked(!userLiked)
            }).catch(r => {
                console.log(r.response.data)
                alert(r.response.data.detail)
            })
    }

    const handleDeletePost = () => {
        if (!owner) {
            alert('You do not have permission to delete this post')
            return
        }
        if (confirm('Are you sure you want to delete this post?.\nThis action cannot be undone.')) {
            server.post('/delete_post/', {post_id: postData.id}).then(r => {
                alert('Post deleted successfully')
                window.location.reload()
            }).catch(r => {
                console.log(r.response.data)
                alert(r.response.data.detail)
            })
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.upperRow}>
                <div className={styles.profileIcon} style={{background: color}}>
                    {initials}
                </div>
                <div className={styles.topLeft}>
                    <div className={styles.username}>{username}</div>
                    <div className={styles.date}>
                        {convertTimeStampToRelativeTime(postData.created_at)}
                    </div>
                </div>

            </div>
            <div className={styles.title}>
                {postData.title}
            </div>
            {postData.image !== null && (
                <img src={postData.image} alt={'image'} width={1920} height={1080} className={styles.image}/>
            )}
            <div className={styles.content}>
                {postData.content}
            </div>
            <div className={styles.bottomRow}>
                <div className={styles.likes} onClick={handleUserLike}>
                <BsHeartFill className={userLiked ? styles.heartLiked : styles.heart}/>
                {userLikes.length} like{userLikes.length === 1 ? '' : 's'}
            </div>
                {owner && (
                    <button onClick={handleDeletePost}>
                        Delete Post
                    </button>
                )}
            </div>
        </div>
    )
}

export default Post