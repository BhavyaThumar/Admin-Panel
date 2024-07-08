import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function Categories() {
    const [name,setName] = useState('')

    async function saveCategory(ev)
    {
        ev.preventDefault()
        await axios.post('/api/categories', {name})
        setName('')
    }
    return (

            
        <Layout>
            <h1>Categories</h1>
            <label >Category Name</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input type="text" className="mb-0" placeholder={'Category Name '} value={name} onChange={ev=> setName(ev.target.value)}/>
                <button  type='submit' className= "btn-primary py-1"> Save </button>
            </form>
        </Layout>
    )
}