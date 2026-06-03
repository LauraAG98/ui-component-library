# Librería de componentes - Explorador de Rick & Morty

La aplicación contiene dos proyectos en el cual se encuentra una librería totalmente independiente y reutilizable, con sus respectivos componentes y estructura. El segundo proyecto es una demo que contiene información (obtenida de una API) de la serie de Rick & Morty, donde se utiliza la librería nombrada anteriormente, además, visualmente hace alusión a la serie.

## Arquitectura

my-workspace
|
|--- demo-app
|      |
|      |--- Models
|      |        |--- character.interface
|      |        |--- episode.interface
|      |        |--- location.interface
|      |
|      |--- Services
|      |        |
|      |        |--- explorer.ts
|      |         
|      |           
|      |--- app.html
|      |--- app.ts      
|
|--- ui-lib
|      |
|      |--- Componentes
|      |        |
|      |        |--- Button
|      |        |--- Card
|      |        |--- Select
|      |        |--- Table 
|      |
|      |--- Models
|                |
|                |--- Select.interface
|                |--- Table.Action.interface
|                |--- Table.Column.interface
| 
|--- tailwind.js
|
|--- tsconfig.json

El proyecto de ui-lib esta dividida por componentes reutilizables como: button, card, select y table, donde se puede encontrar su lógica de funcionamiento y sus caracteristicas visuales. Por otra parte  encontramos los modelos que dan estructura a los datos a través de las interfaces. 
En cuanto al proyecto demo-app se puede encontrar allí la interfaz de usuario, el cual contiene los estilos y estructura que tendrá la aplicación, también se encontrarán los modelos que al igual que la librería contienen la estructura de los datos a través de las interfaces, y el servicio, que permite  comunicarse con la API y gestionar la información requerida por el usuario, al igual que controlar errores que se puedan presentar durante el proceso.      

## Instalación y ejecución

Los primeros requisitos para poder instalar el proyecto son:
* Node.js
* Angular CLI

Después de cumplir con los requisitos anteriores se debe clonar el proyecto con el siguiente comando:
```bash
    git clone https://github.com/LauraAG98/ui-component-library.git
```

Cuando se haya finalizado la clonación, se aplica el comando para quedar ubicado dentro del proyecto, y para realizar la instalación de las dependencias:
```bash 
cd my-workspace
npm install
```

Antes de correr la aplicación se debe construir la librería con:
```bash
ng build ui-lib
```

Y para finalizar, con el siguiente comando se puede correr la aplicación:
```bash
ng serve demo-app
```

## Componentes y HTML

### ui-button

| Tipo | Nombre | Tipo TS | Descripción |
|------|--------|---------|-------------|
| `input()` | `label` | `string` | Texto visible del botón |
| `input()` | `variant` | `'primary' \| 'secondary' \| 'danger'` | Estilo visual del botón |
| `input()` | `size` | `'sm' \| 'md' \| 'lg'` | Tamaño del botón |
| `input()` | `disabled` | `boolean` | Bloquea la interacción |
| `input()` | `loading` | `boolean` | Muestra spinner y bloquea el click |
| `output()` | `clicked` | `void` | Emite solo si no está `disabled` ni `loading` |

**Uso en el HTML:**
```html
<ui-button label="Cerrar" variant="secondary" (clicked)="closeModal()"></ui-button>
```

### ui-card

| Tipo | Nombre | Tipo TS | Descripción |
|------|--------|---------|-------------|
| `input()` | `title` | `string` | Título del header de la card |
| `input()` | `subtitle` | `string \| null` | Subtítulo opcional bajo el título |
| `input()` | `elevation` | `'flat' \| 'raised' \| 'outlined'` | Estilo visual del contenedor |
| `output()` | `headerClicked` | `void` | Emite al hacer clic en el header |
| `ng-content` | — | — | Proyecta contenido arbitrario en el body |

**Uso en el HTML:**
```html
<ui-card title="Detalle" elevation="raised">

</ui-card>
```

### ui-select

| Tipo | Nombre | Tipo TS | Descripción |
|------|--------|---------|-------------|
| `input()` | `options` | `SelectOption[]` | Lista de opciones `{ label, value }` |
| `input()` | `label` | `string` | Etiqueta visible sobre el select |
| `input()` | `placeholder` | `string` | Texto cuando no hay selección |
| `input()` | `loading` | `boolean` | Estado de carga (skeleton o spinner) |
| `input()` | `disabled` | `boolean` | Bloquea la interacción |
| `model()` | `value` | `string \| null` | Two-way binding del valor seleccionado |
| `output()` | `selectionChange` | `SelectOption` | Emite el objeto completo al cambiar |

**Uso en el HTML:**
```html
<ui-select
    label="¿Qué deseas buscar?"
    placeholder="Selecciona una categoría..."
    [options]="resourceOptions"
    [value]="activeResource()"
    (selectionChange) = "onResourceChange($event)">
</ui-select>

<ui-select
    label="Estado del personaje"
    placeholder="Selecciona una opción..."
    [disabled]="isStatusDisabled()"
    [options]="statusOptions"
    (selectionChange) = "onStatusChange($event)">
</ui-select>
```

### ui-table

| Tipo | Nombre | Tipo TS | Descripción |
|------|--------|---------|-------------|
| `input()` | `columns` | `TableColumn[]` | Definición de columnas `{ key, header }` |
| `input()` | `rows` | `T[]` (genérico) | Datos a renderizar |
| `input()` | `loading` | `boolean` | Muestra skeleton rows en lugar de datos |
| `input()` | `emptyMessage` | `string` | Mensaje cuando `rows` está vacío |
| `input()` | `errorMessage` | `string \| null` | Mensaje de error de red visible en la tabla |
| `output()` | `actionTriggered` | `TableAction` | Emite `{ action: 'view' \| 'delete', row: T }` |

**Uso en el HTML:**
```html
<ui-table
    [columns]="columns()"
    [rows]="rows()"
    [loading]="loading()"
    [errorMessage]="errorMessage()"
    emptyMessage= "No se encontraron resultados"
    (actionTriggered) = "onActionTriggered($event)">
</ui-table>
```

## Decisiones de diseño

* Diseño visual: Opté por hacer un diseño futurista, teniendo en cuenta los colores que se manejan en la serie, se uso principalmente el color verde haciendo referencia a los portales que se pueden observar y un color oscuro en el fondo para que los componentes y elementos resaltarán.
* Arquitectura: Decidí separar los elementos dentro de cada proyecto para mantener el orden durante el desarrollo, además, para que este permita modificaciones a futuro.    
* Gestión de estado con signals: Usé signals para guardar información y así indicarle a angular que sucedió un cambio dentro de la aplicación, actualizando la vista para el usuario.     
* Se agrega una condicional (switch) para clasificar los estilos que van a tener los elementos, se usa computed para guardar el estilo y reutilizarlo según la variante, evitando que angular ejecute la condicional a cada acción que realice del usuario.  
* Modal reutilizable: Apliqué un modal reutilizable para los tres recursos, evitando crear una vista para cada uno, lo que se hace es evaluar la información y de acuerdo a esto se ocultan elementos si se requiere. 