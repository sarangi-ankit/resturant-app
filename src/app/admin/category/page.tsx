"use client"
import React, { useEffect, useState } from 'react';
import { Categories, columns } from "./column";
import { DataTable } from "../../../components/ui/data-table";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';



function Category() {
  const route = useRouter()
  const [data, setData] = useState<Categories[]>([]);
  const [name, setName] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false);

  async function getData(): Promise<Categories[]> {
    try {
      const response = await fetch('/api/category');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      const categories: Categories[] = result.category; 

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

  console.log("result", data)
  const addCategory = async () => {
    try {
      const response = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        setDialogOpen(false);
        // Refetch the data to include the new category
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

  return (
    <>
      {/* <Header /> */}
      <div className="grid max-w-2xl mx-auto mt-8">

        <div className='w-full pb-8 mt-8 sm:max-w-xl sm:rounded-lg flex items-center justify-between'>
          <h2 className="text-xl font-bold sm:text-xl">Category</h2>
          <Dialog open={dialogOpen}>
            <DialogTrigger asChild>
              <Button className='bg-orange-500 text-white font-semibold hover:bg-orange-600' variant="outline" onClick={() => setDialogOpen(true)}>Add category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" style={{ backgroundColor: "white", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
     
              <DialogHeader>
                <DialogTitle>Add category</DialogTitle>

              </DialogHeader>
              <div className="grid gap-4 py-4">
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

              </div>
              <DialogFooter>
                <Button type="submit" onClick={addCategory}>Add</Button>
                <Button type="submit" onClick={() => setDialogOpen(false)}>Cancel</Button>
              </DialogFooter>

            </DialogContent>
          </Dialog>
        </div>
        <div className="items-center text-[#202142] font-bold">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>

  );
}




export default Category;
