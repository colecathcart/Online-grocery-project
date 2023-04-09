import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Employees = () => {

    const[employees, setEmployees] = useState([])

    const[newdep, setNewDep] = useState("")

    const[workerinfo, setWorkerInfo] = useState([])

    useEffect(()=>{
        const FetchAllEmps = async ()=>{
            try {
                const res = await axios.get("http://localhost:8080/employees")
                setEmployees(res.data)
                const res2 = await axios.get("http://localhost:8080/employees?staff=true")
                setWorkerInfo(res2.data)
            } catch (error) {
                console.log(error)
            }
        }
        FetchAllEmps()
    },[])

    const navigate = useNavigate()

    const handleNavigateLogout = async e =>{
        e.preventDefault()
        navigate("/")
    }

    const handleNavigateHome = async e =>{
        e.preventDefault()
        navigate("/manhome")
    }

    const handleNavigateEmployees = async e =>{
        e.preventDefault()
        window.location.reload(false);
    }

    const handleChange = (e) =>{
        setNewDep(e.target.value)
    }

    const handleMoveDep = param => async e =>{
        e.preventDefault()
        param.d_name = newdep
        try {
            await axios.post("http://localhost:8080/employees", param)
            const res = await axios.get("http://localhost:8080/employees")
            setEmployees(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSsn = (employee) =>{
        for(let i = 0; i < workerinfo.length; i++){
            if(workerinfo[i].id === employee.w_id){
                return(
                    <span className="empinfo">SSN: {workerinfo[i].ssn}</span>
                )
            }
        }
    }

    const handleDob = (employee) =>{
        for(let i = 0; i < workerinfo.length; i++){
            if(workerinfo[i].id === employee.w_id){
                return(
                    <span className="empinfo">D.o.B: {workerinfo[i].d_o_b}</span>
                )
            }
        }
    }

    return (
        <div>
            <div className="topbar">
                <button className="topbarbutton" onClick={handleNavigateLogout}>Logout</button>
                <button className="topbarbutton" onClick={handleNavigateHome}>Home</button>
                <button className="topbarbutton" onClick={handleNavigateEmployees}>Employees</button>
            </div>
            <h1>Employees</h1>
            <div className="employees">
                {employees.map(employee=>(
                    <div className="employee" key={employee.item_code}>
                        <img src={require("./img/worker.jpg")} alt={employee.address} />
                        <h2>Name: {employee.fname}</h2>
                        <span className="empinfo">ID: {employee.w_id}</span>
                        <span className="empinfo">Manager: jon p. smith</span>
                        {handleSsn(employee)}
                        {handleDob(employee)}
                        <span className="empinfo">Department: {employee.d_name}</span>
                        <br></br>
                        <label for="cars">Move department:</label>
                        <select name="deps" id="deps" onChange={handleChange} defaultValue={""}>
                            <option value=""></option>
                            <option value="bakery">bakery</option>
                            <option value="cash">cashier</option>
                            <option value="cust_serv">customer service</option>
                            <option value="deli">deli</option>
                            <option value="meat">meat</option>
                            <option value="produce">produce</option>
                            <option value="warehouse">warehouse</option>
                        </select>
                        <button className="cartaddbutton" onClick={handleMoveDep(employee)}>Update</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Employees