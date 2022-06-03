import jwt_decode from "jwt-decode";


const Auth = ()=>{
    const token = localStorage.getItem('Token') ? JSON.parse(localStorage.getItem('Token')) : null
    let user = ""
    if (token){
        user = jwt_decode(token)
        console.log("privatetoken", user)
        return user;
    }
    else{
        return null;
    }

}


export default Auth;