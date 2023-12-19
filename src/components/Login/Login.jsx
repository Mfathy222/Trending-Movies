import React, { useState } from 'react'
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
// import { axios } from 'axios';


export default function Login(props) {
  let [user,setUser] = useState ({
    username: "",
    password: "",
  });

//errormsg 
// let [errormsg,setErrormsg]=useState('');
let[errorsList,setErrorsList]=useState([]);
let[loading,setLoading]=useState(false);

//navigate after sign up
  const navigate=useNavigate();   
  function gotoHome(){
    navigate('/Home')
  }

  //  API integaration
  async function submitFormData(e){
    e.preventDefault(); 
    setLoading(true);
    let validateResponse=validateform();  
    if(validateResponse.error){
      setErrorsList(validateResponse.error.details);
    }else{
      let{data}=await axios.post('https://dummyjson.com/auth/login',user);
      // when success goto login page 
      // console.log(data);
      if(data.id >1){
        localStorage.setItem('token',data.token);
        gotoHome();
        // call safeUserData
        // props.SaveUserData();
      }
      // else{
    
      //   setErrormsg(data);
      // }
    }
    setLoading(false);

  };

// joi valdition
function validateform(){
const schema=Joi.object({
  // email:Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
username:Joi.string().required().min(3).max(10),
password:Joi.string().required(),
  })
return schema.validate(user,{abortEarly:false});
};


  // get value from form and set in setUser
  function getformvalue(e){
    let myUser= {...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
  };

  return (
    <>
    
        <div className=' my-5 w-50 m-auto'>
        <h1>Login</h1>
        {errorsList.map((error,index)=><div key={index} className="alert alert-danger">{error.message}</div>)}
        {/* {errormsg?<div className="alert alert-danger">{errormsg}</div>:''} */}
  
        <form onSubmit={submitFormData}>
        <div className='input-gp my-2'>
          {/* <label htmlFor="email">email:</label>
          <input onChange={getformvalue} type="email" className=' form-control' name='email' /> */}
          <label htmlFor="username">Username:</label>
          <input onChange={getformvalue} type="username" className=' form-control' name='username' />
        </div>
        <div className='input-gp my-2'>
          <label htmlFor="password">password:</label>
          <input onChange={getformvalue} type="password" className=' form-control' name='password' />
        </div>
        <button className='btn btn-info' type="submit">
          {loading ? <i className=' fa fa-spinner fa-spin '></i>:"Login" }
        </button>
        
        </form>
      </div>
    </>
  )
}
