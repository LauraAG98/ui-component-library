import { ChangeDetectionStrategy, Component, input, output, computed } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  /**Título del header de la card */
  title = input.required<string>();

  /**Subtítulo opcional bajo el título */
  subtitle = input<string | null>(null);

  /**Estilo visual del contenedor */
  elevation = input<'flat' | 'raised' | 'outlined'>('flat');

  /**Emite al hacer clic en el header */
  headerClicked = output<void>()

  /**Notifica cuando el usuario ha dado clic en el header */
  handleHeaderClicked (): void{
    this.headerClicked.emit();
  }

  /**
   *Método que aplica las clases visuales dependiendo de la variante
   *Se recalcula (computed) unicamente cuando el valor de elevation() cambia*/
  cardClasses = computed(()=>{
    /**Constante que contiene el estilo general de las tarjetas.*/
    const cardStyles = 'w-full rounded-xl overflow-hidden bg-space border-2 transition-all duration-300';

    switch (this.elevation()) {
      case 'flat':
        return `${cardStyles} border-spaceLight`;

      case 'raised':
        return `${cardStyles} border-portalDark shadow-[0_0_20px_rgba(151,206,76,0.25)]`;

      case 'outlined':
        return `${cardStyles} border-portal`;

      default: 
        return cardStyles;
    }
  })
}