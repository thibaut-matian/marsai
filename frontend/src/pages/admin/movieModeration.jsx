import React from "react";
import ReportTable from "../../components/admin/Report";
import { AlertOctagon } from "lucide-react";

export default function MovieModeration() {
    return (
        <div className="bg-main-admin pb-10">
            <div className="p-8 flex justify-center items-center">
                <h1 className="flex items-center gap-4 text-3xl font-extrabold text-white">
                    <AlertOctagon size={32} className="text-red-500" />
                    Modération
                </h1>
            </div>

            {/* Section des Signalements */}
            <div className="max-w-7xl mx-auto mb-10">
                <ReportTable />
            </div>
        </div>
    );
}