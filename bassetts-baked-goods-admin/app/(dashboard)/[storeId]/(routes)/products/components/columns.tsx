"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
    id: string
    name: string
    sizes: []
    dimension: []
    category: string
    isFeatured: boolean
    isArchived: boolean
    canBeVegan: boolean
    canBeGF: boolean
    createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "canBeVegan",
        header: "Vegan",
    },
    {
        accessorKey: "canBeGF",
        header: "GF",
    },
    {
        accessorKey: "isArchived",
        header: "Archived",
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
        header: "Actions",
    },
]
