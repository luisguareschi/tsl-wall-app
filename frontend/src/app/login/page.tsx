"use client"
import styles from './page.module.css'
import {useEffect, useState} from "react";
import server from "@/Functions/Server";
import {useRouter} from "next/navigation";

const LoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [createNewUser, setCreateNewUser] = useState<boolean>(false)
    const router = useRouter()

    const handleLogin = () => {
        server.post('/login/',
            {email: email, password: password},
        ).then(r =>{
            console.log(r.data)
            router.push('/')

        }).catch(r => {
            console.log(r.response)
            let data = r.response.data
            let msg = ''
            for (let key of Object.keys(data)) {
                msg = msg + `${key}: ${data[key]}\n`
            }
            alert(msg)
        })
     }

     useEffect(() => {
         setUsername('')
         setEmail('')
         setPassword('')
         setPassword2('')
     }, [createNewUser])

    const handleRegister = () => {
        if (password !== password2) {
            alert('Passwords do not match')
            setPassword('')
            setPassword2('')
            return
        }
        server.post('/register/',
            {email: email, username: username, password: password}
            ).then(r => {
                console.log(r.data)
                alert('Registered successfully')
                setCreateNewUser(false)
        }).catch(r => {
            console.log(r.response)
            let data = r.response.data
            let msg = ''
            for (let key of Object.keys(data)) {
                msg = msg + `${key}: ${data[key]}\n`
            }
            alert(msg)
        })
    }

    const handleEnter = (event: any) => {
        if (event.key === 'Enter') {
            if (createNewUser) {
                handleRegister()
            } else {
                handleLogin()
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.cardContainer} onKeyDown={handleEnter}>
                <div className={styles.title}>
                    TSL Wall
                </div>
                <div className={styles.content}>
                    <input value={email} onChange={(event)=>setEmail(event.target.value)}
                           placeholder={'email'} autoComplete={'on'}/>
                    {createNewUser &&
                        <input value={username} onChange={(event)=>setUsername(event.target.value)}
                               placeholder={'username'}/>}
                    <input value={password} onChange={(event)=>setPassword(event.target.value)}
                            type={'password'}
                           placeholder={'password'}/>
                    {createNewUser && (
                        <input value={password2} onChange={(event)=>setPassword2(event.target.value)}
                               type={'password'}
                               placeholder={'re-enter password'}/>
                    )}
                    {!createNewUser && <button onClick={handleLogin}>Login</button>}
                    {createNewUser && <button onClick={handleRegister}>Register</button>}
                    <div className={styles.separator}>
                        OR
                    </div>
                    <a onClick={()=>setCreateNewUser(!createNewUser)}>
                        {!createNewUser ? 'Register new account' : 'Sign In'}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LoginPage