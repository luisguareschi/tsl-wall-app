import styles from './SearchUser.module.css';
import {useEffect, useState} from "react";
import getUsers from "@/Functions/getUsers";
import {userData} from "@/app/page";
import stringToHslColor from "@/Functions/stringToHslColor";
import {useRouter} from "next/navigation";

interface props {
    show: boolean,
    setShow: (show: boolean) => void
}

type users = userData[] | []

const SearchUser = ({show, setShow}:props) => {
    const [searchUser, setSearchUser] = useState<string>('')
    const [users, setUsers] = useState<users>([])
    const router = useRouter()

    const goToUser = (username:string) => {
        router.push('/' + username)
    }

    useEffect(() => {
        getUsers().then(data => setUsers(data))
    }, [])

    const handleOutsideClick = (event: any) => {
        if (event.target.className === styles.outerContainer) {
            setSearchUser('')
            setShow(false)
        }
    }
    if (!show) return null

    return (
        <div className={styles.outerContainer} onClick={handleOutsideClick}>
            <div className={styles.container}>
                <div className={styles.title}>
                    Search Users
                </div>
                <input value={searchUser}
                       onChange={event => setSearchUser(event.target.value)}
                       placeholder={'username'}/>
                <div className={styles.usersContainer}>
                    Users:
                    {users.map((userData, index) => {
                        // @ts-ignore
                        const username = Object.keys(userData).includes('username') ? userData.username : ''
                        const initials = username.substring(0, 2).toUpperCase();
                        const color = stringToHslColor(username, 50, 50)
                        if (!username.includes(searchUser)) {
                            return
                        }
                        return (
                            <div key={index} className={styles.user} onClick={()=>goToUser(username)}>
                                <div className={styles.profileIcon} style={{background: color}}>
                                    {initials}
                                </div>
                                {username}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchUser