"use client";

import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { TrendingUp, AlertCircle, Swords } from 'lucide-react';

export default function PredictionPage() {
    const { isConnected, connectWallet } = useWallet();

    const games = [
        {
            id: 'g1',
            title: 'Game One',
            name: 'AlphaZero vs ChaosGPT',
            botA: { name: 'AlphaZero', odds: '1.5x' },
            botB: { name: 'ChaosGPT', odds: '2.8x' },
            endsAt: '2h 30m'
        },
        {
            id: 'g2',
            title: 'Game Two',
            name: 'DeepBlue vs PaperMaster',
            botA: { name: 'DeepBlue', odds: '1.9x' },
            botB: { name: 'PaperMaster', odds: '1.9x' },
            endsAt: '4h 15m'
        }
    ];

    return (
        <div className="container" style={{ padding: '3rem 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="glow-text" style={{ fontSize: '2.5rem', color: 'var(--secondary)' }}>Oracle Chamber</h1>
                <p className="text-muted">Predict the winner. Claim the spoils.</p>
            </div>

            <div className="grid grid-cols-1 gap-lg">
                {games.map(game => (
                    <div key={game.id} className="glass-panel" style={{ border: '4px solid var(--border-color)', padding: '2rem' }}>

                        <div className="text-center mb-6">
                            <div className="text-accent text-sm uppercase tracking-widest mb-2">{game.title}</div>
                            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                {game.name}
                            </h2>
                            <div className="text-xs text-muted font-mono">Ends in: {game.endsAt}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-xl relative">
                            {/* VS Badge in Center */}
                            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, background: 'var(--surface)', padding: '0.5rem', border: '2px solid var(--border-color)' }}>
                                <Swords size={24} className="text-error" />
                            </div>

                            {/* Bot A Selection */}
                            <button className="btn flex flex-col items-center gap-sm" style={{ padding: '2rem', height: 'auto', border: '2px solid var(--secondary)' }}>
                                <div style={{ fontSize: '3rem' }}>🤖</div>
                                <div className="font-bold text-lg">{game.botA.name}</div>
                                <div className="text-success font-mono">PAYOUT: {game.botA.odds}</div>
                                <div className="mt-4 text-xs bg-secondary text-white px-2 py-1">PREDICT WIN</div>
                            </button>

                            {/* Bot B Selection */}
                            <button className="btn flex flex-col items-center gap-sm" style={{ padding: '2rem', height: 'auto', border: '2px solid var(--primary)' }}>
                                <div style={{ fontSize: '3rem' }}>👾</div>
                                <div className="font-bold text-lg">{game.botB.name}</div>
                                <div className="text-success font-mono">PAYOUT: {game.botB.odds}</div>
                                <div className="mt-4 text-xs bg-primary text-white px-2 py-1">PREDICT WIN</div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {!isConnected && (
                <div className="glass-panel" style={{ marginTop: '3rem', textAlign: 'center', background: '#fef3c7', borderColor: '#d97706' }}>
                    <AlertCircle size={32} className="text-accent mx-auto mb-2" />
                    <p className="font-bold">Connect Wallet to Place Bets</p>
                    <button onClick={connectWallet} className="btn btn-primary">Connect Wallet</button>
                </div>
            )}
        </div>
    );
}
