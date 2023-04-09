import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Manhome = () => {

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
    const [added, setAdded] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    //var addsub = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    const navigate = useNavigate()

    const handleNavigateLogout = async e =>{
        e.preventDefault()
        navigate("/")
    }
    
    const handleNavigateHome = async e =>{
        e.preventDefault()
        window.location.reload(false);
    }
    
    const handleNavigateEmps = async e =>{
        e.preventDefault()
        navigate("/employees")
    }

    const handleSups = (item) =>{
        for(let i = 0; i < suppliers.length; i++){
            if(suppliers[i].itemccode === item.item_code){
                return suppliers[i].sup_name
            }
        }
    }

    const handleAltered = (item) =>{
        if(added[item.item_code] > 0){
            return (
                <p className="orderadded">+{added[item.item_code]}</p>
            )
        }
    }

    const handlePlus = param => async e => {
        e.preventDefault()
        let addsub = [...added]
        addsub[param.item_code]++
        setAdded(addsub)
    }

    const handleMinus = param => async e => {
        e.preventDefault()
        if(added[param.item_code] > 0){
            let addsub = [...added]
            addsub[param.item_code]--
            setAdded(addsub)
        }
    }

    const handleOrder = async e =>{
        e.preventDefault()
        for(let i = 1; i < added.length; i++){
            if(added[i] > 0){
                const data = {
                    item_code: i,
                    to_add: added[i]
                }
                await axios.post("http://localhost:8080/manhome",data)
            }
            setAdded([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
            try {
                const res = await axios.get("http://localhost:8080/manhome")
                setItems(res.data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <div className="topbar">
                <button className="topbarbutton" onClick={handleNavigateLogout}>Logout</button>
                <button className="topbarbutton" onClick={handleNavigateHome}>Home</button>
                <button className="topbarbutton" onClick={handleNavigateEmps}>Employees</button>
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
                            <th>Order</th>
                        </tr>
                        {items.map(item=>(
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.item_code}</td>
                                <td>${item.price}</td>
                                <td>{item.dep_name}</td>
                                <td>{handleSups(item)}</td>
                                <td>{item.sale_num}</td>
                                <td>{item.remaining_num}{handleAltered(item)}</td>
                                <td><button className="topbarbutton" onClick={handlePlus(item)}>+</button><button className="topbarbutton" onClick={handleMinus(item)}>-</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button className="orderbutton" onClick={handleOrder}><h3>Order</h3></button>
                </div>
            </div>
        </div>
    )
}

export default Manhome