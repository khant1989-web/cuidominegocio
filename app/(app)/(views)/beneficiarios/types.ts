export interface CatalogItem {
  id: number;
  nombre: string;
}

export interface Catalogos {
  tipo_registro:          CatalogItem[];
  tipo_documento:         CatalogItem[];
  evento_caracterizacion: CatalogItem[];
  evento_entrega:         CatalogItem[];
  acta_firmada:           CatalogItem[];
}

export interface Beneficiario {
  id?:                      number;
  nombre_completo:          string;
  tipo_documento_id?:       number | null;
  numero_documento?:        string | null;
  tipo_registro_id?:        number | null;
  evento_caracterizacion_id?: number | null;
  evento_entrega_id?:       number | null;
  acta_firmada_id?:         number | null;
  created_at?:              string;
  updated_at?:              string;
  deleted_at?:              string | null;
}
