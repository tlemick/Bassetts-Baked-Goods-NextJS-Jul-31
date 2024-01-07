/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'

import { type ProductColumn, columns } from './columns'

interface ProductClientProps {
  data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products (${data.length})`}
                    description="Create new, update, or archive any of your bakery items here."
                />
                <Button
                    onClick={() => { router.push(`/${params.storeId}/products/new`) }
                    }
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Products" />
            <Separator />
            <ApiList entityName="products" entityIdName="productId" />
        </>
  )
}
