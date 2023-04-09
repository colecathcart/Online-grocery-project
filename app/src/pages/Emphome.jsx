import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Emphome = () => {
    const [items,setItems] = useState([])
    const [suppliers, setSuppliers] = useState([])

    useEffect(()=>{
        const FetchAllItems = async ()=>{
            try {
                const res = await axios.get("http://localhost:8080/manhome")
                setItems(res.data)
                const sups = await axios.get("http://localhost:8080/manhome?sups=any")
                setSuppliers(sups.data)
            } catch (error) {
                console.log(error)
            }
        }
        FetchAllItems()
    },[])

    const navigate = useNavigate()

    const handleNavigateLogout = async e =>{
        e.preventDefault()
        navigate("/")
    }
    
    const handleNavigateHome = async e =>{
        e.preventDefault()
        window.location.reload(false);
    }
    
    const handleNavigateInfo = async e =>{
        e.preventDefault()
        navigate("/info")
    }

    const handleSups = (item) =>{
        for(let i = 0; i < suppliers.length; i++){
            if(suppliers[i].itemccode === item.item_code){
                return suppliers[i].sup_name
            }
        }
    }

    return (
        <div>
            <div className="topbar">
                <button className="topbarbutton" onClick={handleNavigateLogout}>Logout</button>
                <button className="topbarbutton" onClick={handleNavigateHome}>Home</button>
                <button className="topbarbutton" onClick={handleNavigateInfo}>My Profile</button>
            </div>
            <h1>Staff Home</h1>
            <div className="cartcontents">
                <table className="ot">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Item Code</th>
                            <th>Sale Price</th>
                            <th>Department</th>
                            <th>Supplier</th>
                            <th>Sale #</th>
                            <th>Remaining</th>
                        </tr>
                        {items.map(item=>(
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.item_code}</td>
                                <td>${item.price}</td>
                                <td>{item.dep_name}</td>
                                <td>{handleSups(item)}</td>
                                <td>{item.sale_num}</td>
                                <td>{item.remaining_num}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
            </div>
        </div>
    )
}

export default Emphome