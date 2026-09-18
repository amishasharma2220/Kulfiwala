import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-kulfi-brown text-kulfi-cream py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-2xl font-bold mb-3">Kulfiwala</h3>
            <p className="font-body text-sm opacity-80">Bringing you the finest traditional Indian kulfi since 1965. Made with love, served with joy.</p>
          </div>
          <nav aria-label="Footer navigation">
            <h4 className="font-heading font-bold mb-3">Quick Links</h4>
            <div className="space-y-2 font-body text-sm">
              <Link to="/menu" className="block opacity-80 hover:opacity-100 transition-opacity">Menu</Link>
              <Link to="/about" className="block opacity-80 hover:opacity-100 transition-opacity">Our Story</Link>
              <Link to="/stores" className="block opacity-80 hover:opacity-100 transition-opacity">Store Locations</Link>
              <Link to="/orders" className="block opacity-80 hover:opacity-100 transition-opacity">My Orders</Link>
            </div>
          </nav>
          <div>
            <h4 className="font-heading font-bold mb-3">Contact</h4>
            <address className="space-y-2 font-body text-sm opacity-80 not-italic">
              <p><a href="mailto:info@kulfiwala.com" className="hover:opacity-100">info@kulfiwala.com</a></p>
              <p><a href="tel:+919876543210" className="hover:opacity-100">+91 98765 43210</a></p>
              <p>Connaught Place, New Delhi</p>
            </address>
          </div>
        </div>
        <div className="border-t border-kulfi-cream/20 mt-8 pt-6 text-center font-body text-sm opacity-60">
          © {year} Kulfiwala. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
