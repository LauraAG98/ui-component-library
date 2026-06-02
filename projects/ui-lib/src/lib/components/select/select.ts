import { ChangeDetectionStrategy, Component, input, output, model } from '@angular/core';
import { SelectOption } from '../../models/select-option.interface';

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {
  /**Lista de opciones { label, value }*/
  options = input<SelectOption[]>([])

  /**Etiqueta visible sobre el select*/
  label = input<string>();

  /**Texto cuando no hay selección*/
  placeholder = input<string>();

  /**Estado de carga (skeleton o spinner)*/
  loading = input<boolean>();

  /**Bloquea la interacción*/
  disabled = input<boolean>();

  /**Two-way binding del valor seleccionado*/
  value = model<string | null>(null);

  /**Emite el objeto completo al cambiar*/
  selectionChange = output<SelectOption>();

  /**Avisa al componente padre que opción fue seleccionada.*/
  handleChange (event: Event) : void {
    //Captura el menú del HTML
    const select = event.target as HTMLSelectElement;

    //Busca el objeto completo y evalua si coincide con la opción seleccionada 
    const selected = this.options().find(opt => opt.value === select.value) ?? null;

    //Guarda el valor
    this.value.set(selected?.value ?? null);

    //Si la opción es válida, notifica al exterior con todos los datos.
    if(selected){
      this.selectionChange.emit(selected);
    }
  };
}