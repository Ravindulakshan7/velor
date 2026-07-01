import React, { useState } from 'react';
import { useStore } from '../store';
import { formatPrice } from '../lib/utils';
import { Product } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

const mockSalesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 7000 },
];

export default function Admin() {
  const { products, updateProductVariantPrice, updateProductVariantStock } = useStore();
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'customers' | 'analytics'>('analytics');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0]);

  return (
    <div className="flex-1 overflow-y-auto p-10 md:p-16 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-serif italic tracking-tight mb-2 text-[var(--color-velor-accent)]">Admin Portal</h1>
          <p className="text-[13px] text-[var(--color-velor-text-light)]">Manage your luxury boutique operations.</p>
        </div>
        
        <div className="flex gap-4 border-b border-[var(--color-velor-border)]">
          {['analytics', 'inventory', 'orders', 'customers'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`text-[10px] uppercase tracking-[0.2em] font-medium pb-2 transition-colors relative top-px ${
                activeTab === tab 
                  ? 'text-[var(--color-velor-text)] border-b border-[var(--color-velor-text)]' 
                  : 'text-[var(--color-velor-text-muted)] hover:text-[var(--color-velor-text)] border-b border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'analytics' && (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-[var(--color-velor-border)] bg-white">
              <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-velor-text-muted)] mb-2">Total Revenue</h3>
              <p className="text-3xl font-serif italic">$29,500</p>
              <p className="text-[10px] text-green-600 mt-2">+14% vs last month</p>
            </div>
            <div className="p-8 border border-[var(--color-velor-border)] bg-white">
              <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-velor-text-muted)] mb-2">Orders</h3>
              <p className="text-3xl font-serif italic">142</p>
              <p className="text-[10px] text-green-600 mt-2">+5% vs last month</p>
            </div>
            <div className="p-8 border border-[var(--color-velor-border)] bg-white">
              <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-velor-text-muted)] mb-2">Active Customers</h3>
              <p className="text-3xl font-serif italic">89</p>
              <p className="text-[10px] text-[var(--color-velor-text-muted)] mt-2">Consistent</p>
            </div>
          </div>

          <div className="border border-[var(--color-velor-border)] bg-white p-8">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-8 text-[var(--color-velor-text-muted)]">Revenue Overview</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockSalesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E1D8" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} tickFormatter={(value) => `$${value}`} />
                  <RechartsTooltip cursor={{ fill: '#F5F2ED' }} contentStyle={{ borderRadius: 0, border: '1px solid #E5E1D8', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="sales" stroke="#1A1A1A" strokeWidth={2} dot={{ r: 4, fill: '#1A1A1A' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product List */}
          <div className="w-full lg:w-1/3">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--color-velor-text-muted)]">Select Product</h3>
              <button className="text-[10px] uppercase tracking-widest bg-[var(--color-velor-text)] text-white px-3 py-1 hover:bg-[#333]">Add New</button>
            </div>
            <div className="space-y-4">
              {products.map(product => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`w-full text-left p-4 border transition-colors flex items-center gap-4 ${
                    selectedProduct?.id === product.id 
                      ? 'border-[var(--color-velor-text)] bg-[var(--color-velor-bg-alt)]' 
                      : 'border-[var(--color-velor-border)] hover:border-[var(--color-velor-text-muted)]'
                  }`}
                >
                  <img referrerPolicy="no-referrer" src={product.featuredImage} alt="" className="w-12 h-12 object-cover border border-[var(--color-velor-border)] shrink-0" />
                  <div>
                    <div className="font-serif italic text-sm">{product.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--color-velor-text-muted)]">
                      {product.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Variant Editor */}
          <div className="flex-1">
            {selectedProduct ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--color-velor-text-muted)]">Edit Variants: {selectedProduct.name}</h3>
                  <div className="flex gap-2">
                    <button className="text-[10px] uppercase tracking-widest border border-[var(--color-velor-border)] px-4 py-1 hover:bg-[var(--color-velor-bg-alt)]">Add Variant</button>
                    <button className="text-[10px] uppercase tracking-widest border border-red-200 text-red-500 px-4 py-1 hover:bg-red-50">Delete Product</button>
                  </div>
                </div>
                
                <div className="bg-white border border-[var(--color-velor-border)] overflow-hidden">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-[var(--color-velor-bg-alt)] border-b border-[var(--color-velor-border)] text-[10px] uppercase tracking-widest text-[var(--color-velor-text-muted)]">
                      <tr>
                        <th className="p-4 font-normal">Variant</th>
                        <th className="p-4 font-normal">Price ($)</th>
                        <th className="p-4 font-normal">Stock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-velor-border)]">
                      {selectedProduct.variants.map((variant) => (
                        <tr key={variant.id}>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img referrerPolicy="no-referrer" src={variant.image} className="w-10 h-10 object-cover border border-[var(--color-velor-border)] shrink-0" />
                              <div>
                                <span className="font-medium block">{variant.color}</span>
                                <span className="text-[11px] text-[var(--color-velor-text-muted)]">{variant.size}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <input
                              type="number"
                              value={variant.price}
                              onChange={(e) => updateProductVariantPrice(selectedProduct.id, variant.id, Number(e.target.value))}
                              className="w-24 p-2 border border-[var(--color-velor-border)] bg-transparent text-sm focus:outline-none focus:border-[var(--color-velor-text)]"
                            />
                          </td>
                          <td className="p-4">
                            <input
                              type="number"
                              value={variant.stock}
                              onChange={(e) => updateProductVariantStock(selectedProduct.id, variant.id, Number(e.target.value))}
                              className="w-20 p-2 border border-[var(--color-velor-border)] bg-transparent text-sm focus:outline-none focus:border-[var(--color-velor-text)]"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-[var(--color-velor-text-muted)] border border-dashed border-[var(--color-velor-border)] p-12 text-sm">
                Select a product to edit its variants.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-6 text-[var(--color-velor-text-muted)]">Recent Orders</h3>
          <div className="bg-white border border-[var(--color-velor-border)] overflow-x-auto">
            <table className="w-full text-left text-[13px] whitespace-nowrap">
              <thead className="bg-[var(--color-velor-bg-alt)] border-b border-[var(--color-velor-border)] text-[10px] uppercase tracking-widest text-[var(--color-velor-text-muted)]">
                <tr>
                  <th className="p-4 font-normal">Order ID</th>
                  <th className="p-4 font-normal">Date</th>
                  <th className="p-4 font-normal">Customer</th>
                  <th className="p-4 font-normal">Total</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal">CJ Drop</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-velor-border)]">
                {/* Mock Order Data */}
                <tr>
                  <td className="p-4 font-medium">#ORD-9923</td>
                  <td className="p-4 text-[var(--color-velor-text-muted)]">Today, 10:42 AM</td>
                  <td className="p-4">elara.v@example.com</td>
                  <td className="p-4">{formatPrice(1250)}</td>
                  <td className="p-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-[10px] uppercase tracking-widest">Processing</span>
                  </td>
                  <td className="p-4">
                    <button className="text-[10px] uppercase tracking-widest border border-[var(--color-velor-border)] px-3 py-1 hover:bg-[var(--color-velor-bg-alt)]">Sync</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">#ORD-9922</td>
                  <td className="p-4 text-[var(--color-velor-text-muted)]">Yesterday</td>
                  <td className="p-4">james.c@example.com</td>
                  <td className="p-4">{formatPrice(450)}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 text-[10px] uppercase tracking-widest">Shipped</span>
                  </td>
                  <td className="p-4 text-[10px] text-green-600">Synced</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'customers' && (
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-6 text-[var(--color-velor-text-muted)]">Customer Directory</h3>
          <div className="bg-white border border-[var(--color-velor-border)] overflow-x-auto">
            <table className="w-full text-left text-[13px] whitespace-nowrap">
              <thead className="bg-[var(--color-velor-bg-alt)] border-b border-[var(--color-velor-border)] text-[10px] uppercase tracking-widest text-[var(--color-velor-text-muted)]">
                <tr>
                  <th className="p-4 font-normal">Name</th>
                  <th className="p-4 font-normal">Email</th>
                  <th className="p-4 font-normal">Total Spent</th>
                  <th className="p-4 font-normal">Orders</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-velor-border)]">
                <tr>
                  <td className="p-4 font-medium">Elara Vance</td>
                  <td className="p-4 text-[var(--color-velor-text-muted)]">elara.v@example.com</td>
                  <td className="p-4">{formatPrice(2500)}</td>
                  <td className="p-4">2</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">James Chen</td>
                  <td className="p-4 text-[var(--color-velor-text-muted)]">james.c@example.com</td>
                  <td className="p-4">{formatPrice(450)}</td>
                  <td className="p-4">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
