'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Vegan, WheatOff } from 'lucide-react';


export type ProductColumn = {
	id: string;
	name: string;
	description: string;
	category: string;
	// sizes: string[];
	isFeatured: boolean;
	isArchived: boolean;
	canBeVegan: boolean;
	canBeGF: boolean;
	createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'category',
		header: 'Category',
	},
	//the description is too wordy for this screen.
	// {
	// 	accessorKey: 'description',
	// 	header: 'Description',
	// },
	//	find a nice formatted way to put the sizes / prices here.
	// {
	// 	accessorKey: 'sizes',
	// 	header: 'Sizes / Price',
	// },
    {
        accessorKey: 'canBeVegan',
        header: 'Vegan',
        cell: ({ row }) => (row.original.canBeVegan ? <Vegan /> : null),
    },
    {
        accessorKey: 'canBeGF',
        header: 'GF',
        cell: ({ row }) => (row.original.canBeGF ? <WheatOff /> : null),
    },
	{
		accessorKey: 'isArchived',
		header: 'Archived',
	},
	{
		accessorKey: 'isFeatured',
		header: 'Featured',
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
		header: 'Actions',
	},
];
