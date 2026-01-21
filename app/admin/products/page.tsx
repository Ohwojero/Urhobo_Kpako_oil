'use client'

import { useState } from 'react'
import { Edit, Trash2, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useProducts } from '@/context/product-context'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Loading from './loading'

type ProductFormData = {
  name: string
  description: string
  price: string
  stock: string
  status: 'Active'
}

export default function AdminProducts() {
  const { products, loading, error, addProduct, deleteProduct } = useProducts()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    stock: '',
    status: 'Active',
  })
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddProduct = async () => {
    if (formData.name && formData.price && formData.stock) {
      try {
        setIsSubmitting(true)
        await addProduct({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          status: formData.status,
          rating: 5,
          reviews: 0,
          image: '🫒',
          inStock: parseInt(formData.stock) > 0,
        })
        setFormData({ name: '', description: '', price: '', stock: '', status: 'Active' })
        setShowForm(false)
        setSuccessMessage('Product added successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      } catch (err) {
        console.error('Failed to add product:', err)
        setSuccessMessage('Failed to add product. Please try again.')
        setTimeout(() => setSuccessMessage(''), 3000)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id)
      setSuccessMessage('Product deleted successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      console.error('Failed to delete product:', err)
      setSuccessMessage('Failed to delete product. Please try again.')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your red palm oil product catalog</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          Error: {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Add Product Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-bold">Add New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
            />
            <input
              type="number"
              placeholder="Price (₦)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
            />
            <input
              type="number"
              placeholder="Stock Quantity"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' })}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            >
              <option value="Active">Active</option>
            </select>
            <textarea
              placeholder="Product Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground md:col-span-2"
              rows={3}
            />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleAddProduct}
              className="bg-primary hover:bg-primary/90"
            >
              Add Product
            </Button>
            <Button
              onClick={() => setShowForm(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
        />
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Product Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Stock</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-foreground">{product.name}</td>
                    <td className="py-4 px-6 text-foreground">₦{product.price.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <span className={product.stock > 0 ? 'text-green-600' : 'text-destructive'}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 flex gap-2">
                      <button className="p-2 hover:bg-secondary rounded transition-colors text-primary">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 hover:bg-secondary rounded transition-colors text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export const unstable_settings = {
  suspense: true,
}

// loading.tsx
// export default function Loading() {
//   return null
// }
