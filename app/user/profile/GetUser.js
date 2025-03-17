import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

const GetUser = async () => {

    const cok = await cookies()
    let token = cok.get("token");
    let user = null;
    
    if (cok.get("token")) {

        jwt.verify(token.value, process.env.BACKEND_JWT_SECRET, (err, decoded) => {
            if (err) return null;
            user = decoded.user
        });
    }

    return user
}

export default GetUser
