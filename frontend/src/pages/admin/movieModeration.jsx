import React from "react";  
import ListMovies from "../../components/admin/ListMovies";
import ReportTable from "../../components/admin/Report";
import { Clapperboard, List, AlertCircle } from "lucide-react";

export default function MovieModeration() {
    return (
        <div className="bg-[#14141b] pb-10">
            <div className="p-8 flex justify-center items-center">
                <h1 className="flex items-center gap-4 text-3xl font-extrabold text-white"> 
                    <Clapperboard size={32} className="text-red-500" /> 
                    Liste des signalements
                </h1>
            </div>

            {/* Section des Signalements */}
            <div className="max-w-7xl mx-auto mb-10">
                <ReportTable />
            </div>
           
            {/* Section de la Liste Globale */}
            <div className="max-w-7xl mx-auto p-4">
                <div className="flex items-center gap-2 px-2 mb-4 text-gray-400">
                    <List size={20} />
                    <h2 className="text-xl font-semibold uppercase tracking-wider">Liste de films</h2>
                </div>
                <ListMovies />
            </div>
        </div>
    );
}