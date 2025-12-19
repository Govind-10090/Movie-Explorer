import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-primary/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-secondary hover:text-white transition-colors">
                    <Film className="w-8 h-8" />
                    <span>MovieExplorer</span>
                </Link>
                <div>
                    {/* Add more links if needed */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
