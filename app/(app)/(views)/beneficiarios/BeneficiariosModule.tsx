'use client';

import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { createClient } from '@/lib/supabase-browser';
import BeneficiarioSidebar from './BeneficiarioSidebar';
import type { Beneficiario, Catalogos } from './types';

export default function BeneficiariosModule() {
  const toast     = useRef<Toast>(null);
  const supabase  = useRef(createClient()).current;

  const [rows, setRows]               = useState<Beneficiario[]>([]);
  const [loading, setLoading]         = useState(true);
  const [filter, setFilter]           = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected]       = useState<Beneficiario | null>(null);
  const [catalogos, setCatalogos]     = useState<Catalogos>({
    tipo_registro: [], tipo_documento: [],
    evento_caracterizacion: [], evento_entrega: [], acta_firmada: [],
  });

  useEffect(() => {
    fetchCatalogos();
    fetchBeneficiarios();
  }, []);

  /* ── API calls ──────────────────────────────────────── */
  async function fetchCatalogos() {
    try {
      const [tr, td, ec, ee, af] = await Promise.all([
        supabase.from('tipo_registro').select('id,nombre').order('nombre'),
        supabase.from('tipo_documento').select('id,nombre').order('nombre'),
        supabase.from('evento_caracterizacion').select('id,nombre').order('nombre'),
        supabase.from('evento_entrega').select('id,nombre').order('nombre'),
        supabase.from('acta_firmada').select('id,nombre').order('nombre'),
      ]);
      setCatalogos({
        tipo_registro:          tr.data  ?? [],
        tipo_documento:         td.data  ?? [],
        evento_caracterizacion: ec.data  ?? [],
        evento_entrega:         ee.data  ?? [],
        acta_firmada:           af.data  ?? [],
      });
    } catch {
      toast.current?.show({ severity: 'warn', summary: 'Catálogos', detail: 'No se pudieron cargar los catálogos' });
    }
  }

  async function fetchBeneficiarios() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('beneficiarios')
        .select('*')
        .is('deleted_at', null)
        .order('nombre_completo');
      if (error) throw error;
      setRows(data ?? []);
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista' });
    } finally {
      setLoading(false);
    }
  }

  /* ── CRUD handlers ───────────────────────────────────── */
  function handleNew() {
    setSelected(null);
    setSidebarOpen(true);
  }

  function handleOpen(row: Beneficiario) {
    setSelected(row);
    setSidebarOpen(true);
  }

  function handleDelete(row: Beneficiario) {
    confirmDialog({
      message:         `¿Eliminar a "${row.nombre_completo}"? Esta acción es reversible.`,
      header:          'Confirmar eliminación',
      icon:            'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      rejectClassName: 'p-button-text',
      acceptLabel:     'Eliminar',
      rejectLabel:     'Cancelar',
      accept: async () => {
        try {
          const { error } = await supabase
            .from('beneficiarios')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', row.id!);
          if (error) throw error;
          toast.current?.show({ severity: 'success', summary: 'Eliminado', detail: 'Registro eliminado' });
          fetchBeneficiarios();
        } catch {
          toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar' });
        }
      },
    });
  }

  async function handleSave(data: Beneficiario) {
    try {
      if (data.id) {
        const { id, created_at, updated_at, deleted_at, ...patch } = data;
        const { error } = await supabase
          .from('beneficiarios')
          .update(patch)
          .eq('id', id);
        if (error) throw error;
        toast.current?.show({ severity: 'success', summary: 'Guardado', detail: 'Beneficiario actualizado' });
      } else {
        const { error } = await supabase.from('beneficiarios').insert(data);
        if (error) throw error;
        toast.current?.show({ severity: 'success', summary: 'Creado', detail: 'Beneficiario registrado' });
      }
      setSidebarOpen(false);
      fetchBeneficiarios();
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar' });
    }
  }

  /* ── Column templates ────────────────────────────────── */
  const tipoDocLabel = (id?: number | null) =>
    catalogos.tipo_documento.find(c => c.id === id)?.nombre ?? '—';

  const colDocumento = (row: Beneficiario) => (
    <span>
      <span style={{ color: 'var(--c-muted)', marginRight: 6, fontSize: '0.78rem' }}>
        {tipoDocLabel(row.tipo_documento_id)}
      </span>
      {row.numero_documento ?? '—'}
    </span>
  );

  const colAcciones = (row: Beneficiario) => (
    <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
      <Button
        icon="pi pi-pencil"
        size="small"
        text
        tooltip="Editar"
        tooltipOptions={{ position: 'left' }}
        onClick={() => handleOpen(row)}
      />
      <Button
        icon="pi pi-trash"
        size="small"
        text
        severity="danger"
        tooltip="Eliminar"
        tooltipOptions={{ position: 'left' }}
        onClick={() => handleDelete(row)}
      />
    </div>
  );

  /* ── Render ──────────────────────────────────────────── */
  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="module-bar">
        <div>
          <h1 className="module-title">Gestión de Beneficiarios</h1>
          <p className="module-count">{rows.length} registros activos</p>
        </div>
        <Button
          label="Nuevo beneficiario"
          icon="pi pi-plus"
          onClick={handleNew}
        />
      </div>

      <div className="search-bar" style={{ position: 'relative' }}>
        <i
          className="pi pi-search"
          style={{
            position: 'absolute', left: 12, top: '50%',
            transform: 'translateY(-50%)', color: 'var(--c-faint)',
            pointerEvents: 'none', zIndex: 1,
          }}
        />
        <InputText
          className="search-input"
          placeholder="Buscar nombre o documento..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ paddingLeft: 36 }}
        />
      </div>

      <DataTable
        value={rows}
        loading={loading}
        globalFilter={filter}
        globalFilterFields={['nombre_completo', 'numero_documento']}
        emptyMessage="Sin registros"
        rowHover
        size="small"
        scrollable
        scrollHeight="calc(100vh - 280px)"
      >
        <Column
          field="nombre_completo"
          header="Nombre completo"
          sortable
          style={{ fontWeight: 600 }}
        />
        <Column
          header="Documento"
          body={colDocumento}
          style={{ minWidth: '200px' }}
        />
        <Column
          header=""
          body={colAcciones}
          style={{ width: '96px' }}
        />
      </DataTable>

      <BeneficiarioSidebar
        visible={sidebarOpen}
        onHide={() => setSidebarOpen(false)}
        beneficiario={selected}
        catalogos={catalogos}
        onSave={handleSave}
      />
    </>
  );
}
