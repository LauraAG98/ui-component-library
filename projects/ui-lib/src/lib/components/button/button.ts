import { ChangeDetectionStrategy, Component, input, output, computed } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  /**Texto visible obligatorio del botón*/
  label = input.required<string>();

  /**Estilo visual del botón*/
  variant = input<'primary' | 'secondary' | 'danger'>('primary');

  /**Tamaño del botón*/
  size = input<'sm' | 'md' | 'lg'>('md')

  /**Bloquea la interacción*/
  disabled = input<boolean>(false);

  /**Muestra spinner y bloquea el click*/
  /**No hay carga si no se ha dado click en el botón*/
  loading = input<boolean>(false);
  
  /**Emite solo si no esta disabled ni loading*/
  clicked = output<void>();

  /**Verifica si el botón esta disponible para emitir el evento*/
  handleClick(): void{
    if(!this.disabled() && !this.loading()){
      this.clicked.emit();
    }
  }

  /**
   *Método que aplica las clases visuales dependiendo de la variante
   *Se recalcula (computed) unicamente cuando el valor de variant() cambia*/
  variantClasses = computed(()=> {
    switch (this.variant()) {
      case 'primary':
        return 'bg-portal border-2 border-portalDark text-space';
      
      case 'secondary':
        return 'bg-transparent border-2 border-portal text-portal';
      
      case 'danger':
        return 'bg-danger border-2 border-dangerDark text-white';
    
      default:
        return '';
    }
  })

  /**
   *Método que calcula las clases de tamaño del botón dependiendo del valor recibido 
   *Se recalcula (computed) unicamente cuando el valor de size() cambia*/
  sizeClasses = computed(()=>{
    switch(this.size()){
      case 'sm':
        return 'text-xs px-3 py-1';
      
      case 'md':
        return 'text-sm px-4 py-2';

      case 'lg':
        return 'text-base px-6 py-3';

      default :
        return '';
    }
  })
}