import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
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
  selectedRow = signal<Record<string, unknown> | null>(null);

  /** Opciones para el select de recurso */
  resourceOptions: SelectOption[] = [
    {label: 'Personajes', value: 'character'},
    {label: 'Episodios', value: 'episode'},
    {label: 'Ubicaciones', value: 'location'}
  ];

  /** Opciones para el filtro de status*/
  statusOptions: SelectOption[] = [
    {label: 'Vivo', value: 'Alive'},
    {label: 'Muerto', value: 'Dead'},
    {label: 'Desconocido', value: 'unknown'}
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
  onActionTriggered(action: TableAction<Record<string, unknown>>): void {
    if(action.action === 'view') {
      this.selectedRow.set(action.row);
    }
  }

  /**Columnas según el recurso que este activo */
  columns = computed <TableColumn[]>(()=> {
    switch (this.activeResource()) {
      case 'character':
        return [
          {key: 'name', header: 'Nombre'},
          {key: 'status', header: 'Estado'},
          {key: 'species', header: 'Especie'}
        ];
        case 'episode':
        return [
          {key: 'name', header: 'Nombre'},
          {key: 'episode', header: 'Episodio'},
          {key: 'air_date', header: 'Fecha'}
        ];
        case 'location':
          return [
            {key: 'name', header: 'Nombre'},
            {key: 'type', header: 'Tipo'},
            {key: 'dimension', header: 'Dimensión'}
          ]
    
      default:
        return[];
    }
  });

  /** El filtro de estatus solo se aplica en characters */
  isStatusDisabled = computed(()=> this.activeResource() !== 'character');

  /** Cierra el modal */
  closeModal(): void {
    this.selectedRow.set(null);
  }
}