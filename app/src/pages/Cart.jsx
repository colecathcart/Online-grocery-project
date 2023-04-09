import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Cart = () => {
    const [items,setItems] = useState([])

    const [total, setTotal] = useState(0)

    useEffect(()=>{
        const FetchAllItems = async ()=>{
            try {
                const res = await axios.get("http://localhost:8080/cart")
                setItems(res.data)
                var ttl = 0
                for(let i = 0; i < items.length; i++){
                    ttl += items[i].price*items[i].remaining_num
                }
                setTotal(ttl)
            } catch (error) {
                console.log(error)
            }
        }
        FetchAllItems()
    },[items])

    const navigate = useNavigate()

    const handleNavigateLogout = async e =>{
        e.preventDefault()
        navigate("/")
    }

    const handleNavigateHome = async e =>{
        e.preventDefault()
        navigate("/home");
    }

    const handleRemove = param => async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8080/cart", param)
            const res = await axios.get("http://localhost:8080/cart")
            setItems(res.data)
        } catch (error) {
            console.log(error)
        }
    };

    const handleCheckout = async e => {
        e.preventDefault()
        try {
            const param = "checkout"
            await axios.post("http://localhost:8080/cart", [param])
            const res = await axios.get("http://localhost:8080/cart")
            setItems(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="cart">
            <div className="topbar">
                <button className="topbarbutton" onClick={handleNavigateLogout}>Logout</button>
                <button className="topbarbutton" onClick={handleNavigateHome}>Home</button>
            </div>
            <h1>Cart</h1>
            <div className="cartcontents">
                <table className="cartable">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Remove</th>
                        </tr>
                        {items.map(item=>(
                            <tr>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.remaining_num}</td>
                                <td><button className="topbarbutton" onClick={handleRemove(item)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3>Total: ${total}</h3>
                <div className="checkout">
                    <label for="cars">Select payment method</label>

                    <select name="cars" id="cars">
                        <option value="volvo">Credit</option>
                        <option value="saab">Debit</option>
                        <option value="mercedes">Paypal</option>
                        <option value="audi">Pay in-person</option>
                    </select>
                    <input type="radio" id="delivery" name="checkout" value="1"></input>
                    <label for="delivery">Delivery</label>
                    <input type="radio" id="pickup" name="checkout" value="2"></input>
                    <label for="pickup">Pickup</label>
                    <button className="createaccbutton" onClick={handleCheckout}>Chekout</button>
                </div>
            </div>
        </div>
    )
}

export default Cart