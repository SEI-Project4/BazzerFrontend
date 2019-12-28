import jwt from 'jsonwebtoken'
import axios from 'axios'

 const fetchData = async (pageid) => {
     try{
        var decoded = await jwt.verify(localStorage.usertoken, 'secret')
        var token = {
            id:decoded.id,
            admin: decoded.isadmin,
            verified: decoded.isverified,
            tokenuser: decoded.username
        }
        let userid = pageid
        //sometimes the page might be undefined during redirecting which makes the wrong action. find a solution
        if(decoded.id==pageid || pageid==undefined){
             userid = decoded.id
        }
        return await axios.get(`https://sei-bazaar-backend.herokuapp.com/users/${userid}`, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
                        .then((res) => {
                                const userdata = res.data.result
                                const alldata = {...token,...userdata}
                                return alldata;
                        }).catch(err => console.log(err))

     }catch(e){
         console.log(e)
         return 'session expired'
     }

  };

export default fetchData