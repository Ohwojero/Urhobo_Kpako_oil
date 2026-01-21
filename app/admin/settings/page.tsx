'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    businessName: 'Palma - Premium Nigerian Red Palm Oil',
    email: 'info@palma.ng',
    phone: '+234 (0) 800 PALMA OIL',
    address: 'Lagos, Nigeria',
    shippingCost: '1500',
    currency: 'NGN',
    taxRate: '0',
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Settings saved successfully!')
    setIsSaving(false)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your store configuration</p>
      </div>

      {/* Business Information */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Business Information</h2>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={settings.businessName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={settings.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={settings.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
          />
        </div>
      </div>

      {/* Store Settings */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Store Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Shipping Cost (₦)</label>
            <input
              type="number"
              name="shippingCost"
              value={settings.shippingCost}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Currency</label>
            <select
              name="currency"
              value={settings.currency}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            >
              <option value="NGN">Nigerian Naira (₦)</option>
              <option value="USD">US Dollar ($)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tax Rate (%)</label>
            <input
              type="number"
              name="taxRate"
              value={settings.taxRate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Payment Methods</h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4"
            />
            <div>
              <p className="font-semibold text-foreground">Paystack</p>
              <p className="text-sm text-muted-foreground">Enable online card payments via Paystack</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4"
            />
            <div>
              <p className="font-semibold text-foreground">Pay on Delivery</p>
              <p className="text-sm text-muted-foreground">Allow customers to pay when order arrives</p>
            </div>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}
