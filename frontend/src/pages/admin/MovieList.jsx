import React, { useState } from "react";
import ListMovies from "../../components/admin/ListMovies";
import { Clapperboard, Shuffle, CheckCircle, AlertCircle, Users, Film, X, RefreshCw, Plus } from "lucide-react";
import getAPI from "../../services/getAPI";

export default function MovieList() {
    const [distributing, setDistributing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('distribute'); // 'distribute' | 'redistribute'
    const [result, setResult] = useState(null);

    const openModal = (selectedMode) => {
        setResult(null);
        setMode(selectedMode);
        setShowModal(true);
    };

    const handleConfirm = async () => {
        setShowModal(false);
        setDistributing(true);
        setResult(null);
        try {
            const res = mode === 'redistribute'
                ? await getAPI.redistributeMovies()
                : await getAPI.distributeMovies();
            const data = res.data;
            setResult({
                type: 'success',
                message: data.message,
                stats: data.perJury,
                count: data.distributed,
            });
        } catch (err) {
            setResult({
                type: 'error',
                message: err.response?.data?.message || "Erreur lors de la distribution.",
            });
        } finally {
            setDistributing(false);
        }
    };

    // Rendu des stats par juré (supporte les deux formats)
    const renderStats = (stats) => {
        if (!stats) return null;
        return Object.entries(stats).map(([juryId, val]) => {
            const name = typeof val === 'object' ? val.name : `Juré #${juryId}`;
            const count = typeof val === 'object' ? val.count : val;
            return `${name} : ${count} film(s)`;
        }).join(' · ');
    };

    return (
        <div className="bg-main-admin pb-10">
            <div className="p-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 max-w-7xl mx-auto">
                <h1 className="flex items-center gap-4 text-3xl font-extrabold text-white">
                    <Clapperboard size={32} className="text-primary" />
                    Films reçus
                </h1>

                {/* Boutons distribution */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => openModal('distribute')}
                        disabled={distributing}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/20 border border-primary/40 text-primary hover:bg-primary hover:text-white transition-all duration-200 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {distributing ? <span className="loading loading-spinner loading-xs" /> : <Plus size={15} />}
                        Distribuer
                    </button>
                    <button
                        onClick={() => openModal('redistribute')}
                        disabled={distributing}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-200 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCw size={15} />
                        Redistribuer
                    </button>
                </div>
            </div>

            {/* Feedback distribution */}
            {result && (
                <div className="max-w-7xl mx-auto px-4 mb-4">
                    <div className={`flex items-start gap-3 p-4 rounded-xl border ${
                        result.type === 'success'
                            ? 'bg-green-500/10 border-green-500/30 text-green-400'
                            : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                        {result.type === 'success'
                            ? <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                            : <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                        }
                        <div>
                            <p className="font-semibold text-sm">{result.message}</p>
                            {result.stats && result.count > 0 && (
                                <p className="text-xs opacity-70 mt-1">{renderStats(result.stats)}</p>
                            )}
                        </div>
                        <button onClick={() => setResult(null)} className="ml-auto text-current opacity-50 hover:opacity-100">
                            <X size={14} />
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto p-4">
                <ListMovies />
            </div>

            {/* Modale de confirmation */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative w-full max-w-md bg-[#1a1425] border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col gap-6">

                        {/* Fermer */}
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                            <X size={18} />
                        </button>

                        {/* Icône */}
                        <div className="flex justify-center">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${
                                mode === 'redistribute'
                                    ? 'bg-orange-500/20 border-orange-500/30'
                                    : 'bg-primary/20 border-primary/30'
                            }`}>
                                {mode === 'redistribute'
                                    ? <RefreshCw size={28} className="text-orange-400" />
                                    : <Shuffle size={28} className="text-primary" />
                                }
                            </div>
                        </div>

                        {/* Titre & description */}
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-bold text-white">
                                {mode === 'redistribute' ? 'Redistribuer tous les films' : 'Distribuer les films'}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {mode === 'redistribute'
                                    ? <>Les assignations <span className="text-white font-medium">non votées</span> seront supprimées et <span className="text-white font-medium">tous les films</span> seront redistribués équitablement entre les jurés actifs.</>
                                    : <>Les films <span className="text-white font-medium">non encore assignés</span> seront répartis aléatoirement entre tous les jurés actifs.</>
                                }
                            </p>
                        </div>

                        {/* Infos cards */}
                        <div className="flex gap-3">
                            <div className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                                <div className="p-2 rounded-lg bg-blue-500/10">
                                    <Film size={16} className="text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Films</p>
                                    <p className="text-sm font-semibold text-white">
                                        {mode === 'redistribute' ? 'Non votés' : 'Non assignés'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                                <div className="p-2 rounded-lg bg-purple-500/10">
                                    <Users size={16} className="text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Jurés</p>
                                    <p className="text-sm font-semibold text-white">Actifs uniquement</p>
                                </div>
                            </div>
                        </div>

                        {/* Avertissement */}
                        <div className={`flex items-start gap-2 p-3 rounded-xl border ${
                            mode === 'redistribute'
                                ? 'bg-red-500/10 border-red-500/20'
                                : 'bg-yellow-500/10 border-yellow-500/20'
                        }`}>
                            <AlertCircle size={15} className={`flex-shrink-0 mt-0.5 ${mode === 'redistribute' ? 'text-red-400' : 'text-yellow-400'}`} />
                            <p className={`text-xs ${mode === 'redistribute' ? 'text-red-300' : 'text-yellow-300'}`}>
                                {mode === 'redistribute'
                                    ? <>⚠️ Les <strong>films déjà votés</strong> ne seront pas modifiés. Les assignations en attente seront <strong>réinitialisées</strong>. Action irréversible.</>
                                    : <>Les films déjà assignés ne seront <strong>pas modifiés</strong>. Cette action n'est pas réversible.</>
                                }
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm font-medium"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleConfirm}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white transition-all text-sm font-bold shadow-lg ${
                                    mode === 'redistribute'
                                        ? 'bg-orange-500 hover:bg-orange-400 shadow-orange-500/20'
                                        : 'bg-primary hover:bg-primary/80 shadow-primary/20'
                                }`}
                            >
                                {mode === 'redistribute' ? <RefreshCw size={15} /> : <Shuffle size={15} />}
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
