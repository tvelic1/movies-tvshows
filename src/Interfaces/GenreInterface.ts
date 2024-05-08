export interface GenreDetails {
    name: string,
    id: number
}


export interface GenreState {
    genres: GenreDetails[];
    setGenres: (newGenres: GenreDetails[]) => void;
}
