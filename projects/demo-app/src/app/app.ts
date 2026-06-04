import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { ExplorerService, ResourceType } from './services/explorer';
import { ButtonComponent, CardComponent, SelectComponent, TableComponent, SelectOption, TableAction, TableColumn } from 'ui-lib';
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

/** Muestra las estrellas cuando carga el componente */
ngOnInit(): void {
  this.generateStars();
}

/** Crea las estrellas y las ubica aleatoriamente en el fondo */
generateStars(): void {
  /** Se obtiene el contenedor donde se van a agregar las estrellas */
  const container = document.getElementById('stars');

  /** Si no encuentra el contenedor no hace nada */
  if (!container) return;
  
  /** Se crean 150 estrellas con tamaño, posición y velocidad aleatoria */
  for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    /** Tamaño aleatorio entre 0 y 3px */
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;

    /** Posición aleatoria en la pantalla */
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    /** Tiempo de inicio y duración del parpadeo aleatorio */
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.animationDuration = `${2 + Math.random() * 3}s`;
    container.appendChild(star);
  }
}
  
  /** Se inyecta el servicio */
  private explorer = inject(ExplorerService);

  /** Variables del servicio para que la tabla y los filtros se actualicen solos */
  rows = this.explorer.rows;
  loading = this.explorer.loading;
  errorMessage = this.explorer.errorMessage;
  activeResource = this.explorer.activeResource;

  /** Registro para mostrar en el modal */
  selectedRow = signal<Record<string, unknown> | null>(null);

  /** Convierte el objeto seleccionado en pares clave-valor */
  objectEntries(obj: Record<string,unknown>): [string, unknown][]{
    return Object.entries(obj);
  }

  /** Verifica si un valor es un objeto, array o url para ocultarlo */
  isObject(value: unknown): boolean {
    return typeof value === 'object' && value !== null || Array.isArray(value) || (typeof value === 'string' && (value as string).startsWith('http'));
  }

  /**Traducciones de claves al español */
  fieldLabels: Record<string, string>={
    id: 'ID',
    name: 'Nombre',
    status: 'Estado',
    species: 'Especie',
    gender: 'Género',
    type: 'Tipo',
    created: 'Creado',
    air_date: 'Fecha de emisión',
    episode: 'Episodio',
    dimension: 'Dimensión'
  }

  /** Obtiene la traducción de una clave */
  getLabel(key: string) : string {
    return this.fieldLabels[key] ?? key;
  }

  /** Opciones para el select de recurso */
  resourceOptions: SelectOption[] = [
    {label: 'Personajes', value: 'character'},
    {label: 'Episodios', value: 'episode'},
    {label: 'Ubicaciones', value: 'location'}
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

  /** Maneja las acciones de la tabla */
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