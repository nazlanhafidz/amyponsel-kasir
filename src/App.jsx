import React, { useState } from 'react';
import { 
  ChefHat, LayoutDashboard, ShoppingCart, 
  Plus, Minus, Search, ArrowRight, Printer, PackagePlus, 
  Edit3, Trash2, Camera, Image as ImageIcon
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('pos'); // 'pos', 'manage', 'kitchen', 'admin'
  
  // SEMUA PRODUK DIKEMBALIKAN LENGKAP + FITUR EDIT/FOTO KAMERA
  const [menuItems, setMenuItems] = useState([
    // 1. ROKOK
    { id: 101, name: '76 Apel Royal', category: 'Rokok', price: 18000, stock: 50, image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=500&q=80' },
    { id: 102, name: 'Dji Sam Soe (234 / Sam Soe Refil)', category: 'Rokok', price: 23000, stock: 40, image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=500&q=80' },
    { id: 103, name: 'Gudang Garam International / Surya (12 & 16)', category: 'Rokok', price: 28000, stock: 60, image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=500&q=80' },
    { id: 104, name: 'Gudang Garam Merah', category: 'Rokok', price: 16000, stock: 35, image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=500&q=80' },
    { id: 105, name: 'Magnum Filter (234 Magnum & Kretek)', category: 'Rokok', price: 24000, stock: 45, image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=500&q=80' },
    { id: 106, name: 'Rokok Menara', category: 'Rokok', price: 14000, stock: 30, image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=500&q=80' },

    // 2. KEBUTUHAN SEHARI-HARI
    { id: 201, name: 'Amplop', category: 'Kebutuhan Sehari-hari', price: 5000, stock: 100, image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&q=80' },
    { id: 202, name: 'Antangin JRG Sachet', category: 'Kebutuhan Sehari-hari', price: 4000, stock: 80, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80' },
    { id: 203, name: 'Attack Jaz1 Detergen', category: 'Kebutuhan Sehari-hari', price: 5000, stock: 50, image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=500&q=80' },
    { id: 204, name: 'Baby Happy! Body Fit Pants', category: 'Kebutuhan Sehari-hari', price: 48000, stock: 20, image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&q=80' },
    { id: 205, name: 'Bebelove / Bebelac Susu', category: 'Kebutuhan Sehari-hari', price: 65000, stock: 15, image: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=500&q=80' },
    { id: 206, name: 'Daia Detergen', category: 'Kebutuhan Sehari-hari', price: 5000, stock: 60, image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=500&q=80' },
    { id: 207, name: 'Giv Sabun Mandi', category: 'Kebutuhan Sehari-hari', price: 4000, stock: 70, image: 'https://images.unsplash.com/photo-1607006482602-76ca0fd2f47b?w=500&q=80' },
    { id: 208, name: 'Hansaplast Plester', category: 'Kebutuhan Sehari-hari', price: 2000, stock: 100, image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500&q=80' },
    { id: 209, name: 'Kecap Bango Pouch/Botol', category: 'Kebutuhan Sehari-hari', price: 11000, stock: 40, image: 'https://images.unsplash.com/photo-1614531341773-3bff8b7ce3ba?w=500&q=80' },
    { id: 210, name: 'Kispray / Rapika Pelicin Pakaian', category: 'Kebutuhan Sehari-hari', price: 2000, stock: 90, image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=500&q=80' },
    { id: 211, name: 'Komix OBH Sachet', category: 'Kebutuhan Sehari-hari', price: 3000, stock: 100, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80' },
    { id: 212, name: 'KukuBima Ener-G!', category: 'Kebutuhan Sehari-hari', price: 2000, stock: 120, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80' },
    { id: 213, name: 'Laurier / Softex Pembalut', category: 'Kebutuhan Sehari-hari', price: 7000, stock: 45, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80' },
    { id: 214, name: 'Lifebuoy Sabun Batang', category: 'Kebutuhan Sehari-hari', price: 4500, stock: 80, image: 'https://images.unsplash.com/photo-1607006482602-76ca0fd2f47b?w=500&q=80' },
    { id: 215, name: 'MamyPoko Popok Bayi', category: 'Kebutuhan Sehari-hari', price: 55000, stock: 25, image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&q=80' },
    { id: 216, name: 'Mancis / Korek Api Gas', category: 'Kebutuhan Sehari-hari', price: 3000, stock: 150, image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=500&q=80' },
    { id: 217, name: 'Minyak Kayu Putih Botol', category: 'Kebutuhan Sehari-hari', price: 15000, stock: 35, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80' },
    { id: 218, name: 'Pepsodent Pasta Gigi', category: 'Kebutuhan Sehari-hari', price: 8000, stock: 60, image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=500&q=80' },
    { id: 219, name: 'Proclin Pemutih Pakaian', category: 'Kebutuhan Sehari-hari', price: 4000, stock: 40, image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=500&q=80' },
    { id: 220, name: 'Shampo Sachet (Rejoice/Dove/Lifebuoy)', category: 'Kebutuhan Sehari-hari', price: 1000, stock: 200, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&q=80' },
    { id: 221, name: 'Rexona Deodorant Sachet', category: 'Kebutuhan Sehari-hari', price: 2500, stock: 90, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&q=80' },
    { id: 222, name: 'Rinso Anti Noda', category: 'Kebutuhan Sehari-hari', price: 5000, stock: 75, image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=500&q=80' },
    { id: 223, name: 'Sabun Cream Telepon Batang', category: 'Kebutuhan Sehari-hari', price: 3500, stock: 50, image: 'https://images.unsplash.com/photo-1607006482602-76ca0fd2f47b?w=500&q=80' },
    { id: 224, name: 'Shinzu\'i Sabun Mandi', category: 'Kebutuhan Sehari-hari', price: 5000, stock: 65, image: 'https://images.unsplash.com/photo-1607006482602-76ca0fd2f47b?w=500&q=80' },
    { id: 225, name: 'Sikat Gigi Dewasa / Anak', category: 'Kebutuhan Sehari-hari', price: 4000, stock: 80, image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=500&q=80' },
    { id: 226, name: 'So Klin Detergen', category: 'Kebutuhan Sehari-hari', price: 5000, stock: 90, image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=500&q=80' },
    { id: 227, name: 'Sunlight Sabun Cuci Piring', category: 'Kebutuhan Sehari-hari', price: 3000, stock: 110, image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=500&q=80' },

    // 3. MINUMAN
    { id: 301, name: 'Aqua (600ml & 1.5L)', category: 'Minuman', price: 4000, stock: 150, image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=500&q=80' },
    { id: 302, name: 'Coffeemix / Indocafe Coffeemix', category: 'Minuman', price: 2000, stock: 200, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80' },
    { id: 303, name: 'Energen Sachet', category: 'Minuman', price: 2500, stock: 100, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80' },
    { id: 304, name: 'Frisian Flag Energo Susu', category: 'Minuman', price: 2000, stock: 90, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80' },
    { id: 305, name: 'Good Day Cappuccino', category: 'Minuman', price: 2500, stock: 150, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80' },
    { id: 306, name: 'Gula Aren Cappuccino', category: 'Minuman', price: 3000, stock: 80, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80' },
    { id: 307, name: 'Indocafe Cappuccino', category: 'Minuman', price: 2500, stock: 110, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80' },
    { id: 308, name: 'Kapal Api Special Mix', category: 'Minuman', price: 2000, stock: 180, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80' },
    { id: 309, name: 'MaxTea Tarikk', category: 'Minuman', price: 3000, stock: 75, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80' },
    { id: 310, name: 'Milo Cokelat Sachet', category: 'Minuman', price: 3000, stock: 100, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80' },
    { id: 311, name: 'Teh Celup SariWangi / SariMurni', category: 'Minuman', price: 6000, stock: 60, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80' },
    { id: 312, name: 'Sukrim Susu Krim', category: 'Minuman', price: 2000, stock: 85, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80' },
    { id: 313, name: 'Susu Putih Kental Manis', category: 'Minuman', price: 2000, stock: 140, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80' },
    { id: 314, name: 'Teh Pucuk Harum Botol', category: 'Minuman', price: 3500, stock: 120, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80' },
    { id: 315, name: 'TOP Cappuccino', category: 'Minuman', price: 2500, stock: 95, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80' },

    // 4. MAKANAN
    { id: 401, name: 'Beras 1 kg & Sembako (Minyakita/Gula/Garam)', category: 'Makanan', price: 15000, stock: 40, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80' },
    { id: 402, name: 'Desaku Bumbu (Kunyit/Ketumbar)', category: 'Makanan', price: 1500, stock: 150, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80' },
    { id: 403, name: 'Garuda Pilus / Kacang Atom', category: 'Makanan', price: 2000, stock: 100, image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&q=80' },
    { id: 404, name: 'Indomie (Kari Ayam & Mie Goreng)', category: 'Makanan', price: 3500, stock: 300, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&q=80' },
    { id: 405, name: 'Khong Guan Sandwich Combo', category: 'Makanan', price: 12000, stock: 30, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80' },
    { id: 406, name: 'Ladaku Merica Bubuk', category: 'Makanan', price: 1000, stock: 200, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80' },
    { id: 407, name: 'Mie Sedaap Instant', category: 'Makanan', price: 3500, stock: 250, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&q=80' },
    { id: 408, name: 'Migelas Seduh', category: 'Makanan', price: 1500, stock: 120, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&q=80' },
    { id: 409, name: 'Pop Mie Cup', category: 'Makanan', price: 6500, stock: 80, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80' },
    { id: 410, name: 'Roma Malkist Cokelat', category: 'Makanan', price: 8000, stock: 50, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80' },
    { id: 411, name: 'Royco Sachet (Ayam & Sapi)', category: 'Makanan', price: 1000, stock: 250, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80' },
    { id: 412, name: 'Sajiku Nasi Goreng & Tepung', category: 'Makanan', price: 3000, stock: 110, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80' },
    { id: 413, name: 'Superco Biskuit Pack', category: 'Makanan', price: 7000, stock: 40, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80' },
    { id: 414, name: 'Supermi Instant', category: 'Makanan', price: 3000, stock: 90, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&q=80' },
    { id: 415, name: 'Telur Ayam Ras (Per Butir)', category: 'Makanan', price: 2000, stock: 150, image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=500&q=80' },
    { id: 416, name: 'Tic Tac Snack', category: 'Makanan', price: 2000, stock: 100, image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&q=80' },
  ]);

  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('Dine-In');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // State Form Tambah/Edit Produk
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('Rokok');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productImage, setProductImage] = useState('');

  // Transaksi Dapur & Admin
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'Pak Ahmad',
      type: 'Takeaway',
      items: [{ name: 'Indomie (Kari Ayam & Mie Goreng)', qty: 3, price: 3500 }],
      total: 10500,
      status: 'Menunggu Dimasak',
      time: '19:10'
    }
  ]);

  const [completedOrder, setCompletedOrder] = useState(null);

  // Filter Produk
  const filteredMenu = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const addToCart = (item) => {
    if (item.stock <= 0) return alert('Stok produk habis!');
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return alert('Keranjang masih kosong!');
    if (!customerName.trim()) return alert('Masukkan Nama Pembeli terlebih dahulu!');

    const newOrder = {
      id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      customer: customerName,
      type: orderType,
      items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      total: totalCartPrice,
      status: 'Menunggu Dimasak',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setOrders([newOrder, ...orders]);
    setCompletedOrder(newOrder);
    setCart([]);
    setCustomerName('');
  };

  // Fungsi Handle Upload Foto / Ambil dari Kamera HP
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simpan Produk (Tambah atau Edit)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productName || !productPrice || !productStock) {
      alert('Nama, Harga, dan Stok wajib diisi!');
      return;
    }

    const finalImage = productImage || 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=500&q=80';

    if (isEditing) {
      setMenuItems(menuItems.map(item => item.id === editId ? {
        ...item,
        name: productName,
        category: productCategory,
        price: Number(productPrice),
        stock: Number(productStock),
        image: finalImage
      } : item));
      setIsEditing(false);
      setEditId(null);
      alert('Produk berhasil diperbarui!');
    } else {
      const newItem = {
        id: Date.now(),
        name: productName,
        category: productCategory,
        price: Number(productPrice),
        stock: Number(productStock),
        image: finalImage
      };
      setMenuItems([newItem, ...menuItems]);
      alert('Produk baru berhasil ditambahkan!');
    }

    setProductName('');
    setProductPrice('');
    setProductStock('');
    setProductImage('');
    setActiveTab('pos');
  };

  const handleStartEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setProductName(item.name);
    setProductCategory(item.category);
    setProductPrice(item.price);
    setProductStock(item.stock);
    setProductImage(item.image);
    setActiveTab('manage');
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Yakin ingin menghapus produk ini dari daftar kasir?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* NAVBAR HEADER */}
      <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50 flex justify-between items-center px-6 py-3.5 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="bg-red-600 text-white p-2.5 rounded-2xl font-black text-lg shadow flex items-center justify-center">🏪</div>
          <div>
            <h1 className="font-black text-base tracking-wider uppercase text-red-500">Warung Amyponsel</h1>
            <p className="text-[11px] text-slate-400">Sistem POS Kasir & Stok Modern</p>
          </div>
        </div>
        
        <nav className="flex bg-slate-800 p-1.5 rounded-2xl space-x-1 border border-slate-700">
          <button 
            onClick={() => { setActiveTab('pos'); setIsEditing(false); }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-xs transition ${activeTab === 'pos' ? 'bg-red-600 text-white shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
          >
            <ShoppingCart size={15} />
            <span>Kasir (POS)</span>
          </button>
          
          <button 
            onClick={() => { setActiveTab('manage'); setIsEditing(false); setProductName(''); setProductPrice(''); setProductStock(''); setProductImage(''); }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-xs transition ${activeTab === 'manage' ? 'bg-red-600 text-white shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
          >
            <PackagePlus size={15} />
            <span>Kelola & Tambah Produk</span>
          </button>

          <button 
            onClick={() => setActiveTab('kitchen')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-xs transition relative ${activeTab === 'kitchen' ? 'bg-red-600 text-white shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
          >
            <ChefHat size={15} />
            <span>Kitchen / Dapur</span>
            {orders.filter(o => o.status !== 'Selesai').length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                {orders.filter(o => o.status !== 'Selesai').length}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setActiveTab('admin')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-xs transition ${activeTab === 'admin' ? 'bg-red-600 text-white shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
          >
            <LayoutDashboard size={15} />
            <span>Admin Dashboard</span>
          </button>
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        
        {/* --- TAB 1: KASIR (POS) --- */}
        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* KATALOG PRODUK */}
            <div className="lg:col-span-2 flex flex-col space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Cari rokok, sembako, minuman..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div className="flex space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1">
                  {['Semua', 'Rokok', 'Kebutuhan Sehari-hari', 'Minuman', 'Makanan'].map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${selectedCategory === cat ? 'bg-red-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* GRID KARTU PRODUK */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredMenu.map(item => (
                  <div 
                    key={item.id}
                    className="bg-white border border-slate-200 hover:border-red-500 hover:shadow-xl rounded-2xl overflow-hidden transition group flex flex-col justify-between"
                  >
                    <div className="relative h-32 w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => addToCart(item)}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <div className="absolute top-2 right-2 text-[10px] font-black bg-slate-900/80 text-white px-2 py-0.5 rounded-lg backdrop-blur-sm">
                        Stok: {item.stock}
                      </div>
                      <div className="absolute top-2 left-2 text-[9px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-lg uppercase tracking-wider shadow">
                        {item.category}
                      </div>
                    </div>

                    <div className="p-3.5 flex flex-col justify-between flex-1 bg-white">
                      <div className="cursor-pointer" onClick={() => addToCart(item)}>
                        <h3 className="font-bold text-slate-800 text-xs line-clamp-2 mb-2 leading-snug">{item.name}</h3>
                      </div>
                      
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <div className="flex justify-between items-center">
                          <span className="font-black text-red-600 text-sm">Rp {item.price.toLocaleString()}</span>
                          <button 
                            onClick={() => addToCart(item)}
                            className="bg-red-50 text-red-600 p-2 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <div className="flex space-x-1 pt-1 border-t border-dashed border-slate-100">
                          <button 
                            onClick={() => handleStartEdit(item)}
                            className="flex-1 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 py-1 rounded-lg text-[10px] font-bold flex items-center justify-center space-x-1 transition"
                          >
                            <Edit3 size={11} />
                            <span>Edit</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(item.id)}
                            className="flex-1 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 py-1 rounded-lg text-[10px] font-bold flex items-center justify-center space-x-1 transition"
                          >
                            <Trash2 size={11} />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KERANJANG BELANJA */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[calc(100vh-130px)] sticky top-20 overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <h2 className="font-bold text-slate-800 text-xs flex items-center space-x-2 uppercase tracking-wider">
                  <ShoppingCart size={16} className="text-red-600" />
                  <span>Keranjang Belanja</span>
                </h2>
                <span className="bg-red-100 text-red-600 font-extrabold text-xs px-2.5 py-0.5 rounded-full">{cart.length} Item</span>
              </div>

              <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
                <div>
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Nama Pembeli</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Pak Joko"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="flex space-x-2">
                  {['Dine-In', 'Takeaway'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition ${orderType === type ? 'bg-red-50 border-red-500 text-red-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                    <ShoppingCart size={36} strokeWidth={1.5} />
                    <p className="text-xs">Keranjang masih kosong</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex-1 pr-2">
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                        <span className="text-xs text-red-600 font-black">Rp {(item.price * item.qty).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-xl px-2 py-1 shadow-sm">
                        <button onClick={() => updateQty(item.id, -1)} className="text-slate-500 hover:text-red-600"><Minus size={12} /></button>
                        <span className="text-xs font-black w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="text-slate-500 hover:text-red-600"><Plus size={12} /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Subtotal</span>
                    <span>Rp {totalCartPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-black text-base text-slate-900 pt-1.5 border-t border-slate-200">
                    <span>Total Bayar</span>
                    <span className="text-red-600">Rp {totalCartPrice.toLocaleString()}</span>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black py-3 rounded-2xl transition shadow-md flex items-center justify-center space-x-2 text-xs uppercase tracking-wider"
                >
                  <span>Proses Transaksi & Cetak Struk</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* --- TAB 2: KELOLA, TAMBAH, & EDIT PRODUK DENGAN KAMERA/FOTO --- */}
        {activeTab === 'manage' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-black text-lg text-slate-900 flex items-center space-x-2">
                  <PackagePlus className="text-red-600" />
                  <span>{isEditing ? 'Edit Produk Warung' : 'Tambah Produk Baru'}</span>
                </h2>
                <p className="text-xs text-slate-500">Ambil foto produk langsung dari kamera HP atau unggah dari galeri.</p>
              </div>
              {isEditing && (
                <button 
                  onClick={() => { setIsEditing(false); setProductName(''); setProductPrice(''); setProductStock(''); setProductImage(''); }}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-3 py-1.5 rounded-xl"
                >
                  Batal Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nama Produk / Barang</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Rokok Sampoerna Mild / Sabun Cuci" 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Foto Produk (Kamera HP / Galeri / Link)</label>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="w-24 h-24 rounded-xl bg-slate-200 overflow-hidden flex items-center justify-center border border-slate-300 flex-shrink-0">
                    {productImage ? (
                      <img src={productImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-slate-400" size={28} />
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <label className="flex items-center justify-center space-x-2 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer transition shadow">
                      <Camera size={15} />
                      <span>Ambil Foto / Upload dari HP</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment"
                        onChange={handleImageChange} 
                        className="hidden" 
                      />
                    </label>

                    <div className="text-center text-[10px] text-slate-400 font-bold">ATAU MASUKKAN LINK URL GAMBAR</div>

                    <input 
                      type="url" 
                      placeholder="https://images.unsplash.com/... (opsional)" 
                      value={productImage.startsWith('data:') ? '' : productImage}
                      onChange={(e) => setProductImage(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Kategori</label>
                  <select 
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Rokok">Rokok</option>
                    <option value="Kebutuhan Sehari-hari">Kebutuhan Sehari-hari</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Makanan">Makanan</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Harga Jual (Rp)</label>
                  <input 
                    type="number" 
                    placeholder="25000" 
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Stok Awal</label>
                  <input 
                    type="number" 
                    placeholder="50" 
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl transition shadow text-xs uppercase tracking-wider mt-2"
              >
                {isEditing ? 'Simpan Perubahan Produk' : 'Simpan & Tambahkan ke Kasir'}
              </button>
            </form>
          </div>
        )}

        {/* --- TAB 3: KITCHEN DISPLAY SYSTEM --- */}
        {activeTab === 'kitchen' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h2 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
                  <ChefHat className="text-red-600" />
                  <span>Kitchen / Antrean Pesanan Warung Amyponsel</span>
                </h2>
                <p className="text-xs text-slate-500">Daftar orderan masuk yang perlu disiapkan atau dikemas.</p>
              </div>
              <div className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold">
                {orders.filter(o => o.status !== 'Selesai').length} Pesanan Aktif
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map(order => (
                <div 
                  key={order.id} 
                  className={`bg-white rounded-2xl border-2 shadow-sm flex flex-col justify-between overflow-hidden transition ${
                    order.status === 'Menunggu Dimasak' ? 'border-amber-400' :
                    order.status === 'Sedang Dimasak' ? 'border-blue-400' : 'border-emerald-400 opacity-75'
                  }`}
                >
                  <div className={`p-3 text-white flex justify-between items-center ${
                    order.status === 'Menunggu Dimasak' ? 'bg-amber-500' :
                    order.status === 'Sedang Dimasak' ? 'bg-blue-600' : 'bg-emerald-600'
                  }`}>
                    <div>
                      <span className="font-bold text-xs">{order.id}</span>
                      <span className="text-[10px] ml-2 opacity-90 font-medium">({order.type})</span>
                    </div>
                    <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-lg">{order.time}</span>
                  </div>

                  <div className="p-4 flex-1 space-y-3">
                    <div className="border-b border-slate-100 pb-2">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Pembeli</p>
                      <h3 className="font-extrabold text-slate-900 text-sm">{order.customer}</h3>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Item Barang:</p>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs bg-slate-50 p-2 rounded-xl">
                          <span className="font-bold text-slate-800">{item.name}</span>
                          <span className="bg-red-100 text-red-600 font-extrabold px-2 py-0.5 rounded-md text-[10px]">x{item.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100">
                    {order.status === 'Menunggu Dimasak' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Sedang Dimasak')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs transition shadow"
                      >
                        Proses / Siapkan Barang
                      </button>
                    )}
                    {order.status === 'Sedang Dimasak' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Selesai')}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs transition shadow"
                      >
                        Selesai / Siap Diambil
                      </button>
                    )}
                    {order.status === 'Selesai' && (
                      <div className="w-full text-center text-emerald-600 font-bold text-xs py-2 bg-emerald-50 rounded-xl border border-emerald-200">
                        ✨ Transaksi Selesai
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 4: ADMIN DASHBOARD --- */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="font-extrabold text-slate-900 text-base">Admin Dashboard & Rekap Pemasukan</h2>
              <p className="text-xs text-slate-500">Laporan pemasukan dan total transaksi harian Warung Amyponsel.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                <div className="bg-emerald-100 text-emerald-600 p-3.5 rounded-2xl text-lg font-bold">💰</div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Total Pemasukan</p>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">Rp {orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}</h3>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                <div className="bg-blue-100 text-blue-600 p-3.5 rounded-2xl text-lg font-bold">📋</div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Total Transaksi</p>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">{orders.length} Order</h3>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                <div className="bg-purple-100 text-purple-600 p-3.5 rounded-2xl text-lg font-bold">📦</div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Total Jenis Produk</p>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">{menuItems.length} Produk</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-slate-800 text-xs uppercase tracking-wider">
                Riwayat Transaksi Pelanggan
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">ID Order</th>
                      <th className="p-3">Pembeli</th>
                      <th className="p-3">Tipe</th>
                      <th className="p-3">Total Belanja</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Waktu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-red-600">{o.id}</td>
                        <td className="p-3 font-bold text-slate-900">{o.customer}</td>
                        <td className="p-3"><span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[10px] font-bold">{o.type}</span></td>
                        <td className="p-3 font-black text-slate-900">Rp {o.total.toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            o.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500">{o.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* STRUK MODAL */}
      {completedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="text-center space-y-1">
              <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-base shadow-inner font-bold">✓</div>
              <h3 className="font-extrabold text-base text-slate-900">Transaksi Berhasil!</h3>
              <p className="text-xs text-slate-400">Struk Resmi Warung Amyponsel</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-dashed border-slate-300 space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">ID Pesanan</span>
                <span className="font-bold text-slate-900">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Pembeli</span>
                <span className="font-bold text-slate-900">{completedOrder.customer} ({completedOrder.type})</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block font-bold">Rincian Barang:</span>
                {completedOrder.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between font-semibold text-slate-700">
                    <span>{i.name} x{i.qty}</span>
                    <span>Rp {(i.price * i.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-black text-sm text-slate-900">
                <span>Total Bayar</span>
                <span className="text-red-600">Rp {completedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-1">
              <button 
                onClick={() => window.print()} 
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
              >
                <Printer size={14} />
                <span>Cetak Struk</span>
              </button>
              <button 
                onClick={() => setCompletedOrder(null)} 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow"
              >
                Tutup / Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}