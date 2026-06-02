import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TableColumn } from '../../models/table-column.interface';
import { TableAction } from '../../models/table-action.interface';

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent <T extends Record<string, unknown>> {
  /**Definición de columnas { key, header }*/
  columns = input<TableColumn[]>([]);

  /**Datos a renderizar*/
  rows = input<T[]>([]);

  /**Muestra skeleton rows en lugar de datos*/
  loading = input<boolean>(false);

  /**Mensaje cuando rows está vacío*/
  emptyMessage = input<string>('No hay resultados');

  /**Mensaje de error de red visible en la tabla*/
  errorMessage = input<string | null>(null);

  /**Emite { action: 'view' | 'delete', row: T }*/
  actionTriggered = output<TableAction<T>>();
}