import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import Users from "./Users"
const Main = () => {
    const navigate = useNavigate();


    const [dane, ustawDane] = useState([])
    const [error, setError] = useState([])
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
    const handleGetUsers = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/userlist',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }
                const { data: res } = await axios(config)
                ustawDane(res.data) // `res.data` - zawiera sparsowane ciało odpowiedzi (response body)
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    
                    setError(error.response.data.message)
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        } 
        var x = document.getElementById("show");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/userlist',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }
                const { data: res } = await axios(config)
                ustawDane(res.data) // `res.data` - zawiera sparsowane ciało odpowiedzi (response body)
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setTimeout(() => {
                        navigate("/")
                      }, 1500)
                    setError(error.response.data.message)
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
        var x = document.getElementById("show");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>MySite</h1>
                <div className="tabs">
                    <button className={styles.white_btn} onClick={handleLogout}>Logout</button>
                    <button className={styles.white_btn} onClick={handleGetUsers}>Users</button>
                    <button className={styles.white_btn} onClick={handleDelete}>Delete</button>
                </div>
            </nav>
            <div id="show">{dane.length > 0 ? <Users users={dane} /> : <p></p>}</div>
        </div>
    )
}
export default Main
