 export interface TableAction<T>{
   /**Tipo de acción ejecutada*/
    action : 'view' | 'delete';

    /**Fila en donde se ejecuto la acción*/
    row : T;
 } 