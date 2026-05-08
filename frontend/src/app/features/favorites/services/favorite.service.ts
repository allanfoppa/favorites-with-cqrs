import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Favorite, CreateFavoriteCommand } from '../models/favorite.model';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/favorites'; // Use environment variable for best pratices

  /** Query: Fetch all favorites */
  async getFavorites(): Promise<Favorite[]> {
    return lastValueFrom(this.http.get<Favorite[]>(this.apiUrl));
  }

  /** Command: Add a new favorite */
  async create(command: CreateFavoriteCommand): Promise<Favorite> {
    return lastValueFrom(this.http.post<Favorite>(this.apiUrl, command));
  }

  /** Command: Delete a favorite */
  async delete(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
}
