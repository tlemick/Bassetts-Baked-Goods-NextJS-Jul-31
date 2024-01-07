/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-tabs */
'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { Vegan, WheatOff, Sparkles, Package, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface ProductColumn {
  id: string
  name: string
  description: string
  category: string
  // sizes: string[];
  isFeatured: boolean
  isArchived: boolean
  canBeVegan: boolean
  canBeGF: boolean
  createdAt: string
}

export const columns: Array<ColumnDef<ProductColumn>> = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
			<Button
				className="-ml-4"
				variant="ghost"
				onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
			>
				Category
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
      )
    }
  },
  // the description is too wordy for this screen.
  // {
  // 	accessorKey: 'description',
  // 	header: 'Description',
  // },
  //	find a nice formatted way to put the sizes / prices here?
  // {
  // 	accessorKey: 'sizes',
  // 	header: 'Sizes / Price',
  // },
  {
    accessorKey: 'canBeVegan',
    header: 'Vegan?',
    cell: ({ row }) => (row.original.canBeVegan ? <Vegan strokeWidth={1.5}/> : null)
  },
  {
    accessorKey: 'canBeGF',
    header: 'Gluten Free?',
    cell: ({ row }) => (row.original.canBeGF ? <WheatOff strokeWidth={1.5}/> : null)
  },
  {
    accessorKey: 'isArchived',
    header: ({ column }) => {
      return (
			<Button
				className="-ml-4"
				variant="ghost"
				onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
			>
				Archived?
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
      )
    },
    cell: ({ row }) => (row.original.isArchived ? <Package strokeWidth={1.5}/> : null)
  },
  {
    accessorKey: 'isFeatured',
    header: ({ column }) => {
      return (
			<Button
				className="-ml-4"
				variant="ghost"
				onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
			>
				Featured?
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
      )
    },
    cell: ({ row }) => (row.original.isFeatured ? <Sparkles strokeWidth={1.5}/> : null)
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
    header: 'Actions'
  }
]
