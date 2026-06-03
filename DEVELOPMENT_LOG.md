# Bitácora de desarrollo

## Proceso de desarrollo

Durante el desarrollo del proyecto tuve varios retos, de los cuáles pude aprender y entender el funcionamiento de los procesos que se presentan allí. 
Uno de los primeros retos fue comprender el funcionamiento de las signals y también acerca de Tailwind, y cómo estas facilitan el desarrollo de programas volviéndolos mas eficientes a la hora de ejecutarlos. Ante esto lo primero que hice fue empezar a dar prioridad punto por punto, por ejemplo investigar sobre los temas de los cuales no tenía mucho conocimiento, luego, cuando ya tenía algunas bases de dichos temas, empece con papel y lápiz a realizar la estructura de cómo debían quedar divididos los dos proyectos. Asi, poco a poco fui dividiendo por fases las tareas que debía realizar, por ejemplo, crear el espacio de trabajo, crear los proyectos y un nuevo repositorio en github para ir subiendo los cambios, luego, realice la instalación de Tailwind y después de ese momento empece a crear los componentes de la libreria, fue un reto porque nunca habia hecho algo asi, asi que me fui orientando con apoyo de la IA, especificamente de claude. Cabe aclarar que mientras iba codificando también iba llevando apuntes de lo que iba realizando, ya que esto fortalece mi aprendizaje con nuevos temas.

## Retos y soluciones

* Uno de los errores más frecuentes que se presentaron fue escribir mal algunas palabras, lo que hacía que se presentarán errores en las clases. Un caso especifíco fue que no se estaban aplicando los estilos y era porque escribí 'utilies' en vez de 'utilities'. Lo solucioné revisando cada palabra, y pidiendo ayuda a Claude.
* En la tabla genérica se presentó un conflicto de tipos, ya que las interfaces de 'Character', 'Episode' y 'Location' tenian una estructura diferente, la solución fue agregar un "adaptador" que fue `[key: string]: unknown` lo que le indicaba que el objeto podia tener cualquier propiedad adicional.
* También, algunos métodos del servicio quedaron fuera de la clase por error, generando conflictos a la hora de compilar, la solución fue revisar e identificar lo que sucedia, y después, ingresarlos dentro de la clase. 

## Uso de IA

Durante el desarrollo del proyecto utilice Claude como IA principal, el proceso que realice fue el siguiente:

**Qué usé:**
Usé Claude para conocer y entender conceptos básicos de los cuales tenía pocos conocimientos, por ejemplo: Signals API, computed(), OnPush, la configuración de Tailwind en los dos proyectos.

**Qué acepté y por qué:**
Acepte las sugerencias de las estructuras y el tipado porque me las explicaron de forma que me hacian entender que iban acordes al proyecto que debía realizar.

**Qué modifique:**
* La mayoría de los mensajes de los JSDoc los escribí con mis palabras.
* Los textos visibles en la demo los decidí dando prioridad a los usuarios que hablan español.
* El diseño visual (colores y tipo de letras) lo elegí pensando en el diseño futurista que caracteriza la serie.  