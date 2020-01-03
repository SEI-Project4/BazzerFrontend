import jwt from 'jsonwebtoken'
import axios from 'axios'

const fetchTask = async (state) => {
    try{
      var decoded = await jwt.verify(localStorage.usertoken, 'secret')

    if(state == undefined){
           return "state undefined"
    }else if(state.type=="submit"){
           return await axios.post(`https://sei-bazaar-backend.herokuapp.com/posts/${state.pageid}`, state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
           .then(res => {
               if (res.data.msg == "created successfully") {
                   window.location.reload();
               }
               console.log(res)
           })
           .catch(err => console.log(err))
    }else if(state.type=="delete"){
        return await axios.delete(`https://sei-bazaar-backend.herokuapp.com/posts/${state.pageid}`, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then(res => {
            if (res.data.msg === "the post has been deleted ") {
                window.location.replace("/home");
            }
        })
        .catch(err => console.log(err))
    }else if(state.type=="later"){
        return await axios.post(`https://sei-bazaar-backend.herokuapp.com/posts/${state.pageid}/watchlater`, state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then(res => {
            if (res.data.msg === "post added to watch later") {
                return "post added to watch later"
            }
        })
        .catch(err => {console.log(err)})
    }else if(state.type=="submitBid"){
        return await axios.post(`https://sei-bazaar-backend.herokuapp.com/posts/${state.pageid}/bid`, state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then(res => {
            console.log(res)
            if(res.data.msg==="value must be greater than current bid"){
                return "value must be greater than current bid"
            }else if(res.data.msg==="you cant bid on your post ! or you have to pass value as number"){
                return "you can't bid on your own post | or use only valid numbers"
            }else if(res.data.msg==="item is Sold out!"){
                return "item sold out!"
            }else if(res.data.msg==="bid regesterd"){
                return "bid sent"
            }
        })
        .catch(err => console.log(err))
    }else if(state.type=="Buy"){
        return await axios.post(`https://sei-bazaar-backend.herokuapp.com/posts/${state.pageid}/buy`, state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then(res=>{
            if(res.data.msg==="buy order regesterd"){
                return "item has been ordered successfully"
            }else if(res.data.msg==="item is Sold out!"){
                return "item sold out!"
            }
            
        }).catch(err=>{console.log(err)

        })
    }else if(state.type=="approve"){
        return await axios.post(`https://sei-bazaar-backend.herokuapp.com/posts/${state.pageid}/isapproved`, this.state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then(res=>{
            if(res.data.msg==="isapproved status changed"){
                
                window.location.replace("/approve");
            }else if(res.data.msg==="item is Sold out!"){
                return "error approving"
            }
            
        }).catch(err=>{
            console.log(err)
        })
    }else{
        return "error this.state type or not found"
    }
       
    }catch(e){
        console.log(e)
        return 'Please login'
    }

 };

export default fetchTask