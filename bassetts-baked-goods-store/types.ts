export interface Billboard {
	id: string;
	label: string;
	imageUrl: string;
}

export interface Category {
	id: string;
	name: string;
	description: string;
	billboard: Billboard;
}

export interface Product {
	id: string;
	category: Category;
	name: string;
	description: string;
	isFeatured: boolean;
	canBeVegan: boolean;
	canBeGF: boolean;
	sizes: Size[];
	images: Image[];
	price: number;
	quantity: number;
	selectedSize: Size | null;
}

export interface Image {
	id: string;
	url: string;
}

export interface Size {
	id: string;
	name: string;
	dimensions: string;
	price: number;
}
