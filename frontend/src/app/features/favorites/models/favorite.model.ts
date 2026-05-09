export interface Favorite {
  id: string;
  title: string;
  url: string;
  isFavorite: boolean;
}

/** Command to create a new favorite */
export interface CreateFavoriteCommand {
  title: string;
  url: string;
  isFavorite: boolean;
}

/** Command to patch an existing favorite */
export interface UpdateFavoriteCommand {
  id: string;
  title?: string;
  url?: string;
  isFavorite?: boolean;
}

/** Command to delete a favorite */
export interface DeleteFavoriteCommand {
  id: string;
}
