import React, { useEffect, useState } from "react"
import axios from "axios"

const Home = () => {
    const [items,setItems] = useState([])

    useEffect(()=>{
        const FetchAllItems = async ()=>{
            try {
                const res = await axios.get("http://localhost:8080/home")
                setItems(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        FetchAllItems()
    },[])

    return (
        <div className="homepage">
            <div className="topbar">
                <button className="topbarbutton">Logout</button>
                <button className="topbarbutton">Home</button>
                <button className="topbarbutton">Cart</button>
            </div>
            <h1>Items</h1>
            <div>
                <h4>Filter Options</h4>
            </div>
            <div className="items">
                {items.map(item=>(
                    <div className="item" key={item.item_code}>
                        <img src={require("./img/"+ item.name +".jpg")} alt={item.name} />
                        <h2>{item.name}</h2>
                        <span className="itemprice">${item.price}</span>
                        <button className="cartaddbutton">Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home