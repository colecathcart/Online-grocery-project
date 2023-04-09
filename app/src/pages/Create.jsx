import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Create = () => {
    const [user,setUser] = useState({
        username: "",
        password: "",
        fname: "",
        m_init: "",
        lname: "",
        address: ""
    })

    const [errmsg, setErr] = useState("")

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setUser(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        try {
            const taken = await axios.get(("http://localhost:8080/create?username=" + user.username))
            if(taken.data.length === 0){
            await axios.post("http://localhost:8080/create", user)
            navigate("/")
            } else {
                setErr("username already taken")
            }
        } catch (error) {
            console.log(error)
        }

    }
    console.log(user)

    return (
        <div className="form">
            <h1>Create Account</h1>
            <input type="text" placeholder="username" onChange={handleChange} name="username"/>
            <input type="text" placeholder="password" onChange={handleChange} name="password"/>
            <input type="text" placeholder="first name" onChange={handleChange} name="fname"/>
            <input type="text" placeholder="middle initial" onChange={handleChange} name="m_init"/>
            <input type="text" placeholder="last name" onChange={handleChange} name="lname"/>
            <input type="text" placeholder="address" onChange={handleChange} name="address"/>
            <button className="createaccbutton" onClick={handleClick}>Create Account</button>
            <p className="errmsg"><i>{errmsg}</i></p>
        </div>
    )
}

export default Create