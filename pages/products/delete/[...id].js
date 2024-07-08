import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
    const router = useRouter()
    const { id } = router.query
    const [productInfo, setProductInfo] = useState()

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get('/api/products?id=' + id).then(response => {
            setProductInfo(response.data)
        })
    }, [id])

    function goBack() {
        router.push('/products')
    }

    async function deleteProduct() {
        await axios.delete('/api/products?id='+id)
        goBack()
    }
    return (
        <Layout>
            <h1 className="text-red-500 text-center mb-5">
                Do You Want to Delete Product &nbsp; <b>{productInfo?.title} ? </b>
            </h1>
            <div className="flex gap-4 justify-center">
                <button className="btn-red"  onClick={deleteProduct}>Yes</button>
                <button className="btn-default" onClick={goBack}>No</button>
            </div>

        </Layout>
    )
}