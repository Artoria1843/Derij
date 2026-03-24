import { Link } from "react-router";
import { ShoppingBag, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold">deryjam</span>
            </div>
            <p className="text-emerald-100 text-sm">
              Productos naturales y artesanales de la mejor calidad para tu mesa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-emerald-300">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-emerald-100 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-emerald-100 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/productos" className="text-emerald-100 hover:text-white transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-emerald-100 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-emerald-300">Contacto</h3>
            <ul className="space-y-3 text-sm text-emerald-100">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>+52 (55) 1234 5678</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>info@deryjam.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Ciudad de México, México</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4 text-emerald-300">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-emerald-800 p-2 rounded-full hover:bg-emerald-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-emerald-800 p-2 rounded-full hover:bg-emerald-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-emerald-800 p-2 rounded-full hover:bg-emerald-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-800 mt-8 pt-8 text-center text-sm text-emerald-100">
          <p>&copy; {new Date().getFullYear()} deryjam. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
