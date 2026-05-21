'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import type { Beneficiario, Catalogos } from './types';

interface Props {
  visible:      boolean;
  onHide:       () => void;
  beneficiario: Beneficiario | null;
  catalogos:    Catalogos;
  onSave:       (data: Beneficiario) => void;
}

const empty: Beneficiario = {
  nombre_completo:           '',
  tipo_documento_id:         null,
  numero_documento:          '',
  tipo_registro_id:          null,
  evento_caracterizacion_id: null,
  evento_entrega_id:         null,
  acta_firmada_id:           null,
};

export default function BeneficiarioSidebar({
  visible, onHide, beneficiario, catalogos, onSave,
}: Props) {
  const [form, setForm] = useState<Beneficiario>(empty);

  useEffect(() => {
    setForm(beneficiario ?? empty);
  }, [beneficiario, visible]);

  const set = (field: keyof Beneficiario, value: unknown) =>
    setForm(prev => ({ ...prev, [field]: value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  const title = beneficiario ? 'Editar beneficiario' : 'Nuevo beneficiario';

  return (
    <Sidebar
      visible={visible}
      onHide={onHide}
      position="right"
      style={{ width: '420px' }}
      header={<span style={{ fontWeight: 700, fontSize: 16 }}>{title}</span>}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Nombre completo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label>Nombre completo *</label>
          <InputText
            value={form.nombre_completo}
            onChange={e => set('nombre_completo', e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>

        {/* Tipo documento */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label>Tipo de documento</label>
          <Dropdown
            value={form.tipo_documento_id}
            options={catalogos.tipo_documento}
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccionar..."
            onChange={e => set('tipo_documento_id', e.value)}
            style={{ width: '100%' }}
            showClear
          />
        </div>

        {/* Número documento */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label>Número de documento</label>
          <InputText
            value={form.numero_documento ?? ''}
            onChange={e => set('numero_documento', e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        {/* Tipo registro */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label>Tipo de registro</label>
          <Dropdown
            value={form.tipo_registro_id}
            options={catalogos.tipo_registro}
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccionar..."
            onChange={e => set('tipo_registro_id', e.value)}
            style={{ width: '100%' }}
            showClear
          />
        </div>

        {/* Evento caracterización */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label>Evento de caracterización</label>
          <Dropdown
            value={form.evento_caracterizacion_id}
            options={catalogos.evento_caracterizacion}
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccionar..."
            onChange={e => set('evento_caracterizacion_id', e.value)}
            style={{ width: '100%' }}
            showClear
          />
        </div>

        {/* Evento entrega */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label>Evento de entrega</label>
          <Dropdown
            value={form.evento_entrega_id}
            options={catalogos.evento_entrega}
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccionar..."
            onChange={e => set('evento_entrega_id', e.value)}
            style={{ width: '100%' }}
            showClear
          />
        </div>

        {/* Acta firmada */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label>Acta firmada</label>
          <Dropdown
            value={form.acta_firmada_id}
            options={catalogos.acta_firmada}
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccionar..."
            onChange={e => set('acta_firmada_id', e.value)}
            style={{ width: '100%' }}
            showClear
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Button
            type="submit"
            label="Guardar"
            icon="pi pi-check"
            style={{ flex: 1 }}
          />
          <Button
            type="button"
            label="Cancelar"
            icon="pi pi-times"
            text
            onClick={onHide}
          />
        </div>

      </form>
    </Sidebar>
  );
}
