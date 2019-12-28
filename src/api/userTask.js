import jwt from 'jsonwebtoken'
import axios from 'axios'

const fetchTask = async (state) => {
    try{
      var decoded = await jwt.verify(localStorage.usertoken, 'secret')

    if(state == undefined){
           return await axios.get('https://sei-bazaar-backend.herokuapp.com/posts')
           .then(res => {
                   const allposts = res.data.result
                   return allposts
           })
           .catch(err => console.log(err))
    }else if(state.type=="submit"){
           return await axios.put(`https://sei-bazaar-backend.herokuapp.com/users/${decoded.id}`, state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
           .then(res => {
               window.location.reload();
               return "submited"
           })
           .catch(err => console.log(err))
    }else if(state.type=="chat"){
        return await axios.post(`https://sei-bazaar-backend.herokuapp.com/users/send/${state.pageid}`, state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then(res => {
            return "msg sent"
        })
        .catch(err => {return "error msg sent"})
    }else if(state.type=="follow"){
        return await axios.post(`https://sei-bazaar-backend.herokuapp.com/users/${state.pageid}`, state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then((res) => {
            if (res.data.msg == "follow Done") {
                return "follow Done"
            }
        }).catch(err => { console.log(err) })
    }else if(state.type=="rate"){
        return await axios.post(`https://sei-bazaar-backend.herokuapp.com/users/${this.props.match.params.id}/rate`, this.state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then(res => {
            if (res.data.msg == "follow Done") {
                return "Review submited"
            }
        }).catch(err => {return "error submiting review" })
    }else if(state.type=="submitpass"){
        return await axios.post(`https://sei-bazaar-backend.herokuapp.com/users/${decoded.id}/changepassword`, state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then(res => {
            if (res.data.msg == "Password changed") {
                return "Password changed"
            }
        }).catch(err => {console.log(err) })
    }else if(state.type=="verifyuser"){
        return await axios.put(`https://sei-bazaar-backend.herokuapp.com/users/${decoded.id}`, state, { headers: { Authorization: `Bearer ${localStorage.usertoken}` } })
        .then(res => {
            window.location.reload();
            return "submited"
        })
        .catch(err => console.log(err))
    }else{
        return "error this.state type or not found"
    }
       
    }catch(e){
        console.log(e)
        return 'session expired'
    }

 };

export default fetchTask