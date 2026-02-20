import { ShieldCheck, Lock, Store } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-16 py-12 slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-lg">MarketHub</h3>
            </div>
            <p className="text-gray-400 text-sm">Connecting trusted businesses with satisfied buyers.</p>
          </div>

          {/* Trust & Safety */}
          <div>
            <h4 className="font-semibold mb-4">Trust & Safety</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                <ShieldCheck className="w-4 h-4" />
                Verified Businesses
              </li>
              <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                <Lock className="w-4 h-4" />
                Secure Transactions
              </li>
              <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                <ShieldCheck className="w-4 h-4" />
                Buyer Protection
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-primary transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Contact Support</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Terms of Service</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2024 MarketHub. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Lock className="w-4 h-4" />
                SSL Secured
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <ShieldCheck className="w-4 h-4" />
                Verified Platform
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
