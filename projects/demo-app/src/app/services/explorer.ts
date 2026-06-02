import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/character.interface';
import { Episode } from '../models/episode.interface';
import { Location } from '../models/location.interface';

export type ResourceType = 'character' | 'episode' | 'location';

@Injectable({
  providedIn: 'root',
})
export class ExplorerService {

  private readonly API = 'https://rickandmortyapi.com/api';  

  /** Recurso activo que se ha seleccionado */
  activeResource = signal<ResourceType>('character');

  /** Filtro de status activo */
  statusFilter = signal<string>('');

  /** Lista de registros que se han cargado */
  rows = signal<Character[] | Episode[] | Location[]>([]);

  /** Estado de carga */
  loading = signal<boolean>(false);

  /** Mensaje de error de la petición */
  errorMessage = signal<string | null>(null);

  /** 
   * Se inyecta el servicio para hacer las peticiones
   * Carga los datos */
  constructor(private http:HttpClient){
    this.loadResource();
  }

  /** Carga los datos del recurso activo con el filtro*/
  loadResource() : void {
    this.loading.set(true);
    this.errorMessage.set(null);

    const resource = this.activeResource();
    const status = this.statusFilter();
    const url = status
    ? `${this.API}/${resource}?status=${status}`
    : `${this.API}/${resource}`;

    this.http.get<{ results: Character[] | Episode[] | Location[]}>(url).subscribe({
      next: (response)=>{
        this.rows.set(response.results);
        this.loading.set(false);
      },
      error: ()=> {
        this.errorMessage.set('Error al cargar los datos. Intenta de nuevo.');
        this.loading.set(false);
      }
    });
  }

  /** Cambia el recurso activo y resetea el filtro*/
changeResource(resource: ResourceType): void{
  this.activeResource.set(resource);
  this.statusFilter.set('');
  this.loadResource();
}

/** Cambia el filtro de estado*/
changeStatus(status: string): void{
  this.statusFilter.set(status);
  this.loadResource();
  }
}