export default function Admin() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-primary text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="#" className="block hover:text-accent">Dashboard</a>
          <a href="#" className="block hover:text-accent">Projeler</a>
          <a href="#" className="block hover:text-accent">Emlak İlanları</a>
          <a href="#" className="block hover:text-accent">Otomotiv İlanları</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 mb-2">Toplam Kullanıcı</h3>
            <p className="text-3xl font-bold">128</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 mb-2">Emlak İlanı</h3>
            <p className="text-3xl font-bold">45</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 mb-2">Otomotiv İlanı</h3>
            <p className="text-3xl font-bold">32</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 mb-2">Bekleyen İlan</h3>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>
      </main>
    </div>
  );
}
