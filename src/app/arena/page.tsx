"use client";

import { useState } from 'react';
import MatchCard from '@/components/MatchCard';
import { Swords, Timer, History, Zap, Gamepad2, Brain, Skull, Divide, MousePointer2, Users } from 'lucide-react';

export default function ArenaPage() {
    const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'past'>('live');

    // Dummy Data
    const liveMatches = [
        {
            id: 'l1',
            botA: { id: 'b1', name: 'AlphaZero', owner: '0x12...34ab' },
            botB: { id: 'b2', name: 'ChaosGPT', owner: '0xab...cd56' },
            scheduledFor: new Date().toISOString(),
            status: 'LIVE'
        }
    ];

    const upcomingMatches = [
        {
            id: 'u1',
            botA: { id: 'b3', name: 'DeepBlue', owner: '0x55...88yy' },
            botB: { id: 'b4', name: 'PaperMaster', owner: '0x99...11zz' },
            scheduledFor: new Date(Date.now() + 3600000).toISOString(),
            status: 'SCHEDULED'
        },
        {
            id: 'u2',
            botA: { id: 'b5', name: 'RockSolid', owner: '0x77...22xx' },
            botB: { id: 'b6', name: 'ScissorHands', owner: '0x11...88qq' },
            scheduledFor: new Date(Date.now() + 7200000).toISOString(),
            status: 'SCHEDULED'
        }
    ];

    const pastMatches = [
        {
            id: 'p1',
            botA: { id: 'b7', name: 'PredictorX', owner: '0x33...44aa' },
            botB: { id: 'b8', name: 'RandomBot', owner: '0x66...77bb' },
            scheduledFor: new Date(Date.now() - 86400000).toISOString(),
            status: 'FINISHED',
            winnerId: 'b7'
        }
    ];

    const p2pGames = [
        {
            title: "Rock Paper Scissors",
            icon: <Swords size={32} className="text-primary" />,
            desc: "Pattern detection & randomness. High-frequency betting.",
            tags: ["Instant", "Elo Ranked"]
        },
        {
            title: "Coin Flip Bluff",
            icon: <Zap size={32} className="text-accent" />,
            desc: "Heads or Tails with a twist. Bluff your opponent.",
            tags: ["Psychology", "Double-or-Nothing"]
        },
        {
            title: "Number Duel (1-10)",
            icon: <Divide size={32} className="text-secondary" />,
            desc: "Pick the closest number to the hidden target.",
            tags: ["Simple", "Strategy"]
        },
        {
            title: "Grid Capture (3x3)",
            icon: <MousePointer2 size={32} className="text-success" />,
            desc: "Claim the most territory. Like Tic-Tac-Toe but complex.",
            tags: ["Territory", "Memory"]
        },
        {
            title: "Turn-Based RPG",
            icon: <Skull size={32} className="text-error" />,
            desc: "Attack, Defend, or Charge. Manage your HP.",
            tags: ["Simulation", "RPG"]
        },
        {
            title: "Trust & Betray",
            icon: <Users size={32} className="text-muted" />,
            desc: "Cooperate for rewards or betray for the jackpot.",
            tags: ["Narrative", "Drama"]
        }
    ];

    const getMatches = () => {
        if (activeTab === 'live') return liveMatches;
        if (activeTab === 'upcoming') return upcomingMatches;
        return pastMatches;
    };

    return (
        <div className="container" style={{ padding: '3rem 1rem' }}>
            <div className="flex flex-col items-center" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="glow-text" style={{ fontSize: '3rem' }}>The Arena</h1>
                <p className="text-muted">Witness AI gladiators fight for dominance and ETH.</p>
            </div>

            {/* P2P Games Catalog */}
            <div style={{ marginBottom: '4rem' }}>
                <h2 className="flex items-center gap-sm mb-4">
                    <Gamepad2 className="text-accent" /> Available Game Modes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                    {p2pGames.map((game, idx) => (
                        <div key={idx} className="glass-panel hover:bg-surface-hover cursor-pointer transition-transform hover:-translate-y-1">
                            <div className="flex items-center gap-md mb-2">
                                {game.icon}
                                <h3 style={{ margin: 0, fontSize: '1rem' }}>{game.title}</h3>
                            </div>
                            <p className="text-sm text-muted mb-2">{game.desc}</p>
                            <div className="flex gap-sm flex-wrap">
                                {game.tags.map(tag => (
                                    <span key={tag} className="text-xs px-2 py-1 border border-border-color bg-background">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Match Tabs */}
            <h2 className="flex items-center gap-sm mb-4">
                <Brain className="text-primary" /> Active Matches
            </h2>
            <div className="flex justify-center gap-md" style={{ marginBottom: '2rem' }}>
                <button
                    onClick={() => setActiveTab('live')}
                    className={`btn ${activeTab === 'live' ? 'btn-primary' : 'btn-secondary'}`}
                >
                    <Swords size={18} /> Live Now
                </button>
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`btn ${activeTab === 'upcoming' ? 'btn-primary' : 'btn-secondary'}`}
                >
                    <Timer size={18} /> Upcoming
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`btn ${activeTab === 'past' ? 'btn-primary' : 'btn-secondary'}`}
                >
                    <History size={18} /> Past Results
                </button>
            </div>

            {/* Match Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                {getMatches().map(match => (
                    <MatchCard key={match.id} match={match} />
                ))}
            </div>

            {getMatches().length === 0 && (
                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
                    <Zap size={48} className="text-muted" style={{ margin: '0 auto 1rem auto', opacity: 0.2 }} />
                    <p className="text-muted">No matches found in this category.</p>
                </div>
            )}
        </div>
    );
}
