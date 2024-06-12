"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type Category = {
  _id: string;
  name: string;
  image: string;
};

const Category = () => {
  const [data, setData] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function getData() {
    try {
      const response = await fetch('/api/category');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      const categories = result.category;
      return categories;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addCategory = async () => {
    try {
      let imageUrl = '';

      if (image) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            imageUrl = reader.result;
          } else {
            console.error('Unsupported result type:', typeof reader.result);
          }
          addCategoryDataUrl(imageUrl);
        };
        reader.readAsDataURL(image);
      } else {
        addCategoryDataUrl(imageUrl);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  }

  const addCategoryDataUrl = async (imageUrl: any) => {
    try {
      const response = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, image: imageUrl }),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        setDialogOpen(false);
        const result = await getData();
        setData(result);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  }

  const deleteCategory = async (_id: string) => {
    try {
      const response = await fetch(`/api/category?_id=${_id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        const result = await getData();
        setData(result);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    }
  }

  return (
    <div className="h-screen relative overflow-x-auto shadow-md sm:rounded-lg bg-custom-gradient">
      <div className="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 my-10 px-4 md:px-20">
        <div className='text-secondaryColor text-3xl'>
          <h1>Category</h1>
        </div>
        <div className="relative flex">
          <Dialog open={dialogOpen}>
            <DialogTrigger asChild>
              <Button className='bg-orange-500 text-white font-semibold hover:bg-orange-600' variant="outline" onClick={() => setDialogOpen(true)}>Add category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white shadow-md rounded-md">
              <DialogHeader>
                <DialogTitle>Add category</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4 px-6">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right font-bold">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue=""
                    className="col-span-3 font-semibold"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <label htmlFor="image" className="text-right font-bold">
                  Upload Image:
                </label>
                <input
                  type="file"
                  id="image"
                  className="col-span-3"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const selectedImage = e.target.files[0];
                      setImage(selectedImage);
                      setPreviewUrl(URL.createObjectURL(selectedImage));
                    }
                  }}
                />
                {previewUrl && (
                  <img src={previewUrl} alt="Image Preview" className="mt-4 w-32 h-32 object-cover" />
                )}
              </div>
              <DialogFooter className="flex justify-end px-6 pb-4">
                <Button type="submit" onClick={addCategory}>Add</Button>
                <Button type="submit" onClick={() => setDialogOpen(false)}>Cancel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative inset-y-0 left-5 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="table-search-users" className="block w-full md:w-80 p-2 pl-10 text-sm text-white border bg-transparent rounded-lg" placeholder="Search for users" />
        </div>
      </div>
      <table className="w-full text-sm text-left text-white mx-10">
        <thead className="text-xs text-white uppercase bg-gray-700">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Item
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(product => (
            <tr key={product._id} className="border-b border-gray-700">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                  <label className="sr-only">checkbox</label>
                </div>
              </td>
              <th scope="row" className="flex items-center px-6 py-4 text-white whitespace-nowrap">
                <img className="w-10 h-10 rounded-full" src={product.image} alt="Profile" />
              </th>
              <td className="px-6 py-4">
                {product.name}
              </td>
              <td className="px-6 py-4 flex space-x-2">
                <button className="font-medium text-blue-500 hover:underline">Edit</button>
                <button
                  type="submit"
                  className="font-medium text-red-500 hover:underline"
                  onClick={() => deleteCategory(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Category;
