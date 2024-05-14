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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react";
import CustomSelect from "@/custom/CustomSelect";
import Link from "next/link";
import Header from "@/app/components/Header";

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
  const [image, setImage] = useState<File | undefined>(undefined);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([])
  const [menus, setMenus] = useState<Menus[]>([])

  useEffect(() => {
    fetchCategories();
    fetchMenu()
  }, []);

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

  const addMenu = async () => {
    try {
      let imageDataUrl = '';

      // Convert the selected image to a data URL
      if (image) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            imageDataUrl = reader.result; // Get the data URL of the uploaded image
          } else {
            // Handle other cases, e.g., ArrayBuffer or null
            console.error('Unsupported result type:', typeof reader.result);
          }
          // Once the data URL is available, proceed with adding the menu
          addMenuWithDataUrl(imageDataUrl);
        };
        reader.readAsDataURL(image); // Read the uploaded image as data URL
      } else {
        // If no image is selected, proceed with adding the menu without an image
        addMenuWithDataUrl(imageDataUrl);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  }


  const addMenuWithDataUrl = async (imageDataUrl: any) => {
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
          image: imageDataUrl,
          category: category
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setDialogOpen(false);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  }

  const fetchMenu = async () => {
    try {
      const response = await fetch("/api/menu-items")
      const data = await response.json()
      setMenus(data.menu)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      {/* <Header /> */}
      <div className="grid max-w-4xl mx-auto mt-8">
        <div className="w-full pb-8 mt-8 px-4 sm:rounded-lg flex items-left justify-between">
          <h2 className="text-xl font-bold sm:text-xl">Menu-Items</h2>
          <Dialog open={dialogOpen}>
            <DialogTrigger asChild>
              <Button className='bg-orange-500 text-white font-semibold hover:bg-orange-600' variant="outline" onClick={() => setDialogOpen(true)}>Add Menu</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" style={{ backgroundColor: "white", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              {/* Existing content... */}
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
                    <SelectContent position="popper" style={{ backgroundColor: "white"}}>
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
                      }
                    }}
                  />
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
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
        </div>


      </div>
    </>

  );
}
