import React, { useState } from 'react'
import './login.css'
import {  useNavigate } from 'react-router-dom';
import headphoneImg from '../../shared/img/headphone.png'
// import { useGSAP } from '@gsap/react'
// import gsap from 'gsap'
export default function Login() {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [number, setNumber] = useState()
    const [isLoggingIn, setisLoggingIn] = useState(false)
    const [toggle_login_heading, setToggle_login_heading] = useState("Welcome Back! To the Music Player")
    const [toggle_login_h4, settoggle_login_h4] = useState("A free Website to listen music like Spotify")
    

    async function authSignUp(e){
        e.preventDefault()
        try {
            const response = await fetch("https://akshat-kumar-sinha-api.onrender.com/api/music-player/authLogin",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:name, 
                    email:email,
                    number:number,
                    password:password
                })
            })
            if(!response.ok){
                throw new Error("Connection issues");
            }
            const data = await response.json();
            console.log(data)
            if(data.msg==="Success"){
                navigate('/',{state:{
                    email:data.email,
                    name:data.name,
                    number:data.number
                }})
            }
            else if(data.msg==="User Already Exists"){
                alert("User already Exists Redirecting to Login page");
            }
            else{
                alert("Some Issue occured Retry Sign In Again")
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function authLogin(e) {
        e.preventDefault();
        try {
            const response = await fetch('https://akshat-kumar-sinha-api.onrender.com/api/music-player/Signup',{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            });
            if(!response.ok){
                throw new Error("connection error")
            }
            const data = await response.json();
            // console.log(data)
            if(data.msg === "Login Success")
                goLoginHome(data.name,data.email,data.number)
            else if(data.msg==="User not found")
                alert("You are not registered Please Signup first")
            else alert(data.msg)
            
        } catch (error) {
            console.log(error)
        }
    }

    function toggle_signup_login(){
        setisLoggingIn(!isLoggingIn)
        const toggle_section = document.getElementById('toggle-section')
        if(!isLoggingIn){
            setToggle_login_heading("Sign Up to dive into the Music Realm")
            settoggle_login_h4("Jump into the world of Music")
            
            toggle_section.style.borderBottomLeftRadius="0px"
            toggle_section.style.borderTopLeftRadius="0px"
            toggle_section.style.borderTopRightRadius="20px"
            toggle_section.style.borderBottomRightRadius="20px"
            toggle_section.style.left="auto"
            toggle_section.style.right="0"
        }
        else{

            setToggle_login_heading("Welcome Back! To the Music Player")
                        
            settoggle_login_h4("A free Website to listen music like Spotify")
            toggle_section.style.borderBottomLeftRadius="20px"
            toggle_section.style.borderTopLeftRadius="20px"
            toggle_section.style.borderTopRightRadius="0px"
            toggle_section.style.borderBottomRightRadius="0px"
            toggle_section.style.left="0"
            toggle_section.style.right="auto"
        }
    }
    const navigate = useNavigate();

    const goLoginHome =  (name,email,number)=>{
        navigate('/',{state:{name:name,email:email,number:number}})
    }

    // useGSAP(()=>{
    
    //     gsap.on('#toggle-section',{
    //       x:535,
    //     //   rotate:360,
    //       duration:2,
    //       borderBottomLeftRadius:0,
    //       borderBottomRightRadius:20,
    //       borderTopLeftRadius:0,
    //       borderTopRightRadius:20,
    //       delay:1
    //     })
    //   })


    return (
        <>
            <div className='login-container'>
                <main className='login-card'>
                    <section id='toggle-section'>
                        <h3>{toggle_login_heading}</h3>
                        <h4>{toggle_login_h4}</h4>
                        <img src={headphoneImg} alt=''/>
                        <div className='animated-logo'>
                            <div className='music-bars'></div>
                            <div className='music-bars'></div>
                            <div className='music-bars'></div>
                        </div>
                        
                    </section>
                    
                    <form className='form-container' onSubmit={authSignUp}>
                        <input type='text' name='Name' id='Name' placeholder='Enter your name' required onChange={(e) => { setName(e.target.value) }}></input>
                        <input type='tel' name='Number' id='Number' placeholder='Enter your Number' required onChange={(e) => { setNumber(e.target.value) }}></input>
                        <input type='email' name='Email' id='Email' placeholder='Enter your Email' required onChange={(e) => { setEmail(e.target.value) }}></input>
                        <input type='password' name='password' id='Password' placeholder='Enter password' required onChange={(e) => { setPassword(e.target.value) }}></input>
                        <button className='btn-submit' type='submit'>Submit</button>
                        
                        <p>Already have an account <span id='toggle-section-button' onClick={toggle_signup_login}>Login</span></p>
                    </form>
                    <form className='form-container' onSubmit={authLogin}>
                        <input type='email' name='Email' id='Email' placeholder='Enter your Email' required onChange={(e) => { setEmail(e.target.value) }}></input>
                        <input type='password' name='password' id='Password' placeholder='Enter password' required onChange={(e) => { setPassword(e.target.value) }}></input>
                        <button className='btn-submit' type='submit'>Submit</button>
                        <p>Don't have account <span id='toggle-section-button' onClick={toggle_signup_login}>Create One</span></p>
                    </form>
                </main>

            </div>
        </>
    )
}
