"use client"
import Header from '@/app/components/Header';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Category {
    _id: string;
    name: string;
}

const EditMenu = () => {
    const route = useRouter()
    const { id } = useParams();
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [categoryName, setCategoryName] = useState("")
    const [allcategories, setAllCategories] = useState<Category[]>([])

    const fetchMenuById = async () => {
        try {

            const response = await fetch('/api/menu-items');
            const data = await response.json();
            const item = data.menu
            const filteredItem = item.find((i: any) => i._id === id)
            // console.log("filter", filteredItem)
            setName(filteredItem.name);
            setDescription(filteredItem.description);
            setPrice(filteredItem.price);
            setImage(filteredItem.image)
            setCategory(filteredItem.category)


        } catch (error) {
            console.error('Error:', error);
        }

    };

    const fetchCategoryById = async () => {
        try {

            const response = await fetch('/api/category');
            const id = category
            const data = await response.json();
            const cat = data.category
            setAllCategories(cat)


            const filteredCategory = cat.find((i: any) => i._id == id)
            setCategoryName(filteredCategory.name)



        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        fetchMenuById()

    }, [])

    useEffect(() => {
        if (category) {
            fetchCategoryById();
        }
    }, [category]);

    // console.log("category", categoryName)

    const updateMenu = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name, description, price, category }),

            });

            const data = await response.json();
            console.log("data", data)

            if (response.ok) {
                alert(data.message);
                route.push("/admin/menu-items");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    }
    
    const deleteMenu = async() => {
        try {
            const response = await fetch(`/api/menu-items?_id=${id}`, {
                method:"DELETE"
            })
            const data = await response.json();
            if (response.ok) {
                alert(data.message)
                route.push("/admin/menu-items");
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <Header/>
        <div className="grid max-w-2xl mx-auto mt-8 font-bold">
            <div className='w-full pb-8 mt-8 sm:max-w-xl sm:rounded-lg'>
                <h2 className=" text-2xl font-bold sm:text-xl">Edit Menu</h2>
            </div>

            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={image}
                    alt={name} />

                <div className="flex flex-col space-y-5 sm:ml-8">
                    <button type="button"
                        className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                        Change picture
                    </button>
                    <button type="button"
                        className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                        Delete picture
                    </button>
                </div>
            </div>

            <div className="items-center mt-8 sm:mt-14 text-[#202142]">

                <div className="mb-2 sm:mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Item Name</label>
                    <input
                        type="text"
                        id="title"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        onChange={(e: any) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Description</label>
                    <textarea
                        id="description"
                        className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e: any) => setDescription(e.target.value)}
                        value={description}
                    >
                    </textarea>
                </div>
                <div className="mb-2 sm:mb-6">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Base Price</label>
                    <input
                        type="text"
                        id="price"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        onChange={(e: any) => setPrice(e.target.value)}
                        value={price}
                    />
                </div>
                <div className="mb-2 sm:mb-6">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Category</label>
                    <select
                        name="category"
                        id="category"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        onChange={(e: any) => setCategory(e.target.value)}
                        value={category}
                    >
                        {allcategories.map(list => (
                            <option key={list._id} value={list._id}>{list.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end gap-2 mb-10">
                    <button
                        type="submit"
                        className="bg-orange-500 text-white hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        onClick={updateMenu}
                    >
                        Update
                    </button>
                    <button
                        type="submit"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        onClick={deleteMenu}
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>
        </>
        
    )
}

export default EditMenu