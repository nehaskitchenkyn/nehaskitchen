import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingBag, Calendar, CheckCircle2, Phone, Clock, Plus, 
  Trash2, ShieldCheck, TrendingUp, DollarSign, Package, 
  ChefHat, ChevronRight, FileSpreadsheet, Eye, Printer, 
  MessageCircle, Sparkles, Filter, Search, Store, Utensils 
} from 'lucide-react';

// Custom inline Instagram icon component (replaces deprecated lucide export)
const InstagramIcon = ({ className = "w-4 h-4 text-pink-300" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MENU_DATA = [
  // Snacks
  { id: 'snk-1', category: 'Snacks', name: 'Idli Chutney', price: 60, unit: 'per plate (2 pcs)', type: 'Veg', desc: 'Steaming hot, fluffy rice-lentil cakes served with freshly grated coconut chutney and aromatic sambar.', popular: true },
  { id: 'snk-2', category: 'Snacks', name: 'Kande Pohe', price: 40, unit: 'per plate', type: 'Veg', desc: 'Traditional Maharashtrian flattened rice cooked with onions, mustard seeds, green chillies, peanuts, and lemon juice.', popular: true },
  { id: 'snk-3', category: 'Snacks', name: 'Misal Pav', price: 80, unit: 'per plate (with 2 pav)', type: 'Veg', desc: 'Fiery sprouted moth bean gravy topped with crispy farsan, chopped onions, coriander, and fresh lemon with buttered pav.', popular: true },
  { id: 'snk-4', category: 'Snacks', name: 'Upma', price: 40, unit: 'per plate', type: 'Veg', desc: 'Wholesome semolina tempered with mustard seeds, curry leaves, ginger, green chillies, and roasted cashews.' },

  // Diwali Snacks (Faral)
  { id: 'dwl-1', category: 'Diwali Snacks', name: 'Besan Ladoo', price: 300, unit: 'per 500g', type: 'Veg', desc: 'Pure ghee roasted gram flour delicately sweetened and infused with cardamom and crunchy dry fruits.', popular: true },
  { id: 'dwl-2', category: 'Diwali Snacks', name: 'Rava Ladoo', price: 280, unit: 'per 500g', type: 'Veg', desc: 'Melt-in-mouth semolina and coconut ladoos prepared in pure cow ghee with golden raisins and cashew bits.' },
  { id: 'dwl-3', category: 'Diwali Snacks', name: 'Chakali', price: 240, unit: 'per 500g', type: 'Veg', desc: 'Crispy, spiral savoury made from roasted multi-grain bhajani flour and aromatic spices.', popular: true },
  { id: 'dwl-4', category: 'Diwali Snacks', name: 'Shankarpalli', price: 220, unit: 'per 500g', type: 'Veg', desc: 'Crispy, diamond-cut sweet festive bites fried to golden perfection in pure ghee.' },
  { id: 'dwl-5', category: 'Diwali Snacks', name: 'Karanji', price: 320, unit: 'per 500g', type: 'Veg', desc: 'Flaky crescent pastries stuffed with roasted dry coconut, khoya, poppy seeds, and fragrant spices.', popular: true },
  { id: 'dwl-6', category: 'Diwali Snacks', name: 'Chivada', price: 220, unit: 'per 500g', type: 'Veg', desc: 'Crisp roasted poha chivda lightly seasoned with mustard, turmeric, peanuts, curry leaves, and green chillies.' },
  { id: 'dwl-7', category: 'Diwali Snacks', name: 'Tikhat Shev', price: 200, unit: 'per 500g', type: 'Veg', desc: 'Crunchy gram flour spicy sev infused with garlic, ajwain, and special home ground spices.' },

  // Lunch & Dinner
  { 
    id: 'thali-veg', 
    category: 'Lunch And Dinner', 
    name: 'Veg Thali', 
    price: 150, 
    unit: 'per thali', 
    type: 'Veg', 
    desc: 'Wholesome homestyle meal: Choice of 2 Roti or 1 Bhakri, Seasonal Bhaji, Steamed Rice, Homestyle Dal, Fresh Salad, and Crispy Papad.',
    hasBreadChoice: true,
    popular: true
  },
  { 
    id: 'thali-nonveg', 
    category: 'Lunch And Dinner', 
    name: 'Non Veg Thali', 
    price: 220, 
    unit: 'per thali', 
    type: 'Non-Veg', 
    desc: 'Hearty feast: Choice of 2 Roti or 1 Bhakri, Authentic Chicken Rassa (Tambda/Special Gravy), Steamed Rice, Fresh Salad, and Crispy Papad.',
    hasBreadChoice: true,
    popular: true
  },
  { 
    id: 'adhoc-order', 
    category: 'Lunch And Dinner', 
    name: 'Adhoc Custom Order', 
    price: 0, 
    unit: 'custom pricing', 
    type: 'Special', 
    desc: 'Planning a party, bulk gathering, or special dish not on the regular menu? Submit your requirements and Neha will personally call back with custom pricing.' 
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-7081',
    customerName: 'Rohit Kulkarni',
    phone: '9820112233',
    date: '2026-11-06',
    timeSlot: '12:30 PM - 1:00 PM',
    status: 'In Kitchen',
    paymentMode: 'UPI',
    address: 'B-402, Shivam Apts, Kalyan West',
    type: 'Storefront',
    notes: 'Please give Bhakri with both thalis, less spicy rassa.',
    items: [
      { name: 'Non Veg Thali', rate: 220, qty: 2, subtotal: 440, variant: '1 Bhakri' },
      { name: 'Kande Pohe', rate: 40, qty: 2, subtotal: 80 }
    ],
    total: 520
  },
  {
    id: 'ORD-7080',
    customerName: 'Sunita Deshmukh',
    phone: '9869445566',
    date: '2026-11-06',
    timeSlot: '04:00 PM - 5:00 PM',
    status: 'Ready',
    paymentMode: 'Cash',
    address: 'Row House 12, Gandhar Nagar, Kalyan',
    type: 'Phone/Manual',
    notes: 'Diwali Faral advance box delivery.',
    items: [
      { name: 'Besan Ladoo (500g)', rate: 300, qty: 2, subtotal: 600 },
      { name: 'Chakali (500g)', rate: 240, qty: 2, subtotal: 480 },
      { name: 'Karanji (500g)', rate: 320, qty: 1, subtotal: 320 }
    ],
    total: 1400
  },
  {
    id: 'ORD-7075',
    customerName: 'Pooja Patil',
    phone: '9920887766',
    date: '2026-10-24',
    timeSlot: '7:30 PM - 8:00 PM',
    status: 'Completed',
    paymentMode: 'UPI',
    address: 'Flat 604, Nilkanth Palms, Kalyan West',
    type: 'Storefront',
    notes: 'Roti with ghee, extra papad packed.',
    items: [
      { name: 'Veg Thali', rate: 150, qty: 3, subtotal: 450, variant: '2 Roti' },
      { name: 'Misal Pav', rate: 80, qty: 2, subtotal: 160 }
    ],
    total: 610
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('store');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [breadChoice, setBreadChoice] = useState({});
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('neha_kitchen_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    timeSlot: '12:30 PM - 1:30 PM',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [adhocModal, setAdhocModal] = useState(false);
  const [adhocDetails, setAdhocDetails] = useState({
    dishName: '',
    estimatedPax: '5-10 people',
    date: new Date().toISOString().split('T')[0],
    specialRequests: '',
    phone: '',
    name: ''
  });

  const [adminPin, setAdminPin] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminTab, setAdminTab] = useState('orders');
  const [selectedMonth, setSelectedMonth] = useState('2026-11');
  const [selectedKOTOrder, setSelectedKOTOrder] = useState(null);

  const [manualOrder, setManualOrder] = useState({
    customerName: '',
    phone: '',
    address: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'Immediate Dispatch',
    paymentMode: 'UPI',
    notes: '',
    items: [{ name: '', rate: '', qty: 1 }]
  });

  useEffect(() => {
    localStorage.setItem('neha_kitchen_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item, breadPref = null) => {
    if (item.id === 'adhoc-order') {
      setAdhocModal(true);
      return;
    }

    const chosenBread = breadPref || (item.hasBreadChoice ? breadChoice[item.id] || '2 Roti' : null);
    const cartItemId = chosenBread ? `${item.id}-${chosenBread}` : item.id;

    setCart(prev => {
      const existing = prev.find(i => i.cartId === cartItemId);
      if (existing) {
        return prev.map(i => i.cartId === cartItemId ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, {
        cartId: cartItemId,
        id: item.id,
        name: item.name,
        price: item.price,
        unit: item.unit,
        variant: chosenBread,
        qty: 1
      }];
    });
    setCartOpen(true);
  };

  const updateCartQty = (cartId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = useMemo(() => cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0), [cart]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Please add items to cart');
    if (!customerInfo.name || !customerInfo.phone) return alert('Please enter Name and Mobile number');

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerInfo.name,
      phone: customerInfo.phone,
      date: customerInfo.date,
      timeSlot: customerInfo.timeSlot,
      status: 'Pending',
      paymentMode: 'Cash on Delivery (COD)',
      address: customerInfo.address,
      type: 'Storefront',
      notes: customerInfo.notes,
      items: cart.map(i => ({
        name: i.name,
        rate: i.price,
        qty: i.qty,
        variant: i.variant,
        subtotal: i.price * i.qty
      })),
      total: cartTotal
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setCartOpen(false);

    const message = encodeURIComponent(
      `*New Order on Neha's Kitchen*\\n` +
      `Order ID: ${newOrder.id}\\n` +
      `Customer: ${newOrder.customerName} (${newOrder.phone})\\n` +
      `Delivery Date: ${newOrder.date} (${newOrder.timeSlot})\\n` +
      `Address: ${newOrder.address || 'Takeaway'}\\n\\n` +
      `*Items:*\\n` +
      newOrder.items.map(it => `- ${it.name} ${it.variant ? `(${it.variant})` : ''} x ${it.qty} = ₹${it.subtotal}`).join('\\n') +
      `\\n\\n*Total Amount:* ₹${newOrder.total}\\n` +
      `Notes: ${newOrder.notes || 'None'}`
    );

    window.open(`https://wa.me/917021424410?text=${message}`, '_blank');
  };

  const handleAdhocSubmit = (e) => {
    e.preventDefault();
    if (!adhocDetails.name || !adhocDetails.phone || !adhocDetails.dishName) {
      return alert('Please fill in dish details, your name, and phone number');
    }

    const newAdhoc = {
      id: `ADHOC-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: adhocDetails.name,
      phone: adhocDetails.phone,
      date: adhocDetails.date,
      timeSlot: 'Custom Scheduled',
      status: 'Pending',
      paymentMode: 'Quotation Pending',
      address: 'Contact for Address',
      type: 'Adhoc Custom Request',
      notes: `Pax: ${adhocDetails.estimatedPax}. Details: ${adhocDetails.specialRequests}`,
      items: [{ name: `Custom: ${adhocDetails.dishName}`, rate: 0, qty: 1, subtotal: 0 }],
      total: 0
    };

    setOrders(prev => [newAdhoc, ...prev]);
    setAdhocModal(false);

    const message = encodeURIComponent(
      `*Special / Adhoc Order Inquiry - Neha's Kitchen*\\n` +
      `Customer: ${adhocDetails.name} (${adhocDetails.phone})\\n` +
      `Dish Requested: ${adhocDetails.dishName}\\n` +
      `Expected Pax: ${adhocDetails.estimatedPax}\\n` +
      `Needed On: ${adhocDetails.date}\\n` +
      `Special Requests: ${adhocDetails.specialRequests}`
    );

    window.open(`https://wa.me/917021424410?text=${message}`, '_blank');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const monthlyOrders = useMemo(() => {
    return orders.filter(o => o.date && o.date.startsWith(selectedMonth));
  }, [orders, selectedMonth]);

  const monthlyRevenue = useMemo(() => {
    return monthlyOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  }, [monthlyOrders]);

  const handleManualOrderSubmit = (e) => {
    e.preventDefault();
    const validItems = manualOrder.items.filter(i => i.name.trim() !== '');
    if (validItems.length === 0) return alert('Add at least one item');

    const total = validItems.reduce((acc, curr) => acc + (Number(curr.rate) * Number(curr.qty)), 0);

    const createdOrder = {
      id: `OFFLINE-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: manualOrder.customerName || 'Offline Customer',
      phone: manualOrder.phone || 'N/A',
      address: manualOrder.address || 'Direct Pickup / Walk-in',
      date: manualOrder.date,
      timeSlot: manualOrder.timeSlot,
      status: 'In Kitchen',
      paymentMode: manualOrder.paymentMode,
      notes: manualOrder.notes,
      type: 'Manual/Offline',
      items: validItems.map(i => ({
        name: i.name,
        rate: Number(i.rate),
        qty: Number(i.qty),
        subtotal: Number(i.rate) * Number(i.qty)
      })),
      total
    };

    setOrders(prev => [createdOrder, ...prev]);
    alert(`Order #${createdOrder.id} successfully added!`);
    setManualOrder({
      customerName: '',
      phone: '',
      address: '',
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'Immediate Dispatch',
      paymentMode: 'UPI',
      notes: '',
      items: [{ name: '', rate: '', qty: 1 }]
    });
  };

  return (
    <div className="min-h-screen bg-amber-50/40 text-stone-800 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-amber-900 text-amber-50 sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('store')}>
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-amber-950 font-bold shadow-inner">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Neha's Kitchen
                <span className="text-xs bg-amber-600/80 px-2 py-0.5 rounded-full text-amber-100 font-normal">Kalyan</span>
              </h1>
              <p className="text-xs text-amber-200">Homecrafted Flavors, Cooked with Love</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs md:text-sm">
            <a href="tel:7021424410" className="flex items-center gap-1.5 bg-amber-800/80 hover:bg-amber-800 px-3 py-1.5 rounded-lg border border-amber-700/60 transition">
              <Phone className="w-4 h-4 text-amber-300" />
              <span>7021424410</span>
            </a>
            <a href="https://instagram.com/nehas.kitchen.kyn" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-amber-800/80 hover:bg-amber-800 px-3 py-1.5 rounded-lg border border-amber-700/60 transition">
              <InstagramIcon className="w-4 h-4 text-pink-300" />
              <span className="hidden sm:inline">@nehas.kitchen.kyn</span>
            </a>
            <button 
              onClick={() => setActiveTab(activeTab === 'admin' ? 'store' : 'admin')}
              className="bg-amber-600 hover:bg-amber-500 text-amber-950 font-semibold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5"
            >
              <Store className="w-4 h-4" />
              <span>{activeTab === 'admin' ? 'Customer Menu' : 'Admin & Kitchen'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {activeTab === 'store' ? (
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
          <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-2xl p-6 md:p-8 mb-8 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="inline-block bg-amber-500 text-amber-950 font-bold text-xs uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
                Fresh & Authentic
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Authentic Homestyle Delicacies in Kalyan</h2>
              <p className="text-amber-100 text-sm md:text-base max-w-xl">
                Freshly prepared breakfast snacks, homemade Diwali Faral, and wholesome lunch & dinner thalis. Order online or customize your feast!
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-xs space-y-1.5 w-full md:w-auto">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-300" /> Orders: <strong>+91 70214 24410</strong></div>
              <div className="flex items-center gap-2"><InstagramIcon className="w-4 h-4 text-pink-300" /> Insta: <strong>@nehas.kitchen.kyn</strong></div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-300" /> Pre-order available for lunch & dinner</div>
            </div>
          </div>

          {/* Categorized Menu */}
          <div className="space-y-10">
            {['Snacks', 'Diwali Snacks', 'Lunch And Dinner'].map((category) => {
              const items = MENU_DATA.filter(i => i.category === category);
              return (
                <section key={category}>
                  <div className="flex items-center justify-between border-b-2 border-amber-200 pb-2 mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-amber-950 flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-amber-600" />
                      {category === 'Diwali Snacks' ? 'Diwali Snacks (Faral)' : category}
                    </h3>
                    <span className="text-xs text-amber-800 font-medium bg-amber-100 px-2 py-0.5 rounded-full">
                      {items.length} items
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl shadow-sm border border-amber-100 p-5 flex flex-col justify-between hover:shadow-md transition">
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-1.5">
                            <h4 className="font-bold text-stone-900 text-base md:text-lg">{item.name}</h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.type === 'Veg' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                              item.type === 'Non-Veg' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                              'bg-amber-100 text-amber-900 border border-amber-300'
                            }`}>
                              {item.type}
                            </span>
                          </div>

                          <div className="text-amber-800 font-bold text-base mb-2">
                            {item.price > 0 ? `₹${item.price}` : 'Quote on request'} 
                            <span className="text-xs font-normal text-stone-500 ml-1">/{item.unit}</span>
                          </div>

                          <p className="text-stone-600 text-xs leading-relaxed mb-4">{item.desc}</p>
                        </div>

                        <div>
                          {item.hasBreadChoice && (
                            <div className="mb-3 bg-amber-50/70 p-2 rounded-lg border border-amber-200/60">
                              <label className="text-[11px] font-semibold text-amber-900 block mb-1">Select Bread:</label>
                              <div className="flex gap-2">
                                {['2 Roti', '1 Bhakri'].map((choice) => (
                                  <button
                                    key={choice}
                                    type="button"
                                    onClick={() => setBreadChoice(prev => ({ ...prev, [item.id]: choice }))}
                                    className={`flex-1 text-xs py-1 px-2 rounded border font-medium ${
                                      (breadChoice[item.id] || '2 Roti') === choice
                                        ? 'bg-amber-600 text-white border-amber-600'
                                        : 'bg-white text-stone-700 border-stone-200'
                                    }`}
                                  >
                                    {choice}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() => addToCart(item)}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-1.5 transition active:scale-95"
                          >
                            <Plus className="w-4 h-4" />
                            {item.id === 'adhoc-order' ? 'Request Custom Quote' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      ) : (
        /* Admin Dashboard */
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
          {!isAdminAuthenticated ? (
            <div className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-md border border-amber-200 text-center">
              <ShieldCheck className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-stone-900 mb-1">Kitchen & Admin Portal</h2>
              <p className="text-stone-500 text-xs mb-4">Enter 4-digit PIN to access live orders & sales reports</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (adminPin === '1234') {
                  setIsAdminAuthenticated(true);
                } else {
                  alert('Incorrect PIN. Default is 1234');
                }
              }}>
                <input
                  type="password"
                  maxLength={4}
                  placeholder="Enter PIN (Default: 1234)"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-bold p-3 border border-stone-300 rounded-lg mb-4 focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2.5 rounded-lg transition">
                  Unlock Kitchen Dashboard
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200 pb-3">
                <div className="flex gap-2">
                  {[
                    { id: 'orders', label: 'Live Orders' },
                    { id: 'offline', label: 'Add Offline Order' },
                    { id: 'analytics', label: 'Monthly Sell Dashboard' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setAdminTab(tab.id)}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                        adminTab === tab.id
                          ? 'bg-amber-800 text-white'
                          : 'bg-white text-stone-700 border border-stone-200 hover:bg-amber-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIsAdminAuthenticated(false)}
                  className="text-xs text-rose-600 hover:underline"
                >
                  Lock Dashboard
                </button>
              </div>

              {/* Monthly Sell Dashboard */}
              {adminTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
                    <div>
                      <h3 className="font-bold text-lg text-amber-950">Sales Performance Overview</h3>
                      <p className="text-xs text-stone-500">Track monthly turnover, order counts, and dish demand</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-semibold text-stone-600">Select Month:</label>
                      <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="border border-stone-300 rounded-lg p-2 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-amber-600 text-white p-5 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase font-bold tracking-wider text-amber-200">Total Monthly Revenue</span>
                        <DollarSign className="w-5 h-5 text-amber-200" />
                      </div>
                      <div className="text-3xl font-extrabold">₹{monthlyRevenue.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-amber-100 mt-1">{monthlyOrders.length} orders recorded in {selectedMonth}</div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase font-bold tracking-wider text-stone-500">Total Orders</span>
                        <Package className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="text-3xl font-extrabold text-stone-900">{monthlyOrders.length}</div>
                      <div className="text-xs text-stone-500 mt-1">Storefront + Offline logged</div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase font-bold tracking-wider text-stone-500">Average Order Value</span>
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-3xl font-extrabold text-stone-900">
                        ₹{monthlyOrders.length > 0 ? Math.round(monthlyRevenue / monthlyOrders.length) : 0}
                      </div>
                      <div className="text-xs text-stone-500 mt-1">Average per customer ticket</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                    <div className="p-4 bg-stone-50 border-b border-stone-200 font-bold text-stone-800">
                      Orders in {selectedMonth}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs md:text-sm">
                        <thead className="bg-stone-100 text-stone-600 uppercase text-[11px] font-semibold">
                          <tr>
                            <th className="p-3">Order ID</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Items Summary</th>
                            <th className="p-3">Mode</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {monthlyOrders.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="text-center p-6 text-stone-400">
                                No orders found for {selectedMonth}.
                              </td>
                            </tr>
                          ) : (
                            monthlyOrders.map(order => (
                              <tr key={order.id} className="hover:bg-amber-50/50">
                                <td className="p-3 font-semibold text-amber-950">{order.id}</td>
                                <td className="p-3 font-medium">{order.customerName}</td>
                                <td className="p-3 text-stone-500">{order.date}</td>
                                <td className="p-3">
                                  {order.items.map(it => `${it.name} (x${it.qty})`).join(', ')}
                                </td>
                                <td className="p-3">{order.paymentMode}</td>
                                <td className="p-3 font-bold text-stone-900">₹{order.total}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                    order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                                    order.status === 'In Kitchen' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-700'
                                  }`}>
                                    {order.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Offline Manual POS */}
              {adminTab === 'offline' && (
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm max-w-2xl mx-auto">
                  <h3 className="text-lg font-bold text-amber-950 mb-1">Add Offline / Phone Order</h3>
                  <p className="text-xs text-stone-500 mb-4">Record orders taken directly via phone call, WhatsApp, or walk-in customers.</p>
                  
                  <form onSubmit={handleManualOrderSubmit} className="space-y-4 text-xs md:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Customer Name</label>
                        <input
                          type="text"
                          required
                          value={manualOrder.customerName}
                          onChange={(e) => setManualOrder({ ...manualOrder, customerName: e.target.value })}
                          placeholder="e.g. Ramesh Joshi"
                          className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={manualOrder.phone}
                          onChange={(e) => setManualOrder({ ...manualOrder, phone: e.target.value })}
                          placeholder="e.g. 9820000000"
                          className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Date</label>
                        <input
                          type="date"
                          value={manualOrder.date}
                          onChange={(e) => setManualOrder({ ...manualOrder, date: e.target.value })}
                          className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Payment Mode</label>
                        <select
                          value={manualOrder.paymentMode}
                          onChange={(e) => setManualOrder({ ...manualOrder, paymentMode: e.target.value })}
                          className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="UPI">UPI / GPay / PhonePe</option>
                          <option value="Cash">Cash</option>
                          <option value="Paid in Advance">Paid in Advance</option>
                          <option value="Credit / Due">Credit / Due</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-b border-stone-200 py-3 space-y-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-bold text-stone-800">Order Items & Unit Rates</label>
                        <button
                          type="button"
                          onClick={() => setManualOrder({
                            ...manualOrder,
                            items: [...manualOrder.items, { name: '', rate: '', qty: 1 }]
                          })}
                          className="text-amber-700 hover:text-amber-800 font-semibold text-xs flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Another Item
                        </button>
                      </div>

                      {manualOrder.items.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="Item name (e.g. Veg Thali, Besan Ladoo 1kg)"
                            value={item.name}
                            onChange={(e) => {
                              const updated = [...manualOrder.items];
                              updated[idx].name = e.target.value;
                              setManualOrder({ ...manualOrder, items: updated });
                            }}
                            className="flex-2 p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                          />
                          <input
                            type="number"
                            placeholder="Rate (₹)"
                            value={item.rate}
                            onChange={(e) => {
                              const updated = [...manualOrder.items];
                              updated[idx].rate = e.target.value;
                              setManualOrder({ ...manualOrder, items: updated });
                            }}
                            className="w-24 p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 text-right"
                          />
                          <input
                            type="number"
                            min="1"
                            placeholder="Qty"
                            value={item.qty}
                            onChange={(e) => {
                              const updated = [...manualOrder.items];
                              updated[idx].qty = Math.max(1, parseInt(e.target.value) || 1);
                              setManualOrder({ ...manualOrder, items: updated });
                            }}
                            className="w-16 p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 text-center"
                          />
                          {manualOrder.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = manualOrder.items.filter((_, i) => i !== idx);
                                setManualOrder({ ...manualOrder, items: updated });
                              }}
                              className="text-rose-500 hover:text-rose-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Notes / Address</label>
                      <textarea
                        rows={2}
                        value={manualOrder.notes}
                        onChange={(e) => setManualOrder({ ...manualOrder, notes: e.target.value })}
                        placeholder="Any special packing instructions or address..."
                        className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2.5 rounded-lg transition"
                    >
                      Save & Add to Kitchen Queue
                    </button>
                  </form>
                </div>
              )}

              {/* Live Orders View */}
              {adminTab === 'orders' && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-amber-950">Active Kitchen Orders</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orders.map(order => (
                      <div key={order.id} className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="font-bold text-amber-950">{order.id}</span>
                              <div className="text-xs text-stone-500">{order.date} • {order.timeSlot}</div>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                              order.status === 'In Kitchen' ? 'bg-amber-100 text-amber-800' :
                              order.status === 'Ready' ? 'bg-blue-100 text-blue-800' : 'bg-stone-100 text-stone-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>

                          <div className="border-t border-b border-stone-100 py-2 my-2 text-xs space-y-1">
                            <div className="font-semibold text-stone-800">{order.customerName} ({order.phone})</div>
                            {order.address && <div className="text-stone-500 truncate">{order.address}</div>}
                            <div className="mt-2 space-y-0.5">
                              {order.items.map((it, idx) => (
                                <div key={idx} className="flex justify-between text-stone-700">
                                  <span>{it.name} {it.variant ? `(${it.variant})` : ''} x {it.qty}</span>
                                  <span className="font-medium">₹{it.subtotal || (it.rate * it.qty)}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {order.notes && (
                            <p className="text-[11px] text-amber-900 bg-amber-50 p-1.5 rounded mb-2">
                              Note: {order.notes}
                            </p>
                          )}
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs text-stone-500">Total:</span>
                            <span className="text-base font-bold text-stone-900">₹{order.total}</span>
                          </div>

                          <div className="flex gap-1.5">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="flex-1 text-xs p-1.5 border border-stone-300 rounded font-medium outline-none bg-stone-50"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Kitchen">In Kitchen</option>
                              <option value="Ready">Ready</option>
                              <option value="Completed">Completed</option>
                            </select>
                            <button
                              onClick={() => setSelectedKOTOrder(order)}
                              title="Print KOT / Bill"
                              className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded border border-stone-300"
                            >
                              <Printer className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full flex flex-col p-5 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-lg font-bold text-amber-950 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
                Your Kitchen Order ({cart.reduce((a, b) => a + b.qty, 0)})
              </h3>
              <button onClick={() => setCartOpen(false)} className="text-stone-400 hover:text-stone-600 text-lg font-bold">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {cart.map(item => (
                <div key={item.cartId} className="flex justify-between items-center p-3 bg-amber-50/50 rounded-xl border border-amber-100 text-sm">
                  <div>
                    <h5 className="font-bold text-stone-900">{item.name}</h5>
                    {item.variant && <span className="text-[11px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-semibold">{item.variant}</span>}
                    <div className="text-xs text-stone-500 mt-0.5">₹{item.price} each</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateCartQty(item.cartId, -1)} className="w-7 h-7 bg-white rounded border border-stone-200 font-bold hover:bg-stone-100">-</button>
                    <span className="font-semibold text-sm w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateCartQty(item.cartId, 1)} className="w-7 h-7 bg-white rounded border border-stone-200 font-bold hover:bg-stone-100">+</button>
                    <span className="font-bold ml-2 text-stone-900">₹{item.price * item.qty}</span>
                  </div>
                </div>
              ))}

              {cart.length > 0 && (
                <form onSubmit={handlePlaceOrder} className="mt-4 space-y-3 border-t pt-4 text-xs">
                  <h4 className="font-bold text-stone-800 text-sm">Delivery & Customer Details</h4>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <textarea
                    rows={2}
                    placeholder="Delivery Address (Kalyan & nearby)"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={customerInfo.date}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, date: e.target.value })}
                      className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <select
                      value={customerInfo.timeSlot}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, timeSlot: e.target.value })}
                      className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option>12:00 PM - 1:30 PM (Lunch)</option>
                      <option>7:30 PM - 9:00 PM (Dinner)</option>
                      <option>Immediate / Morning Snacks</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Special instructions (e.g. less spicy, extra sambar)"
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                  />

                  <div className="border-t pt-3 flex justify-between items-center text-base font-bold text-amber-950">
                    <span>Total Amount:</span>
                    <span>₹{cartTotal}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send Order on WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Pill */}
      {cart.length > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-5 rounded-full shadow-2xl flex items-center gap-3 z-40 transition animate-bounce"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>{cart.reduce((a, b) => a + b.qty, 0)} Items | ₹{cartTotal}</span>
        </button>
      )}

      {/* Adhoc Inquiry Modal */}
      {adhocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-amber-950">Custom / Adhoc Order Request</h3>
              <button onClick={() => setAdhocModal(false)} className="text-stone-400 hover:text-stone-600 text-lg font-bold">&times;</button>
            </div>
            <p className="text-xs text-stone-500 mb-4">
              Planning a family get-together, party, or want a special dish? Let Neha know your requirement.
            </p>
            <form onSubmit={handleAdhocSubmit} className="space-y-3 text-xs md:text-sm">
              <div>
                <label className="block font-semibold mb-1">Dish(es) or Menu Request</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15 pax Puran Poli or Special Chicken Gravy"
                  value={adhocDetails.dishName}
                  onChange={(e) => setAdhocDetails({ ...adhocDetails, dishName: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Estimated Pax</label>
                  <input
                    type="text"
                    value={adhocDetails.estimatedPax}
                    onChange={(e) => setAdhocDetails({ ...adhocDetails, estimatedPax: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Date Needed</label>
                  <input
                    type="date"
                    value={adhocDetails.date}
                    onChange={(e) => setAdhocDetails({ ...adhocDetails, date: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={adhocDetails.name}
                    onChange={(e) => setAdhocDetails({ ...adhocDetails, name: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={adhocDetails.phone}
                    onChange={(e) => setAdhocDetails({ ...adhocDetails, phone: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Special Instructions</label>
                <textarea
                  rows={2}
                  value={adhocDetails.specialRequests}
                  onChange={(e) => setAdhocDetails({ ...adhocDetails, specialRequests: e.target.value })}
                  placeholder="Spice preference, packaging, or delivery details..."
                  className="w-full p-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2.5 rounded-lg transition"
              >
                Send Request via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Printable KOT Modal */}
      {selectedKOTOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl font-mono text-xs">
            <div className="text-center border-b pb-2 mb-2">
              <h4 className="font-bold text-sm">NEHA'S KITCHEN</h4>
              <p>Ph: +91 70214 24410 | Kalyan</p>
              <p>Insta: @nehas.kitchen.kyn</p>
              <p className="mt-1 font-bold">KITCHEN ORDER TICKET (KOT)</p>
            </div>
            <div className="mb-2">
              <div><strong>Ticket:</strong> {selectedKOTOrder.id}</div>
              <div><strong>Date:</strong> {selectedKOTOrder.date} ({selectedKOTOrder.timeSlot})</div>
              <div><strong>Customer:</strong> {selectedKOTOrder.customerName}</div>
              <div><strong>Phone:</strong> {selectedKOTOrder.phone}</div>
              {selectedKOTOrder.address && <div><strong>Address:</strong> {selectedKOTOrder.address}</div>}
            </div>
            <div className="border-t border-b py-2 mb-2">
              {selectedKOTOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{it.name} {it.variant ? `(${it.variant})` : ''} x{it.qty}</span>
                  <span>₹{it.subtotal || (it.rate * it.qty)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-sm mb-2">
              <span>TOTAL DUE:</span>
              <span>₹{selectedKOTOrder.total}</span>
            </div>
            {selectedKOTOrder.notes && (
              <div className="mb-3 text-[10px] bg-stone-100 p-1.5 rounded">
                <strong>Notes:</strong> {selectedKOTOrder.notes}
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={() => window.print()} className="flex-1 bg-stone-900 text-white py-1.5 rounded font-sans font-semibold">Print KOT</button>
              <button onClick={() => setSelectedKOTOrder(null)} className="flex-1 bg-stone-200 text-stone-800 py-1.5 rounded font-sans font-semibold">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-200/80 text-xs py-6 mt-12 border-t border-amber-900">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <div className="font-bold text-white text-sm">Neha's Kitchen, Kalyan</div>
            <p className="text-amber-300/80">Homestyle Maharashtrian Snacks, Diwali Faral & Thalis</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:7021424410" className="hover:text-white flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> 7021424410
            </a>
            <a href="https://instagram.com/nehas.kitchen.kyn" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
              <InstagramIcon className="w-3.5 h-3.5" /> @nehas.kitchen.kyn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}