import server from "@/Functions/Server";
import {userData} from "@/app/page";

type getUsers = () => Promise<userData[] | []>

const getUsers = async () => {
    return (
        server.get('/get_users/').then(r => {
            return r.data
        }).catch(r => {
            console.log(r.response.data)
            return []
        })
    )
}

export default getUsers