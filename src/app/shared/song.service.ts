import { Injectable } from '@angular/core';
import { Song } from './song';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SongService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}
  addSong(song: Song): Observable<any> {
    return this.httpClient
      .post<Song>(
        'http://localhost:4000/api/create-song',
        song,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<Song>('Add Song')));
  }
  getSong(id: any): Observable<Song[]> {
    return this.httpClient
      .get<Song[]>('http://localhost:4000/api/get-song/' + id)
      .pipe(
        tap((_) => console.log(`Song fetched: ${id}`)),
        catchError(this.handleError<Song[]>(`Get Song id=${id}`))
      );
  }
  getSongList(): Observable<Song[]> {
    return this.httpClient.get<Song[]>('http://localhost:4000/api').pipe(
      tap((_) => console.log('Songs fetched.')),
      catchError(this.handleError<Song[]>('Get Songs', []))
    );
  }
  updateSong(id: any, song: Song): Observable<any> {
    return this.httpClient
      .put(
        'http://localhost:4000/api/update-song/' + id,
        song,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`Song updated: ${id}`)),
        catchError(this.handleError<Song[]>('Update Song'))
      );
  }
  deleteSong(id: any): Observable<Song[]> {
    return this.httpClient
      .delete<Song[]>(
        'http://localhost:4000/api/delete-song/' + id,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`Song deleted: ${id}`)),
        catchError(this.handleError<Song[]>('Delete Song'))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}