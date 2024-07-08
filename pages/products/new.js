import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

export default function NewProduct() {
    return (
        <Layout>
            <h1 className="text-xl text-green-600 p-1 mb-2"> <b>Add New Product </b></h1>
            <ProductForm/>
        </Layout>
    )
}