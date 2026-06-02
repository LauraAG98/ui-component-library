import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ExplorerService, ResourceType } from './services/explorer';
import { ButtonComponent, CardComponent, SelectComponent, TableComponent, SelectOption, TableAction, TableColumn } from 'ui-lib';
import { Character } from './models/character.interface';
import { Episode } from './models/episode.interface';
import { Location } from './models/location.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, SelectComponent, TableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  
  /** Se inyecta el servicio */
  private explorer = inject(ExplorerService);

  /** Variables del servicio para que la tabla y los filtros se actualicen solos */
  rows = this.explorer.rows;
  loading = this.explorer.loading;
  errorMessage = this.explorer.errorMessage;
  activeResource = this.explorer.activeResource;

  /** Registro para mostrar en el modal */
  selectedRow = signal<Character | Episode | Location | null>(null);

  /** Opciones para el select de recurso */
  resourceOptions: SelectOption[] = [
    {label: 'Characters', value: 'character'},
    {label: 'Episodes', value: 'episode'},
    {label: 'Locations', value: 'location'}
  ];

  /** Opciones para el filtro de status*/
  statusOptions: SelectOption[] = [
    {label: 'Alive', value: 'Alive'},
    {label: 'Dead', value: 'Dead'},
    {label: 'Unknown', value: 'unknown'}
  ];

  /** Cambia el recurso activo */
  onResourceChange(option: SelectOption): void{
    this.explorer.changeResource(option.value as ResourceType);
  }

  /** Cambia el filtro de status */
  onStatusChange(option: SelectOption): void{
    this.explorer.changeStatus(option.value);
  }

  /** Maneje las acciones de la tabla */
  onActionTriggered(action: TableAction<Character | Episode | Location>): void {
    if(action.action === 'view') {
      this.selectedRow.set(action.row);
    }
  }

  /**Columnas según el recurso que este activo */
  columns: TableColumn[] = [
    {key: 'name', header: 'Nombre'},
    {key: 'status', header: 'Estado'},
    {key: 'species', header: 'Especie'}
  ]

  /** Cierra el modal */
  closeModal(): void {
    this.selectedRow.set(null);
  }
}