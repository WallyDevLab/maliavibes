import { useState, useEffect, FormEvent } from 'react';
import { Calendar, ShoppingBag, Mail, Package, Users, ShieldCheck, Plus, Trash2, Check, RefreshCw, BarChart3, TrendingUp, Info } from 'lucide-react';
import { TourDate, Product, ContactMessage, Order } from '../types';

interface AdminProps {
  tourDates: TourDate[];
  setTourDates: (dates: TourDate[]) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
}

type AdminTab = 'metrics' | 'shows' | 'shop' | 'messages' | 'orders';

export default function Admin({
  tourDates,
  setTourDates,
  products,
  setProducts
}: AdminProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('metrics');
  const [apiMessages, setApiMessages] = useState<ContactMessage[]>([]);
  const [apiOrders, setApiOrders] = useState<Order[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // New Show Form States
  const [showDate, setShowDate] = useState('');
  const [showVenue, setShowVenue] = useState('');
  const [showCity, setShowCity] = useState('');
  const [showCountry, setShowCountry] = useState('USA');
  const [showStatus, setShowStatus] = useState<'available' | 'low-stock' | 'sold-out'>('available');

  // New Product Form States
  const [prodName, setProdName] = useState('');
  const [prodCat, setProdCat] = useState<'merch' | 'vinyl' | 'cd' | 'digital' | 'collectible'>('merch');
  const [prodPrice, setProdPrice] = useState('25.00');
  const [prodStock, setProdStock] = useState('50');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80');

  const fetchServerData = async () => {
    setIsRefreshing(true);
    try {
      const msgRes = await fetch('/api/admin/messages');
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setApiMessages(msgData);
      }

      const ordRes = await fetch('/api/admin/orders');
      if (ordRes.ok) {
        const ordData = await ordRes.json();
        setApiOrders(ordData);
      }
    } catch (err) {
      console.error("Failed to load server admin data:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchServerData();
  }, [activeTab]);

  const handleAddShowSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!showDate || !showVenue || !showCity) return;

    const newShow: TourDate = {
      id: `tour-${Date.now()}`,
      date: showDate,
      venue: showVenue,
      city: showCity,
      country: showCountry,
      ticketStatus: showStatus,
      ticketUrl: '#tickets'
    };

    setTourDates([newShow, ...tourDates]);
    setShowVenue('');
    setShowCity('');
    setShowDate('');
  };

  const handleDeleteShow = (id: string) => {
    setTourDates(tourDates.filter(t => t.id !== id));
  };

  const handleAddProductSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice || !prodDesc) return;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: prodName,
      category: prodCat,
      price: parseFloat(prodPrice) || 0,
      description: prodDesc,
      imageUrl: prodImage,
      stock: parseInt(prodStock) || 0,
      sizes: prodCat === 'merch' ? ['S', 'M', 'L', 'XL'] : undefined
    };

    setProducts([newProduct, ...products]);
    setProdName('');
    setProdDesc('');
    setProdPrice('25.00');
    setProdStock('50');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleMarkMessageRead = async (id: string, status: 'read' | 'replied') => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchServerData();
      }
    } catch (err) {
      console.error("Error updating message status:", err);
    }
  };

  const handleUpdateOrderStatus = async (id: string, status: 'shipped' | 'delivered' | 'cancelled') => {
    try {
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchServerData();
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const totalRevenue = apiOrders.reduce((sum, ord) => sum + ord.total, 0);
  const unreadMessagesCount = apiMessages.filter(m => m.status === 'unread').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-10 animate-fade-in" id="admin-dashboard-section">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-earth-moss-light/35 pb-6 bg-earth-moss-dark/40 p-6 rounded-lg border">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="h-8 w-8 text-earth-gold" />
          <div>
            <h2 className="font-serif text-2xl font-bold text-earth-linen uppercase tracking-wider">Artist Dashboard</h2>
            <p className="text-xs font-mono text-earth-gold tracking-widest uppercase mt-0.5">ADMIN SECURE ACCESS PORTAL</p>
          </div>
        </div>

        <button
          onClick={fetchServerData}
          disabled={isRefreshing}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-earth-moss border border-earth-moss-light hover:border-earth-gold text-earth-linen hover:text-earth-gold text-xs font-semibold uppercase tracking-widest rounded transition-all font-mono"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh Logs'}</span>
        </button>
      </div>

      {/* Admin Subtabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-earth-moss-light/20 pb-4">
        {[
          { id: 'metrics', label: 'Overview', icon: BarChart3 },
          { id: 'shows', label: 'Tour Dates', icon: Calendar },
          { id: 'shop', label: 'Shop Inventory', icon: Package },
          { id: 'messages', label: `Fan Messages (${unreadMessagesCount})`, icon: Mail },
          { id: 'orders', label: `Store Orders (${apiOrders.length})`, icon: ShoppingBag }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest rounded border transition-all ${
                activeTab === tab.id
                  ? 'bg-earth-gold text-earth-moss-dark border-earth-gold font-bold shadow shadow-earth-moss-dark'
                  : 'bg-earth-moss-dark/40 border-earth-moss-light/50 text-earth-linen-dark hover:text-earth-linen hover:border-earth-linen-dark'
              }`}
              id={`admin-tab-btn-${tab.id}`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. METRICS OVERVIEW */}
      {activeTab === 'metrics' && (
        <div className="space-y-8 animate-fade-in">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-earth-moss-dark/70 border border-earth-moss-light/45 p-6 rounded-lg space-y-2 relative">
              <span className="text-[10px] font-mono tracking-widest uppercase text-earth-linen-dark block">Gross Sales</span>
              <p className="font-serif text-3xl font-bold text-earth-gold">${totalRevenue.toFixed(2)}</p>
              <div className="flex items-center space-x-1.5 text-xs text-green-500 font-mono pt-1">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Simulated active</span>
              </div>
            </div>

            <div className="bg-earth-moss-dark/70 border border-earth-moss-light/45 p-6 rounded-lg space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-earth-linen-dark block">Total Store Orders</span>
              <p className="font-serif text-3xl font-bold text-earth-linen">{apiOrders.length}</p>
              <span className="block text-[10px] font-mono text-earth-linen-dark">Processed from Cart checkout</span>
            </div>

            <div className="bg-earth-moss-dark/70 border border-earth-moss-light/45 p-6 rounded-lg space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-earth-linen-dark block">Unread Fan Messages</span>
              <p className="font-serif text-3xl font-bold text-earth-terracotta">{unreadMessagesCount}</p>
              <span className="block text-[10px] font-mono text-earth-linen-dark">From Booking, Press & Fans</span>
            </div>

            <div className="bg-earth-moss-dark/70 border border-earth-moss-light/45 p-6 rounded-lg space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-earth-linen-dark block">Active Performances</span>
              <p className="font-serif text-3xl font-bold text-earth-linen">{tourDates.filter(t => !t.isPast).length}</p>
              <span className="block text-[10px] font-mono text-earth-linen-dark">Scheduled on upcoming Tour list</span>
            </div>
          </div>

          <div className="bg-earth-moss-dark/60 border border-earth-moss-light/40 rounded-lg p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-earth-linen uppercase tracking-wider flex items-center gap-2">
              <Info className="h-4.5 w-4.5 text-earth-gold" />
              <span>Interactive Administrator Mode Guide</span>
            </h3>
            <p className="text-xs text-earth-linen-dark leading-relaxed">
              This dashboard provides complete live control over MALIA's official website contents. 
              You can instantly add or remove tour performances, restock products, view e-commerce checkouts submitted via the Shopping bag drawer, 
              and review/reply to booking requests sent from the Contact form. Any changes made here are persistently stored locally so you can preview the flow instantly.
            </p>
          </div>
        </div>
      )}

      {/* 2. MANAGE SHOWS */}
      {activeTab === 'shows' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          {/* Left Form */}
          <form onSubmit={handleAddShowSubmit} className="lg:col-span-5 bg-earth-moss-dark/60 border border-earth-moss-light/40 rounded-lg p-6 space-y-4">
            <h3 className="font-serif text-base font-bold text-earth-linen uppercase tracking-wider pb-2 border-b border-earth-moss-light/20 flex items-center gap-2">
              <Plus className="h-4.5 w-4.5 text-earth-gold" />
              <span>Add Performance</span>
            </h3>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Show Date</label>
              <input
                required
                type="date"
                value={showDate}
                onChange={(e) => setShowDate(e.target.value)}
                className="w-full p-2.5 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-xs md:text-sm text-earth-linen focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Venue Name</label>
              <input
                required
                type="text"
                placeholder="E.g., Blue Note Jazz Club"
                value={showVenue}
                onChange={(e) => setShowVenue(e.target.value)}
                className="w-full p-2.5 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-xs md:text-sm text-earth-linen focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">City</label>
                <input
                  required
                  type="text"
                  placeholder="New York"
                  value={showCity}
                  onChange={(e) => setShowCity(e.target.value)}
                  className="w-full p-2.5 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-xs md:text-sm text-earth-linen focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Country</label>
                <input
                  required
                  type="text"
                  value={showCountry}
                  onChange={(e) => setShowCountry(e.target.value)}
                  className="w-full p-2.5 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-xs md:text-sm text-earth-linen focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Ticket Status</label>
              <select
                value={showStatus}
                onChange={(e) => setShowStatus(e.target.value as any)}
                className="w-full p-2.5 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-xs md:text-sm text-earth-linen focus:outline-none"
              >
                <option value="available">Tickets Available</option>
                <option value="low-stock">Selling Out / Low Stock</option>
                <option value="sold-out">Sold Out</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-earth-terracotta hover:bg-earth-terracotta-light text-earth-linen font-mono text-xs uppercase tracking-widest font-bold rounded transition-colors"
            >
              Add Tour Date
            </button>
          </form>

          {/* Right List */}
          <div className="lg:col-span-7 bg-earth-moss-dark/60 border border-earth-moss-light/40 rounded-lg p-6 space-y-4">
            <h3 className="font-serif text-base font-bold text-earth-linen uppercase tracking-wider">Scheduled Tour Dates ({tourDates.length})</h3>
            <div className="divide-y divide-earth-moss-light/25 max-h-[450px] overflow-y-auto pr-2">
              {tourDates.map((show) => (
                <div key={show.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-serif text-sm font-bold text-earth-linen">{show.venue}</p>
                    <p className="text-xs font-mono text-earth-linen-dark">{show.city}, {show.country} • {show.date}</p>
                    <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${
                      show.ticketStatus === 'available' ? 'text-green-500' : show.ticketStatus === 'low-stock' ? 'text-earth-gold' : 'text-earth-terracotta'
                    }`}>
                      {show.ticketStatus}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteShow(show.id)}
                    className="p-1.5 text-earth-linen-dark hover:text-earth-terracotta transition-colors border border-earth-moss-light rounded bg-earth-moss hover:bg-earth-moss-light"
                    title="Delete show"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. MANAGE SHOP */}
      {activeTab === 'shop' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          {/* Left Form */}
          <form onSubmit={handleAddProductSubmit} className="lg:col-span-5 bg-earth-moss-dark/60 border border-earth-moss-light/40 rounded-lg p-6 space-y-4">
            <h3 className="font-serif text-base font-bold text-earth-linen uppercase tracking-wider pb-2 border-b border-earth-moss-light/20 flex items-center gap-2">
              <Plus className="h-4.5 w-4.5 text-earth-gold" />
              <span>Add Store Product</span>
            </h3>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Product Name</label>
              <input
                required
                type="text"
                placeholder="If I'm Being Honest Vinyl..."
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                className="w-full p-2.5 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-xs md:text-sm text-earth-linen focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Price ($)</label>
                <input
                  required
                  type="text"
                  placeholder="24.99"
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  className="w-full p-2.5 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-xs md:text-sm text-earth-linen focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Stock Units</label>
                <input
                  required
                  type="number"
                  placeholder="50"
                  value={prodStock}
                  onChange={(e) => setProdStock(e.target.value)}
                  className="w-full p-2.5 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-xs md:text-sm text-earth-linen focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Category</label>
              <select
                value={prodCat}
                onChange={(e) => setProdCat(e.target.value as any)}
                className="w-full p-2.5 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-xs md:text-sm text-earth-linen focus:outline-none"
              >
                <option value="vinyl">Vinyl Records</option>
                <option value="merch">Apparel / Merchandise</option>
                <option value="cd">CDs / Music</option>
                <option value="collectible">Signed Collectible</option>
                <option value="digital">Digital Music</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Cover Image URL</label>
              <input
                required
                type="text"
                value={prodImage}
                onChange={(e) => setProdImage(e.target.value)}
                className="w-full p-2.5 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-xs md:text-sm text-earth-linen focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Description</label>
              <textarea
                required
                rows={3}
                placeholder="Describe product materials, specifications, dedications..."
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}
                className="w-full p-2.5 bg-earth-moss-dark border border-earth-moss-light focus:border-earth-gold rounded font-sans text-xs md:text-sm text-earth-linen focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-earth-terracotta hover:bg-earth-terracotta-light text-earth-linen font-mono text-xs uppercase tracking-widest font-bold rounded transition-colors"
            >
              Add Product
            </button>
          </form>

          {/* Right Inventory list */}
          <div className="lg:col-span-7 bg-earth-moss-dark/60 border border-earth-moss-light/40 rounded-lg p-6 space-y-4">
            <h3 className="font-serif text-base font-bold text-earth-linen uppercase tracking-wider">Active Inventory ({products.length})</h3>
            <div className="divide-y divide-earth-moss-light/25 max-h-[550px] overflow-y-auto pr-2">
              {products.map((p) => (
                <div key={p.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <img src={p.imageUrl} alt="" className="w-10 h-10 object-cover rounded border border-earth-moss-light" />
                    <div>
                      <p className="font-serif text-sm font-semibold text-earth-linen line-clamp-1">{p.name}</p>
                      <p className="text-[10px] font-mono text-earth-linen-dark uppercase tracking-wider">
                        {p.category} • ${p.price.toFixed(2)} • Stock: {p.stock} units
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="p-1.5 text-earth-linen-dark hover:text-earth-terracotta transition-colors border border-earth-moss-light rounded bg-earth-moss hover:bg-earth-moss-light"
                    title="Delete product"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. FAN MESSAGES LOGS */}
      {activeTab === 'messages' && (
        <div className="bg-earth-moss-dark/60 border border-earth-moss-light/40 rounded-lg p-6 space-y-6 animate-fade-in">
          <h3 className="font-serif text-lg font-bold text-earth-linen uppercase tracking-wider">Fan Correspondence Inboxes</h3>

          <div className="space-y-4">
            {apiMessages.map((msg) => (
              <div
                key={msg.id}
                className={`border p-5 rounded-lg transition-all ${
                  msg.status === 'unread'
                    ? 'border-earth-terracotta bg-earth-terracotta/5'
                    : 'border-earth-moss-light/40 bg-earth-moss-dark/30'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-earth-moss-light/25">
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-earth-linen">{msg.name}</h4>
                    <p className="text-xs font-mono text-earth-linen-dark">{msg.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-earth-moss border border-earth-moss-light/60 text-[9px] font-mono text-earth-gold uppercase rounded">
                      {msg.subject}
                    </span>
                    <span className="text-[10px] font-mono text-earth-linen-dark">
                      {new Date(msg.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <p className="font-sans text-xs md:text-sm text-earth-linen-dark leading-relaxed py-4 whitespace-pre-line leading-6">
                  "{msg.message}"
                </p>

                {msg.status === 'unread' && (
                  <div className="flex justify-end pt-2 border-t border-earth-moss-light/20">
                    <button
                      onClick={() => handleMarkMessageRead(msg.id, 'read')}
                      className="flex items-center space-x-1.5 px-3 py-1 bg-earth-moss border border-earth-moss-light text-earth-gold hover:text-earth-linen hover:border-earth-linen text-[10px] font-mono uppercase tracking-widest rounded transition-all"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Mark Read</span>
                    </button>
                  </div>
                )}
              </div>
            ))}

            {apiMessages.length === 0 && (
              <div className="text-center py-16 space-y-2">
                <Mail className="h-10 w-10 text-earth-linen-dark mx-auto" />
                <h4 className="font-serif text-base font-bold text-earth-linen">Inboxes Clean</h4>
                <p className="text-xs text-earth-linen-dark">No messages have been submitted through the Contact tab yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. STORE ORDERS LOGS */}
      {activeTab === 'orders' && (
        <div className="bg-earth-moss-dark/60 border border-earth-moss-light/40 rounded-lg p-6 space-y-6 animate-fade-in">
          <h3 className="font-serif text-lg font-bold text-earth-linen uppercase tracking-wider">E-Commerce Checkout Logs</h3>

          <div className="space-y-6">
            {apiOrders.map((ord) => (
              <div
                key={ord.id}
                className="border border-earth-moss-light/40 bg-earth-moss-dark/20 p-5 rounded-lg space-y-4"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-earth-moss-light/25">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-earth-gold tracking-widest font-bold">Order ID: {ord.id}</span>
                    <h4 className="font-serif text-sm font-semibold text-earth-linen">Customer: {ord.customerName}</h4>
                    <p className="text-xs font-mono text-earth-linen-dark">{ord.customerEmail}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] font-mono text-earth-linen-dark uppercase">Amount Paid</p>
                      <p className="font-mono text-base font-bold text-earth-linen">${ord.total.toFixed(2)}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-mono uppercase font-bold tracking-widest rounded border ${
                      ord.status === 'pending' ? 'bg-earth-terracotta/10 border-earth-terracotta text-earth-terracotta' : 'bg-green-500/10 border-green-500 text-green-500'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-earth-linen-dark">
                  <div>
                    <p className="font-mono text-[10px] uppercase text-earth-gold">Shipping Destination</p>
                    <p className="mt-1 font-semibold text-earth-linen">{ord.shippingAddress}</p>
                    <p>{ord.city}, {ord.postalCode} • {ord.country}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase text-earth-gold">Ordered Items</p>
                    <ul className="mt-1 space-y-1">
                      {ord.items.map((item: any, idx: number) => (
                        <li key={idx} className="text-earth-linen flex justify-between gap-4 font-serif">
                          <span>
                            {item.quantity}x {item.name} {item.size ? `(${item.size})` : ''}
                          </span>
                          <span className="font-mono font-normal text-xs text-earth-linen-dark">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Shipping Actions */}
                {ord.status === 'pending' && (
                  <div className="flex justify-end gap-2 border-t border-earth-moss-light/20 pt-3">
                    <button
                      onClick={() => handleUpdateOrderStatus(ord.id, 'shipped')}
                      className="px-3.5 py-1.5 bg-earth-terracotta hover:bg-earth-terracotta-light text-earth-linen text-[10px] font-mono uppercase tracking-widest rounded transition-all font-bold"
                    >
                      Mark Shipped
                    </button>
                  </div>
                )}
              </div>
            ))}

            {apiOrders.length === 0 && (
              <div className="text-center py-16 space-y-2">
                <ShoppingBag className="h-10 w-10 text-earth-linen-dark mx-auto" />
                <h4 className="font-serif text-base font-bold text-earth-linen">No Orders Yet</h4>
                <p className="text-xs text-earth-linen-dark">When customers complete purchases in the Shop tab, orders will manifest here.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
