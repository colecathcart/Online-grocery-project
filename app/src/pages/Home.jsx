import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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

    const [search,setSearch] = useState("")

    var cart = []

    const handleChange = (e) =>{
        setSearch(e.target.value)
    }

    const [filters, setFilters] = useState(
        {
            min: 0,
            max: 100
        }
    )

    const [produce, setProduce] = useState(true)
    const [meat, setMeat] = useState(true)
    const [bakery, setBakery] = useState(true)
    const [deli, setDeli] = useState(true)
    const [sale, setSale] = useState(true)

    const handleFilterChange = (e) =>{
        setFilters(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handlesetFilters = async e =>{
        e.preventDefault()
        try {
            const res = await axios.get(("http://localhost:8080/home?min="+filters.min+"&max="+filters.max+"&sale="+sale+"&deli="+deli+"&bakery="+bakery+"&meat="+meat+"&produce="+produce))
            setItems(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = async e =>{
        e.preventDefault()
        try {
            const res = await axios.get(("http://localhost:8080/home?name=" + search))
            setItems(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddToCart = param => async e => {
        e.preventDefault()
        param.remaining_num = 1
        let found = false
        for(let i = 0; i < cart.length; i++){
            if(param.name === cart[i].name){
                cart[i].remaining_num++
                found = true
            }
        }
        if(!found){
            cart.push(param)
        }
    }; 

    const navigate = useNavigate()

    const handleNavigateLogout = async e =>{
        e.preventDefault()
        navigate("/")
    }

    const handleNavigateHome = async e =>{
        e.preventDefault()
        window.location.reload(false);
    }

    const handleNavigateCart = async e =>{
        e.preventDefault()
        await axios.post("http://localhost:8080/home",cart)
        navigate("/cart")
    }

    const handleoutofStock = (item) =>{
        if(item.remaining_num > 0){
            return (
                <button className="cartaddbutton" onClick={handleAddToCart(item)}>Add to Cart</button>
            )
        } else {
            return <p className="errmsg"><i>out of stock</i></p>
        }
    }

    return (
        <div className="homepage">
            <div className="topbar">
                <button className="topbarbutton" onClick={handleNavigateLogout}>Logout</button>
                <button className="topbarbutton" onClick={handleNavigateHome}>Home</button>
                <button className="topbarbutton" onClick={handleNavigateCart}>Cart</button>
            </div>
            <h1>Store Catalogue</h1>
            <div className="filters">
                <h4>Filter Options</h4>
                <div className="subfilters">
                    <input type="text" placeholder="search by name" id="search" name="search" onChange={handleChange}/>
                    <button className="searchbutton" onClick={handleSearch}>Search</button>
                </div>
                <div className="checkboxes">
                    <div>
                        <div>
                            <input type="checkbox" id="t1" value="true" onChange={() => setProduce(!produce)} defaultChecked={produce}></input>
                            <label for="t1">Produce</label>
                        </div>
                        <div>
                            <input type="checkbox" id="t2" value="true" onChange={() => setBakery(!bakery)} defaultChecked={bakery}></input>
                            <label for="t2">Bakery</label>
                        </div>
                        <div>
                            <input type="checkbox" id="t3" value="true" onChange={() => setMeat(!meat)} defaultChecked={meat}></input>
                            <label for="t3">Meat</label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type="checkbox" id="t4" value="true" onChange={() => setDeli(!deli)} defaultChecked={deli}></input>
                            <label for="t4">Deli</label>
                        </div>
                        <div>
                            <input type="checkbox" id="t5" value="true" onChange={() => setSale(!sale)} defaultChecked={sale}></input>
                            <label for="t5">On sale</label>
                        </div>
                    </div>
                </div>
                <div className="subfilters">
                    <input id="p1" placeholder="$0 min" size="10" name="min" onChange={handleFilterChange}></input>
                    <label className="pricerange" for="p1">Price range</label>
                    <input id="p2" placeholder="$100 max" size="10" name = "max" onChange={handleFilterChange}></input>
                </div>
                    <button className="searchbutton" onClick={handlesetFilters}>Apply filters</button>
            </div>
            <div className="items">
                {items.map(item=>(
                    <div className="item" key={item.item_code}>
                        <img src={require("./img/"+ item.name +".jpg")} alt={item.name} />
                        <h2>{item.name}</h2>
                        <span className="itemprice">${item.price}</span>
                        {handleoutofStock(item)}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home