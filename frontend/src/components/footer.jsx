function Footer() {
  return (
    <footer className="bg-[#131921] text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© {new Date().getFullYear()} StoreDesk. All rights reserved.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-amber-500 transition">Privacy Policy</a>
          <a href="#" className="hover:text-amber-500 transition">Terms of Service</a>
          <a href="#" className="hover:text-amber-500 transition">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
