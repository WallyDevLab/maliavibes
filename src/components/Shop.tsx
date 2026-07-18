import { useState, FormEvent } from 'react';
import { ShoppingCart, Trash2, X, Plus, Minus, CreditCard, ChevronRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Product, CartItem } from '../types';

interface ShopProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product, size?: string) => void;
  onUpdateCartQty: (productId: string, qty: number, size?: string) => void;
  onRemoveFromCart: (productId: string, size?: string) => void;
  onClearCart: () => void;
}

type ShopCategory = 'all' | 'vinyl' | 'merch' | 'cd' | 'collectible' | 'digital';

export default function Shop({
  products,
  cart,
  onAddToCart,
  onUpdateCartQty,
  onRemoveFromCart,
  onClearCart
}: ShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory>('all');
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');

  // Checkout shipping fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('USA');
  const [cardNo, setCardNo] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [orderSuccessId, setOrderSuccessId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories: { value: ShopCategory; label: string }[] = [
    { value: 'all', label: 'All Items' },
    { value: 'vinyl', label: 'Vinyl Records' },
    { value: 'merch', label: 'Merchandise' },
    { value: 'cd', label: 'CDs & Audio' },
    { value: 'collectible', label: 'Collectibles' },
    { value: 'digital', label: 'Digital Music' }
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    const size = product.sizes ? selectedSize : undefined;
    onAddToCart(product, size);
    setActiveProductDetail(null);
    setIsCartOpen(true);
  };

  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address) return;

    setIsSubmitting(true);
    try {
      const orderData = {
        customerName: fullName,
        customerEmail: email,
        shippingAddress: address,
        city,
        postalCode: zip,
        country,
        items: cart.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          size: item.selectedSize
        })),
        total: cartTotal
      };

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const resData = await response.json();
      if (resData.success) {
        setOrderSuccessId(resData.orderId);
        setCheckoutStep('success');
        onClearCart();
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-12 animate-fade-in" id="shop-section">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-earth-gold">OFFICIAL ATELIER</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-earth-linen uppercase tracking-wider">Merchandise & Vinyl</h2>
        <div className="w-12 h-[1.5px] bg-earth-terracotta mx-auto" />
        <p className="max-w-xl mx-auto font-serif italic text-earth-linen-dark text-xs md:text-sm leading-relaxed opacity-80">
          "Earthy, physical tokens of connection. Heavyweight vinyl jackets, soft organic wearables, and signed keepsakes."
        </p>
      </div>

      {/* Category Toggles & Floating Cart Button */}
      <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-earth-linen/10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-none border cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-earth-terracotta text-earth-moss-dark border-earth-terracotta font-bold'
                  : 'bg-[#161412] border-earth-linen/10 text-earth-linen-dark hover:text-earth-linen hover:border-earth-terracotta'
              }`}
              id={`shop-category-${cat.value}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            setCheckoutStep('cart');
            setIsCartOpen(true);
          }}
          className="flex items-center space-x-2 px-5 py-2.5 bg-[#1A1816] border border-earth-linen/10 hover:border-earth-terracotta text-earth-terracotta hover:text-earth-linen font-mono text-[10px] font-bold uppercase tracking-widest rounded-none transition-all duration-300 cursor-pointer"
          id="shop-floating-cart"
        >
          <ShoppingCart className="h-4 w-4 text-earth-terracotta" />
          <span>My Bag ({cart.length})</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-[#161412] border border-earth-linen/10 rounded-none overflow-hidden transition-all duration-300 hover:border-earth-terracotta flex flex-col justify-between shadow-xl"
            id={`product-card-${product.id}`}
          >
            {/* Image Frame */}
            <div
              onClick={() => {
                setSelectedSize(product.sizes ? product.sizes[0] : 'M');
                setActiveProductDetail(product);
              }}
              className="relative aspect-square overflow-hidden bg-[#1A1816] border-b border-earth-linen/10 cursor-pointer"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {product.stock <= 5 && product.stock > 0 && (
                <span className="absolute top-3 left-3 bg-earth-terracotta text-earth-moss-dark text-[10px] font-mono font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-none shadow-md">
                  Low Stock
                </span>
              )}
              {product.stock === 0 && (
                <span className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center font-serif text-lg font-bold text-earth-linen-dark uppercase tracking-widest">
                  Sold Out
                </span>
              )}
            </div>

            {/* Info Frame */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-earth-gold uppercase tracking-[0.2em]">{product.category}</span>
                <h3 className="font-serif text-base font-bold text-earth-linen group-hover:text-earth-gold transition-colors line-clamp-1 leading-snug">
                  {product.name}
                </h3>
                <p className="font-sans text-xs text-earth-linen-dark line-clamp-2 leading-relaxed opacity-85">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-earth-linen/10">
                <span className="font-mono text-base font-bold text-earth-linen">${product.price.toFixed(2)}</span>
                <button
                  onClick={() => {
                    if (product.stock > 0) {
                      setSelectedSize(product.sizes ? product.sizes[0] : 'M');
                      setActiveProductDetail(product);
                    }
                  }}
                  disabled={product.stock === 0}
                  className={`py-2 px-5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    product.stock > 0
                      ? 'bg-earth-terracotta hover:bg-[#D9A288] text-earth-moss-dark'
                      : 'bg-[#1A1816] border border-earth-linen/10 text-earth-linen-dark cursor-not-allowed'
                  }`}
                  id={`product-btn-action-${product.id}`}
                >
                  {product.sizes ? 'Choose Options' : 'Buy Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {activeProductDetail && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="product-detail-modal">
          <div className="bg-[#161412] border border-earth-linen/10 max-w-4xl w-full rounded-none overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
              {/* Product Visual */}
              <div className="relative aspect-square rounded-none overflow-hidden border border-earth-linen/10 bg-[#1A1816]">
                <img
                  src={activeProductDetail.imageUrl}
                  alt={activeProductDetail.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Product Meta & Cart Form */}
              <div className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-earth-gold tracking-[0.2em]">
                      {activeProductDetail.category}
                    </span>
                    <button
                      onClick={() => setActiveProductDetail(null)}
                      className="text-earth-linen-dark hover:text-earth-linen cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-earth-linen leading-snug">
                    {activeProductDetail.name}
                  </h3>

                  <p className="font-mono text-xl font-bold text-earth-gold">${activeProductDetail.price.toFixed(2)}</p>

                  <p className="font-sans text-sm text-earth-linen-dark leading-relaxed opacity-85">
                    {activeProductDetail.description}
                  </p>

                  {/* Size selector if apparel */}
                  {activeProductDetail.sizes && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-earth-gold block">Select Size</span>
                      <div className="flex gap-2">
                        {activeProductDetail.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-10 h-10 border text-xs font-mono font-bold flex items-center justify-center rounded-none transition-all cursor-pointer ${
                              selectedSize === size
                                ? 'bg-earth-terracotta border-earth-terracotta text-earth-moss-dark'
                                : 'border-earth-linen/10 hover:border-earth-terracotta text-earth-linen-dark hover:text-earth-linen'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-6 border-t border-earth-linen/10">
                  <div className="flex items-center justify-between text-xs text-earth-linen-dark font-mono">
                    <span>Availability</span>
                    <span className={activeProductDetail.stock > 0 ? 'text-green-500 font-bold' : 'text-earth-terracotta font-bold'}>
                      {activeProductDetail.stock > 0 ? `In Stock (${activeProductDetail.stock} left)` : 'Sold Out'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(activeProductDetail)}
                    disabled={activeProductDetail.stock === 0}
                    className={`w-full py-3.5 rounded-none font-sans font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                      activeProductDetail.stock > 0
                        ? 'bg-earth-terracotta hover:bg-[#D9A288] text-earth-moss-dark shadow-md'
                        : 'bg-[#1A1816] border border-earth-linen/10 text-earth-linen-dark cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="h-4.5 w-4.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Bag Drawer / Side Panel */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity" onClick={() => setIsCartOpen(false)} />

          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-[#161412] border-l border-earth-linen/10 shadow-2xl flex flex-col h-full animate-fade-in">
            {/* Header */}
            <div className="p-6 border-b border-earth-linen/10 flex items-center justify-between bg-[#1A1816]">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-earth-terracotta" />
                <h3 className="font-serif text-lg font-bold text-earth-linen uppercase tracking-wider">Your Bag</h3>
                <span className="font-mono text-xs text-earth-gold">({cart.length} items)</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1.5 text-earth-linen-dark hover:text-earth-linen cursor-pointer">
                <X className="h-5.5 w-5.5" />
              </button>
            </div>

            {/* Main view container based on checkout step */}
            {checkoutStep === 'cart' && (
              <div className="flex-1 flex flex-col min-h-0">
                {/* Cart list */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize || 'default'}`}
                      className="flex items-start space-x-4 pb-4 border-b border-earth-linen/10"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-none object-cover border border-earth-linen/10 bg-[#1A1816]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-serif text-sm font-semibold text-earth-linen line-clamp-1">{item.product.name}</h4>
                        <div className="flex items-center gap-3 text-xs font-mono text-earth-linen-dark">
                          <span>${item.product.price.toFixed(2)}</span>
                          {item.selectedSize && (
                            <span className="px-2 py-0.5 bg-earth-terracotta/10 border border-earth-terracotta/20 rounded-none text-earth-gold text-[10px]">
                              Size: {item.selectedSize}
                            </span>
                          )}
                        </div>

                        {/* Qty adjustments */}
                        <div className="flex items-center space-x-3 pt-2">
                          <div className="flex items-center border border-earth-linen/10 rounded-none bg-[#1A1816] p-0.5">
                            <button
                              onClick={() => onUpdateCartQty(item.product.id, item.quantity - 1, item.selectedSize)}
                              className="p-1 text-earth-linen-dark hover:text-earth-linen cursor-pointer"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="px-3 font-mono text-xs text-earth-linen">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateCartQty(item.product.id, item.quantity + 1, item.selectedSize)}
                              className="p-1 text-earth-linen-dark hover:text-earth-linen cursor-pointer"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveFromCart(item.product.id, item.selectedSize)}
                            className="p-1 text-earth-linen-dark hover:text-earth-terracotta transition-colors ml-auto cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {cart.length === 0 && (
                    <div className="text-center py-16 space-y-4">
                      <ShoppingBag className="h-12 w-12 text-earth-linen-dark mx-auto" />
                      <h4 className="font-serif text-lg font-bold text-earth-linen uppercase tracking-wider">Your bag is empty</h4>
                      <p className="text-xs text-earth-linen-dark opacity-80">Explore the shop to discover vinyl, hoodies, and more.</p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="px-5 py-2.5 bg-[#1A1816] border border-earth-linen/10 hover:border-earth-terracotta text-earth-gold font-mono text-xs uppercase tracking-widest rounded-none cursor-pointer"
                      >
                        Keep Browsing
                      </button>
                    </div>
                  )}
                </div>

                {/* Subtotal and checkout cta */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-earth-linen/10 bg-[#1A1816] space-y-4 shadow-xl">
                    <div className="flex justify-between font-serif text-base font-bold text-earth-linen">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] font-mono text-earth-linen-dark uppercase tracking-wider">
                      Shipping and taxes computed at checkout.
                    </p>
                    <button
                      onClick={() => setCheckoutStep('details')}
                      className="w-full py-4 bg-earth-terracotta hover:bg-[#D9A288] text-earth-moss-dark font-sans font-bold text-xs tracking-widest uppercase rounded-none flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                    >
                      <span>Proceed to Checkout</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {checkoutStep === 'details' && (
              <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col min-h-0">
                {/* Checkout form fields */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-earth-gold pb-1 border-b border-earth-linen/10">
                    Shipping Details
                  </h4>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 bg-[#1A1816] border border-earth-linen/10 focus:border-earth-terracotta rounded-none font-sans text-sm text-earth-linen focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="jane.doe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 bg-[#1A1816] border border-earth-linen/10 focus:border-earth-terracotta rounded-none font-sans text-sm text-earth-linen focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Shipping Address</label>
                    <input
                      required
                      type="text"
                      placeholder="123 Harmony lane"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 bg-[#1A1816] border border-earth-linen/10 focus:border-earth-terracotta rounded-none font-sans text-sm text-earth-linen focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">City</label>
                      <input
                        required
                        type="text"
                        placeholder="Los Angeles"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2.5 bg-[#1A1816] border border-earth-linen/10 focus:border-earth-terracotta rounded-none font-sans text-sm text-earth-linen focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Zip Code</label>
                      <input
                        required
                        type="text"
                        placeholder="90001"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="w-full p-2.5 bg-[#1A1816] border border-earth-linen/10 focus:border-earth-terracotta rounded-none font-sans text-sm text-earth-linen focus:outline-none"
                      />
                    </div>
                  </div>

                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-earth-gold pt-3 pb-1 border-b border-earth-linen/10">
                    Payment Details (Simulated)
                  </h4>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Card Number</label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={cardNo}
                        onChange={(e) => setCardNo(e.target.value)}
                        className="w-full p-2.5 pl-10 bg-[#1A1816] border border-earth-linen/10 focus:border-earth-terracotta rounded-none font-sans text-sm text-earth-linen focus:outline-none"
                      />
                      <CreditCard className="absolute left-3 top-3.5 h-4 w-4 text-earth-linen-dark" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">Expiry (MM/YY)</label>
                      <input
                        required
                        type="text"
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2.5 bg-[#1A1816] border border-earth-linen/10 focus:border-earth-terracotta rounded-none font-sans text-sm text-earth-linen focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-earth-linen-dark">CVV</label>
                      <input
                        required
                        type="text"
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full p-2.5 bg-[#1A1816] border border-earth-linen/10 focus:border-earth-terracotta rounded-none font-sans text-sm text-earth-linen focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Subtotal and Submit Checkout */}
                <div className="p-6 border-t border-earth-linen/10 bg-[#1A1816] space-y-4">
                  <div className="flex justify-between text-xs text-earth-linen-dark font-mono uppercase">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-earth-linen-dark font-mono uppercase">
                    <span>Shipping</span>
                    <span className="text-green-500 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between font-serif text-base font-bold text-earth-linen pt-2 border-t border-earth-linen/10">
                    <span>Total Amount</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="py-3 bg-[#161412] border border-earth-linen/10 text-earth-linen font-sans font-bold text-xs tracking-widest uppercase rounded-none cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="py-3 bg-earth-terracotta hover:bg-[#D9A288] text-earth-moss-dark font-sans font-bold text-xs tracking-widest uppercase rounded-none cursor-pointer"
                    >
                      {isSubmitting ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 text-center">
                <CheckCircle2 className="h-16 w-16 text-earth-gold animate-bounce" />
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-earth-linen uppercase tracking-wider">Order Placed!</h3>
                  <p className="text-sm text-earth-linen-dark leading-relaxed opacity-90">
                    Thank you for supporting independent music, {fullName}. We received your order with love.
                  </p>
                </div>

                <div className="bg-[#1A1816] border border-earth-linen/10 p-4 rounded-none w-full space-y-1 font-mono text-xs shadow-md">
                  <p className="text-earth-linen-dark uppercase">Your Order Reference</p>
                  <p className="text-earth-gold font-bold text-sm tracking-widest">{orderSuccessId}</p>
                </div>

                <button
                  onClick={() => {
                    setCheckoutStep('cart');
                    setIsCartOpen(false);
                  }}
                  className="px-6 py-3 bg-earth-terracotta hover:bg-[#D9A288] text-earth-moss-dark font-sans font-bold text-xs tracking-widest uppercase rounded-none cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
