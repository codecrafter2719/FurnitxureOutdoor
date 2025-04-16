'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Order {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  payment_method: string;
  total_amount: number;
  status: string;
  created_at: string;
  order_items: Array<{
    product_name: string;
    price: number;
    quantity: number;
    total: number;
  }>;
}

export default function Dashboard() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR'
    }).format(amount);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedOrder) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', selectedOrder.id);

      if (error) throw error;

      // Update local state
      setOrders(orders.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, status: newStatus }
          : order
      ));
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const startEditing = (field: string, value: string) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleEdit = async (field: string) => {
    if (!selectedOrder) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ [field]: editValue })
        .eq('id', selectedOrder.id);

      if (error) throw error;

      // Update local state
      setOrders(orders.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, [field]: editValue }
          : order
      ));
      setSelectedOrder({ ...selectedOrder, [field]: editValue });
      setEditingField(null);
    } catch (error) {
      console.error('Error updating order:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const renderEditableField = (field: string, label: string, value: string) => {
    if (editingField === field) {
      return (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 px-2 py-1 border rounded-md bg-white text-gray-900 border-gray-300"
            autoFocus
          />
          <button
            onClick={() => handleEdit(field)}
            disabled={isUpdating}
            className="p-1 text-green-600 hover:text-green-800"
          >
            <CheckIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setEditingField(null)}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between group">
        <span className="text-gray-900">{value || 'N/A'}</span>
        <button
          onClick={() => startEditing(field, value)}
          className="p-1 text-gray-600 hover:text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.firstName}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stats Cards */}
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-900 truncate">Total Orders</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{orders.length}</dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-900 truncate">Total Revenue</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {formatCurrency(orders.reduce((sum, order) => sum + order.total_amount, 0))}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-900 truncate">Pending Orders</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {orders.filter(order => order.status === 'pending').length}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-900 truncate">Completed Orders</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {orders.filter(order => order.status === 'completed').length}
            </dd>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
        </div>
        <div className="border-t border-gray-200">
          {loading ? (
            <div className="px-4 py-5 sm:p-6 text-center">
              <p className="text-sm text-gray-900">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="px-4 py-5 sm:p-6 text-center">
              <p className="text-sm text-gray-900">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id.slice(0, 8)}...</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customer_name}</div>
                        <div className="text-sm text-gray-900">{order.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(order.total_amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-900 border border-green-200'
                            : 'bg-yellow-100 text-yellow-900 border border-yellow-200'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.payment_method.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-[#B8860B] hover:text-[#966F09] font-medium"
                        >
                          View
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

      {/* Order Details Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl w-full bg-white rounded-lg shadow-xl border border-gray-200">
            {selectedOrder && (
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <Dialog.Title className="text-xl font-semibold text-gray-900">
                    Order Details
                  </Dialog.Title>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="font-medium text-gray-900">Name:</span>
                        {renderEditableField('customer_name', 'Name', selectedOrder.customer_name)}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Phone:</span>
                        {renderEditableField('phone', 'Phone', selectedOrder.phone)}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Address:</span>
                        {renderEditableField('address', 'Address', selectedOrder.address)}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">City:</span>
                        {renderEditableField('city', 'City', selectedOrder.city)}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Notes:</span>
                        {renderEditableField('notes', 'Notes', selectedOrder.notes || '')}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Order Information</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="font-medium text-gray-900">Order ID:</span>
                        <div className="text-gray-900 font-medium">{selectedOrder.id}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Date:</span>
                        <div className="text-gray-900">{formatDate(selectedOrder.created_at)}</div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">Status:</span>
                        <select
                          value={selectedOrder.status}
                          onChange={(e) => handleStatusChange(e.target.value)}
                          disabled={isUpdating}
                          className={`ml-2 px-2 py-1 rounded-md border font-medium ${
                            selectedOrder.status === 'completed' 
                              ? 'bg-green-100 text-green-900 border-green-200'
                              : 'bg-yellow-100 text-yellow-900 border-yellow-200'
                          }`}
                        >
                          <option value="pending" className="bg-white text-gray-900 font-medium">Pending</option>
                          <option value="completed" className="bg-white text-gray-900 font-medium">Completed</option>
                        </select>
                        {isUpdating && (
                          <span className="ml-2 text-sm text-gray-900 font-medium">Updating...</span>
                        )}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Payment Method:</span>
                        <div className="text-gray-900 font-medium">{selectedOrder.payment_method.toUpperCase()}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Quantity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.order_items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.product_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.price)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">Total Amount:</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(selectedOrder.total_amount)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
