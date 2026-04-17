import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-kulfi-brown text-kulfi-cream py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-2xl font-bold mb-3">Kulfiwala</h3>
          <p className="font-body text-sm opacity-80">Bringing you the finest traditional Indian kulfi since 1965. Made with love, served with joy.</p>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-3">Quick Links</h4>
          <div className="space-y-2 font-body text-sm">
            <Link to="/menu" className="block opacity-80 hover:opacity-100 transition-opacity">Menu</Link>
            <Link to="/stores" className="block opacity-80 hover:opacity-100 transition-opacity">Store Locations</Link>
            <Link to="/orders" className="block opacity-80 hover:opacity-100 transition-opacity">My Orders</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-3">Contact</h4>
          <div className="space-y-2 font-body text-sm opacity-80">
            <p>info@kulfiwala.com</p>
            <p>+91 98765 43210</p>
            <p>Connaught Place, New Delhi</p>
          </div>
        </div>
      </div>
      <div className="border-t border-kulfi-cream/20 mt-8 pt-6 text-center font-body text-sm opacity-60">
        © 2026 Kulfiwala. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
