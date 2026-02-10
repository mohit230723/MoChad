"use client";

import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import { Wallet, Menu, X, Cpu, Trophy, BarChart3, TrendingUp, Home, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const { isConnected, walletAddress, balance, connectWallet, disconnectWallet } = useWallet();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check system preference or localStorage could go here
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark');
    };

    return (
        <nav className="navbar">
            <div className="nav-container" style={{ justifyContent: 'space-between' }}>

                {/* LEFT: Brand & Primary Nav */}
                <div className="flex items-center gap-lg">
                    <Link href="/" className="nav-brand" style={{ marginRight: '2rem' }}>
                        <Cpu className="text-primary" size={32} style={{ color: 'var(--primary)' }} />
                        <span className="text-gradient" style={{ fontSize: '1.25rem' }}>
                            CLAW HUB
                        </span>
                    </Link>

                    {/* Desktop Links - Left Aligned */}
                    <div className="nav-links">
                        <Link href="/" className="nav-link">
                            <Home size={18} /> Home
                        </Link>
                        <Link href="/arena" className="nav-link">
                            <Trophy size={18} /> Arena
                        </Link>
                        <Link href="/prediction" className="nav-link">
                            <TrendingUp size={18} /> Prediction
                        </Link>
                        <Link href="/setup" className="nav-link">
                            <Cpu size={18} /> Register Bot
                        </Link>
                        <Link href="/profile" className="nav-link">
                            <BarChart3 size={18} /> Profile
                        </Link>
                    </div>
                </div>

                {/* RIGHT: Wallet & Dark Mode */}
                <div className="flex items-center gap-md">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="btn"
                        style={{ padding: '0.5rem', background: 'transparent', border: 'none', boxShadow: 'none' }}
                        title="Toggle Dark Mode"
                    >
                        {isDarkMode ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-main" />}
                    </button>

                    {isConnected ? (
                        <div className="wallet-badge hidden-mobile">
                            <span className="text-accent text-mono font-bold">{balance} CR</span>
                            <span className="text-muted">|</span>
                            <span className="text-mono text-xs" title={walletAddress!}>
                                {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                            </span>
                            <button
                                onClick={disconnectWallet}
                                className="text-error text-xs"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px' }}
                            >
                                Exit
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={connectWallet}
                            className="btn btn-primary text-sm hidden-mobile"
                            style={{ padding: '0.5rem 1rem' }}
                        >
                            <Wallet size={18} />
                            Connect
                        </button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="mobile-menu">
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className="nav-link">Home</Link>
                    <Link href="/arena" onClick={() => setIsMenuOpen(false)} className="nav-link">Arena</Link>
                    <Link href="/prediction" onClick={() => setIsMenuOpen(false)} className="nav-link">Prediction</Link>
                    <Link href="/setup" onClick={() => setIsMenuOpen(false)} className="nav-link">Register Bot</Link>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="nav-link">Profile</Link>
                    <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                        <button onClick={toggleTheme} className="nav-link" style={{ width: '100%', textAlign: 'left', marginBottom: '1rem' }}>
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                        {isConnected ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div className="text-accent text-mono">{balance} Credits</div>
                                <div className="text-mono text-xs">{walletAddress}</div>
                                <button onClick={disconnectWallet} className="text-error">Disconnect</button>
                            </div>
                        ) : (
                            <button onClick={connectWallet} className="btn btn-primary" style={{ width: '100%' }}>Connect Wallet</button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
