import axios from 'axios'

 const fetchData = async (pageid) => {
     try{
        
            return await axios.get(`https://sei-bazaar-backend.herokuapp.com/posts/${pageid}`, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
            .then(res => {
                const spost = res.data.result
                return spost
            })
                .catch(err => console.log(err))
        
        
     }catch(e){
         console.log(e)
         return 'error getting post'
     }

  };

export default fetchData