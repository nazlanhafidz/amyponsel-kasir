import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Package, 
  ChefHat, 
  LayoutDashboard, 
  Plus, 
  Trash2, 
  Edit3, 
  Printer, 
  Search, 
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { supabase } from './supabase';

export default function App() {
  const [activeTab, setActiveTab] = useState('pos');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('Dine-In');
  const [completedOrder, setCompletedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State untuk Tambah / Edit Produk
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('Makanan');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productImage, setProductImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const categories = ['Semua', 'Rokok', 'Kebutuhan Sehari-hari', 'Minuman', 'Makanan'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching products:', error.message);
      alert('Gagal mengambil data dari Supabase: ' + error.message);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productName || !productPrice || !productStock) {
      alert('Nama, Harga, dan Stok wajib diisi!');
      return;
    }

    const finalImage = productImage.trim() || 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=500&q=80';

    if (isEditing) {
      const { error } = await supabase
        .from('products')
        .update({
          name: productName,
          category: productCategory,
          price: Number(productPrice),
          stock: Number(productStock),
          image: finalImage
        })
        .eq('id', editId);

      if (error) {
        alert('Gagal memperbarui produk: ' + error.message);
      } else {
        alert('Produk berhasil diperbarui!');
        resetForm();
        await fetchProducts();
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert([{
          name: productName,
          category: productCategory,
          price: Number(productPrice),
          stock: Number(productStock),
          image: finalImage
        }]);

      if (error) {
        alert('Gagal menyimpan ke Supabase: ' + error.message);
      } else {
        alert('Produk baru berhasil disimpan ke Supabase!');
        resetForm();
        await fetchProducts();
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setProductName('');
    setProductCategory('Makanan');
    setProductPrice('');
    setProductStock('');
    setProductImage('');
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditId(product.id);
    setProductName(product.name);
    setProductCategory(product.category);
    setProductPrice(product.price);
    setProductStock(product.stock);
    setProductImage(product.image || '');
    setActiveTab('add-product');
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini dari database?')) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        alert('Gagal menghapus produk: ' + error.message);
      } else {
        alert('Produk berhasil dihapus dari Supabase!');
        await fetchProducts();
      }
    }
  };

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert('Stok produk habis!');
      return;
    }

    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingIndex].qty >= product.stock) {
        alert('Jumlah melebihi stok yang tersedia!');
        return;
      }
      updatedCart[existingIndex].qty += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateCartQty = (id, delta) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        if (newQty > item.stock) {
          alert('Jumlah melebihi stok yang tersedia!');
          return item;
        }
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean);

    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    for (const item of cart) {
      const newStock = item.stock - item.qty;
      await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', item.id);
    }

    setCompletedOrder({
      id: 'TRX-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString('id-ID'),
      customer: customerName || 'Pelanggan Umum',
      type: orderType,
      items: [...cart],
      total: cartTotal
    });

    setCart([]);
    setCustomerName('');
    await fetchProducts();
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header Application - Tema Oranye Shopee */}
      <header className="bg-gradient-to-r from-orange-600 to-amber-600 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl text-white backdrop-blur-sm">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-wide text-white">WARUNG AMYPONSEL</h1>
              <p className="text-xs text-orange-100">Sistem POS Kasir & Stok Modern</p>
            </div>
          </div>

          <nav className="flex items-center gap-2 mt-2 sm:mt-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('pos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'pos' ? 'bg-white text-orange-600 shadow-sm' : 'hover:bg-white/10 text-white'
              }`}
            >
              <ShoppingCart className="w-4 h-4" /> Kasir (POS)
            </button>
            <button
              onClick={() => setActiveTab('add-product')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'add-product' ? 'bg-white text-orange-600 shadow-sm' : 'hover:bg-white/10 text-white'
              }`}
            >
              <Plus className="w-4 h-4" /> Kelola & Tambah Produk
            </button>
            <button
              onClick={() => setActiveTab('kitchen')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'kitchen' ? 'bg-white text-orange-600 shadow-sm' : 'hover:bg-white/10 text-white'
              }`}
            >
              <ChefHat className="w-4 h-4" /> Kitchen / Dapur
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'dashboard' ? 'bg-white text-orange-600 shadow-sm' : 'hover:bg-white/10 text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* TAB 1: KASIR (POS) */}
        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari produk warung..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                        selectedCategory === cat
                          ? 'bg-orange-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20 text-slate-500 gap-2">
                  <RefreshCw className="w-6 h-6 animate-spin text-orange-600" /> Memuat data dari Supabase...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl text-center border border-slate-200 text-slate-400">
                  Tidak ada produk ditemukan di Supabase.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => addToCart(product)}
                      className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-slate-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                        <span className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                          Stok: {product.stock}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-orange-600 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h3 className="font-bold text-sm text-slate-800 line-clamp-1">{product.name}</h3>
                        <p className="font-extrabold text-orange-600 text-sm mt-1">
                          Rp {Number(product.price).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Keranjang Belanja */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm h-fit flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-100">
                  <h2 className="font-bold text-slate-800 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-orange-600" /> KERANJANG BELANJA
                  </h2>
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    {cart.reduce((a, c) => a + c.qty, 0)} Item
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Nama Pembeli</label>
                    <input
                      type="text"
                      placeholder="Contoh: Pak Joko"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full mt-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('Dine-In')}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                        orderType === 'Dine-In'
                          ? 'bg-orange-50 border-orange-500 text-orange-600'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Dine-In
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('Takeaway')}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                        orderType === 'Takeaway'
                          ? 'bg-orange-50 border-orange-500 text-orange-600'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Takeaway
                    </button>
                  </div>
                </div>

                {cart.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-sm">
                    <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    Keranjang masih kosong
                  </div>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl">
                        <div className="flex-1 pr-2">
                          <h4 className="font-bold text-xs text-slate-800 line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-slate-500 font-semibold">
                            Rp {Number(item.price).toLocaleString('id-ID')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQty(item.id, -1)}
                            className="w-6 h-6 bg-white border border-slate-300 rounded-md font-bold text-xs hover:bg-slate-100 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateCartQty(item.id, 1)}
                            className="w-6 h-6 bg-white border border-slate-300 rounded-md font-bold text-xs hover:bg-slate-100 flex items-center justify-center"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 ml-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Subtotal</span>
                  <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">Total Bayar</span>
                  <span className="font-black text-lg text-orange-600">
                    Rp {cartTotal.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition shadow-md shadow-orange-200 flex items-center justify-center gap-2"
                >
                  PROSES TRANSAKSI & CETAK STRUK &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KELOLA & TAMBAH PRODUK */}
        {activeTab === 'add-product' && (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-orange-600" />
                  {isEditing ? 'Edit Produk Warung' : 'Tambah Produk Baru ke Supabase'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Input detail barang di bawah ini untuk tersimpan otomatis ke cloud database.
                </p>
              </div>
              {isEditing && (
                <button
                  onClick={resetForm}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg font-semibold"
                >
                  Batal Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase">Nama Produk / Barang</label>
                <input
                  type="text"
                  placeholder="Contoh: Aqua 600ml / Rokok Sampoerna"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">Kategori</label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {categories.filter(c => c !== 'Semua').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    placeholder="10000"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">Stok Awal</label>
                  <input
                    type="number"
                    placeholder="50"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase">URL Gambar Produk (Opsional)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={productImage}
                  onChange={(e) => setProductImage(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition shadow-md shadow-orange-200"
              >
                {isEditing ? 'SIMPAN PERUBAHAN PRODUK' : 'SIMPAN PRODUK BARU KE SUPABASE'}
              </button>
            </form>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-sm text-slate-800">Daftar Produk di Database ({products.length})</h3>
                <button 
                  onClick={fetchProducts}
                  className="text-xs text-orange-600 font-bold flex items-center gap-1 hover:underline"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase">
                    <tr>
                      <th className="p-2">Produk</th>
                      <th className="p-2">Kategori</th>
                      <th className="p-2">Harga</th>
                      <th className="p-2">Stok</th>
                      <th className="p-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td className="p-2 font-bold text-slate-800">{p.name}</td>
                        <td className="p-2 text-slate-500">{p.category}</td>
                        <td className="p-2 font-semibold">Rp {Number(p.price).toLocaleString('id-ID')}</td>
                        <td className="p-2">{p.stock}</td>
                        <td className="p-2 text-right space-x-2">
                          <button
                            onClick={() => handleEditClick(p)}
                            className="text-orange-600 hover:text-orange-800 font-semibold"
                          >
                            <Edit3 className="w-4 h-4 inline" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="text-red-600 hover:text-red-800 font-semibold"
                          >
                            <Trash2 className="w-4 h-4 inline" /> Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KITCHEN */}
        {activeTab === 'kitchen' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center py-16">
            <ChefHat className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700">Tampilan Dapur & Pesanan Masuk</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              Pesanan makanan/minuman yang dikirim kasir akan muncul di layar ini secara otomatis.
            </p>
          </div>
        )}

        {/* TAB 4: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-bold text-lg text-slate-800">Ringkasan Ringkas Warung</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase">Total Produk Aktif</p>
                <p className="text-2xl font-black text-slate-800 mt-1">{products.length}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase">Stok Menipis (&lt; 10)</p>
                <p className="text-2xl font-black text-orange-600 mt-1">
                  {products.filter((p) => p.stock < 10).length}
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase">Status Supabase</p>
                <p className="text-2xl font-black text-emerald-600 mt-1 flex items-center gap-1.5">
                  <CheckCircle className="w-6 h-6 inline" /> Connected
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL CETAK STRUK PEMBAYARAN */}
      {completedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="text-center pb-3 border-b border-dashed border-slate-300">
              <h3 className="font-extrabold text-lg tracking-wider text-slate-900">WARUNG AMYPONSEL</h3>
              <p className="text-[11px] text-slate-500">Struk Transaksi Pembayaran</p>
            </div>

            <div className="text-xs space-y-1 text-slate-600">
              <div className="flex justify-between">
                <span>No. Nota:</span> <span className="font-bold">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Tanggal:</span> <span>{completedOrder.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Pelanggan:</span> <span className="font-bold">{completedOrder.customer}</span>
              </div>
              <div className="flex justify-between">
                <span>Tipe:</span> <span className="font-bold">{completedOrder.type}</span>
              </div>
            </div>

            <div className="py-2 border-y border-dashed border-slate-300 space-y-2 max-h-48 overflow-y-auto">
              {completedOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-800">{item.name}</p>
                    <p className="text-slate-500">{item.qty} x Rp {Number(item.price).toLocaleString('id-ID')}</p>
                  </div>
                  <span className="font-bold text-slate-800">
                    Rp {(item.qty * item.price).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-800">TOTAL BAYAR</span>
              <span className="font-black text-orange-600 text-base">
                Rp {completedOrder.total.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => window.print()}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> CETAK STRUK
              </button>
              <button
                onClick={() => setCompletedOrder(null)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-xl text-xs"
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