import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-white/10 pt-12 pb-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold text-secondary mb-4">MovieExplorer</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your ultimate destination for discovering movies, exploring genres, and finding your next favorite film.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-secondary transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Top Rated</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Upcoming</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Genres</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>

                    {/* TMDB Attribution */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Powered By</h4>
                        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="inline-block">
                            <img
                                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                                alt="The Movie Database (TMDB)"
                                className="h-8 w-auto mb-2"
                            />
                        </a>
                        <p className="text-gray-500 text-xs">
                            This product uses the TMDB API but is not endorsed or certified by TMDB.
                        </p>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} MovieExplorer. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a href="https://github.com/Govind-10090" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                        <a href="https://www.linkedin.com/in/govind-burhan-a66aba241/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
