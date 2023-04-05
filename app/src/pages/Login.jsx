import React, {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [user,setUser] = useState({
        susername: "",
        cusername: "",
        password: "",
        id: "",
    })

    const navigate = useNavigate()
    var errmsgu = ""
    var errmsgs = ""

    const handleChange = (e) =>{
        setUser(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleUserClick = async e =>{
        console.log("hello")
        e.preventDefault()
        try {
            const res = await axios.get(("http://localhost:8080/login?username=" + user.cusername + "&password=" + user.password))
            if(res.data.length > 0){
                navigate("/home")
            } else {
                errmsgu = "incorrect credentials"
            }
            console.log("back")
        } catch (error) {
            console.log(error)
        }

    }
    const handleStaffClick = async e =>{
        e.preventDefault()
        try {
            const res = await axios.get(("http://localhost:8080/login?username=" + user.susername + "&password=" + user.password))
            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }
    const handleNavigate = async e =>{
        e.preventDefault()
        navigate("/create")
    }
    console.log(user)
    return (
        <div className="login">
            <div className="form">
                <h1>Staff Login</h1>
                <input type="text" placeholder="username" onChange={handleChange} name="susername"/>
                <input type="text" placeholder="password" onChange={handleChange} name="password"/>
                <button className="createaccbutton" onClick={handleStaffClick}>Log in</button>
                <p className="errmsg"><i>{errmsgs}</i></p>
            </div>
            <div className="form">
                <h1>Customer Login</h1>
                <input type="text" placeholder="username" onChange={handleChange} name="cusername"/>
                <input type="text" placeholder="password" onChange={handleChange} name="password"/>
                <div className="loginbuttons">
                    <button className="createaccbutton" onClick={handleUserClick}>Log in</button>
                    <button className="createaccbutton" onClick={handleNavigate}>Create account</button>
                </div>
                <p className="errmsg"><i>{errmsgu}</i></p>
            </div>
        </div>
    )
}

export default Login