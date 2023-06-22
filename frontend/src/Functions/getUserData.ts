import server from "@/Functions/Server";
import {userData} from "@/app/page";
type getUserData = () => Promise<userData>

const getUserData: getUserData = async () => {
    return (
        server.get('/user/').then(r => {
            console.log(r.data.user)
            return r.data.user
        }).catch(r => {
            console.log(r.response.data)
            return {}
        })
    )
}

export default getUserData