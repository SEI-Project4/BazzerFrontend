import jwt from 'jsonwebtoken'

const fetchToken = async () => {
    try{
       var decoded = await jwt.verify(localStorage.usertoken, 'secret')
       return decoded
    }catch(e){
        console.log(e)
        return 'session expired'
    }

 };

export default fetchToken