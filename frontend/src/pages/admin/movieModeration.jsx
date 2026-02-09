import { List } from "lucide-react";
import React from "react";  
import ListFilms from "../../components/admin/ListMovies";
import { Clapperboard } from "lucide-react";

export default function MovieModeration() {
    return (
        <>
            <div className="p-4">
                <h1 className="flex flex-row gap-4 text-2xl font-bold mb-4"> <Clapperboard /> Modération des Films</h1>
            </div>
            <div className="p-4">
                <ListFilms />
            </div>
        </>
    );
}