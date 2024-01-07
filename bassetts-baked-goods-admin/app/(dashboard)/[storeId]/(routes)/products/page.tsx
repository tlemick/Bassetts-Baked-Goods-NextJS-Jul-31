/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { format } from 'date-fns'

import prismadb from '@/lib/prismadb'
import { formatter } from '@/lib/utils'

import { ProductClient } from './components/client'
import type { ProductColumn } from './components/columns'

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      sizes: true,
      images: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    category: item.category.name,
    productSizes: item.sizes,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    canBeVegan: item.canBeVegan,
    canBeGF: item.canBeGF,
    createdAt: format(item.createdAt, 'MMMM dd, yyyy')
  }))
  // console.log(formattedProducts)
  // e.g.
  // {
  // 	id: '9e4b1a51-255d-4b12-b651-65caef3ddd4a',
  // 	name: 'test5',
  // 	description: 'test5',
  // 	category: 'Pies',
  // 	productSizes: [ [Object], [Object] ],
  // 	isFeatured: true,
  // 	isArchived: false,
  // 	canBeVegan: false,
  // 	canBeGF: false,
  // 	createdAt: 'December, 17, 2023'
  //   }
  return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<ProductClient data={formattedProducts} />
			</div>
		</div>
  )
}

export default ProductsPage
