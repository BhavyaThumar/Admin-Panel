import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false)

    const router = useRouter()

    async function saveProduct(ev) {
        const data = { title, description, price, images };
        ev.preventDefault();
        if (_id) {
            await axios.put('/api/products', { ...data, _id })
        }
        else {
            await axios.post('/api/products', data)
        }
        setGoToProducts(true)
    }

    if (goToProducts) {
        router.push('/products')
    }

    async function uploadImages(ev) {
        const files = ev.target?.files
        if (files?.length > 0) {
            setIsUploading(true)
            const data = new FormData();
            for (const file of files) {
                data.append('file', file)
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links]
            });
            setIsUploading(false)
        }
    }

    // for changing img order (drag-drop)
    function updateImagesOrder(images) {
        setImages(images)
    }

    return (

        <form onSubmit={saveProduct}>
            {/* <h1 className="text-xl text-green-600 p-1 mb-2"> <b>Adding New Product </b></h1> */}
            <label >Product Name</label>
            <input type="text" placeholder="Add Product Name" value={title} onChange={ev => setTitle(ev.target.value)} />

            <label> Images </label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-1">
                    {!!images?.length && images.map(link => (
                        <div key={link} className="h-24">
                            <img src={link} className="rounded-lg" alt="" />
                        </div>
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className=" h-24  flex items-center"> <Spinner /> </div>
                )}

                <label className="w-24 h-24 cursor-pointer border text-center items-center flex justify-center text-sm gap-1 text-gray-500 rounded-md bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                        Upload Images
                    </div>
                    <input type="file" onChange={uploadImages} className="hidden" />
                </label>
            </div>

            <label >Product Description</label>
            <textarea placeholder="Add Description of Product" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>

            <label >Product Price (in INR ₹)</label>
            <input type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)} />

            <div className="flex justify-end">
                <button type="submit" className="bg-green-600 px-4 text-white rounded-xl p-2 mt-2 mr-3">Save Product</button>
            </div>
        </form>

    );
}