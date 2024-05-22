"use client"

import { ColumnDef } from "@tanstack/react-table"

export type SubCategory = {
  id: string;
  name: string;
};

export type Categories = {
  id: string,
  name: string,
  status: string,
  time: string,
  category:SubCategory[]
}

export const columns: ColumnDef<Categories>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  
  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white text-[15px] font-semibold py-1 px-4 rounded">
          Edit
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
          Delete
        </button>
      </div>
    ),
  },
]
