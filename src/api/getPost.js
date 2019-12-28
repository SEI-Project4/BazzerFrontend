import jwt from 'jsonwebtoken'
import axios from 'axios'

 const fetchData = async (pageid) => {
     try{
        if(pageid == undefined){
            return await axios.get('https://sei-bazaar-backend.herokuapp.com/posts')
            .then(res => {
                    const allposts = res.data.result
                    return allposts
            })
            .catch(err => console.log(err))
        }else if(pageid.type=="create"){
            return await  axios.post(`https://sei-bazaar-backend.herokuapp.com/posts`, pageid, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
            .then(res => {
              if (res.data.msg == "created successfully") {
                return "Post has been created"
              }else{
                return "Failed to create post"
              }
            })
    
            .catch(err => console.log(err))
        }else{
            return await axios.get(`https://sei-bazaar-backend.herokuapp.com/posts/${pageid}`, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
            .then(res => {
                const post = res.data.result
                return post
            })
                .catch(err => console.log(err))
        }
        
     }catch(e){
         console.log(e)
         return 'session expired'
     }

  };

export default fetchData