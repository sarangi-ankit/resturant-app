"use client"
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react";
import CustomSelect from "@/custom/CustomSelect";
import Link from "next/link";
import Header from "@/app/components/Header";
import ImagePreview from "@/app/components/layout/ImagePreview";
import CustomLoader from "@/app/components/layout/CustomLoader";


interface Category {
  _id: string;
  name: string;
}

interface Menus {
  _id: string;
  name: string;
  price: string;
  image: string;
}

export default function MenuItems() {


  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([])
  const [menus, setMenus] = useState<Menus[]>([])
  const [loader,setLoader]=useState<boolean>(true)



  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.category);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getMenus = async () => {
    try {
      const response = await fetch("/api/menu-items")
      const data = await response.json()
      const menuItems = data.menu
      return menuItems;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  
  useEffect(() => {
    fetchCategories();
    const fetchMenu = async () => {
    try {
      const result = await getMenus()
      setMenus(result)
      setLoader(false)
    } catch (error) {
      console.error('Error:', error);
    }
  }
    fetchMenu()
  }, []);

  const addMenu = async () => {
    try {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          description: desc,
          price: price,
          image: link,
          category: category
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setDialogOpen(false);
        const result = await getMenus();
        setMenus(result);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  }

 if (loader) {
    return (
            <div className="flex justify-center items-center min-h-screen">
                <CustomLoader/>
            </div>
        );
  }

  return (
    <>

      <div className="h-screen relative overflow-x-auto shadow-md sm:rounded-lg bg-custom-gradient">
        <div className="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 my-10 px-4 md:px-20">
          <h2 className="text-secondaryColor text-3xl ">Menu-Items</h2>
          <Dialog open={dialogOpen}>
            <DialogTrigger asChild>
              <Button className='bg-orange-500 text-white font-semibold hover:bg-orange-600' variant="outline" onClick={() => setDialogOpen(true)}>Add Menu</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" style={{ backgroundColor: "white", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>

              <DialogHeader>
                <DialogTitle>Add Menu</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right font-bold">
                    Name:
                  </label>
                  <Input
                    id="name"
                    defaultValue=""
                    className="col-span-3 font-semibold"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="price" className="text-right font-bold">
                    Price:
                  </label>
                  <Input
                    id="price"
                    defaultValue=""
                    className="col-span-3 font-semibold"
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  <label htmlFor="category" className="text-right font-bold">
                    Category:
                  </label>

                  <CustomSelect
                    value={category}
                    onChange={(selectedCategoryId: string) => setCategory(selectedCategoryId)}

                  >
                    <SelectTrigger id="category" className="col-span-3 font-semibold">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent position="popper" style={{ backgroundColor: "white" }}>
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </CustomSelect>

                  <label htmlFor="desc" className="text-right font-bold">
                    Description:
                  </label>
                  <Textarea
                    id="desc"
                    defaultValue=""
                    className="col-span-3 font-semibold"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <div className="col-span-2">

                    <Label htmlFor="image" className=" text-right font-bold">
                      Upload Image:
                    </Label>
                    <ImagePreview link={link} setLink={setLink} />

                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-orange-500 text-white font-semibold hover:bg-orange-600"
                  onClick={addMenu}
                >
                  Save
                </Button>
                <Button type="submit" onClick={() => setDialogOpen(false)}>Cancel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {menus.map(menu => (
              <tr key={menu._id} className="border-b border-gray-700">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                    <label className="sr-only">checkbox</label>
                  </div>
                </td>
                <td scope="row" className="flex items-center px-6 py-4 text-white whitespace-nowrap">
                  <img className="w-10 h-10 rounded-full" src={menu.image} alt="Profile" />
                </td>
                <td className="px-6 py-4">
                  {menu.name}
                </td>
                <td className="px-6 py-4">
                  {menu.price}.00
                </td>
                <td className="px-6 py-4">
                  <Link href={"menu-items/edit/" + menu._id}>
                    <button className="bg-transparent border text-white px-4 py-2 rounded-md hover:bg-secondaryColor">Show Order</button>
                  </Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {menus.map((menu) => (
            <div key={menu._id} className="w-full">
              <Card className="w-full">
                <Link href={"menu-items/edit/" + menu._id}>
                  <img src={menu.image} alt={menu.name} className="w-full h-auto md:h-[200px] sm:w-full" style={{ objectFit: 'cover' }} />
                </Link>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <h2 className="text-lg font-bold text-center">{menu.name}</h2>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="font-bold">{menu.price} USD</p>
                  <Link href={"menu-items/edit/" + menu._id}>
                    <Button className="md:text-[12px] md:h-[2rem] md:px-[0.4rem] md:py-[0.5rem] bg-orange-500 hover:bg-orange-400">
                      See Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div> */}


      </div>
    </>

  );
}
