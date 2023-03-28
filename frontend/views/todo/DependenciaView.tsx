import { EndpointValidationError } from '@hilla/frontend';
import { Button } from '@hilla/react-components/Button.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { TextField } from '@hilla/react-components/TextField.js';

import { ComboBox } from '@hilla/react-components/ComboBox.js';

import Edificio from 'Frontend/generated/com/example/application/Edificio';
import Dependencia from 'Frontend/generated/com/example/application/Dependencia';
import { DependenciaEndpoint } from 'Frontend/generated/endpoints';
import { EdificioEndpoint } from 'Frontend/generated/endpoints';
import { useEffect, useState } from 'react';

import { FormikErrors, useFormik } from 'formik';

export default function DependenciaView() {
  const empty: Dependencia = { nombre: '', domicilio: '' };
  const [dependencias, setDependencias] = useState(Array<Dependencia>());
  const [edificios, setEdificios] = useState(Array<Edificio>());

  useEffect(() => {
    (async () => {
        setDependencias(await DependenciaEndpoint.findAll());        
       setEdificios(await EdificioEndpoint.findAll());
      


    })();

    return () => {};
  }, []);
 

  
  const createForm = useFormik({
    initialValues: empty,
    onSubmit: async (value: Dependencia, { setSubmitting, setErrors }) => {
      try {
        const saved = (await DependenciaEndpoint.save(value)) ?? value;
        setDependencias([...dependencias, saved]);
        createForm.resetForm();
      } catch (e: unknown) {
        if (e instanceof EndpointValidationError) {
          const errors: FormikErrors<Dependencia> = {};
          for (const error of e.validationErrorData) {
            if (typeof error.parameterName === 'string' && error.parameterName in empty) {
              const key = error.parameterName as string & keyof Dependencia;
              errors[key] = error.message;
            }
          }
          setErrors(errors);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  async function updateNombre(dependencia: Dependencia, nombre: Dependencia['nombre']) {
    if (dependencia.nombre == nombre) return;
    const newDependencia = { ...dependencia, nombre };
    const saved = (await DependenciaEndpoint.save(newDependencia)) ?? newDependencia;
    setDependencias(dependencias.map((item) => (item.id === dependencia.id ? saved : item)));
  }

  async function updateDomicilio(dependencia: Dependencia, domicilio: Dependencia['domicilio']) {
    if (dependencia.domicilio == domicilio) return;

    const newDependencia = { ...dependencia, domicilio };
    const saved = (await DependenciaEndpoint.save(newDependencia)) ?? newDependencia;
    setDependencias(dependencias.map((item) => (item.id === dependencia.id ? saved : item)));
  }


  async function updateEdificio(dependencia: Dependencia, edificio: Dependencia['edificio']) {
    if (dependencia.edificio == edificio) return;

    const newDependencia = { ...dependencia, edificio };
    const saved = (await DependenciaEndpoint.save(newDependencia)) ?? newDependencia;
    setDependencias(dependencias.map((item) => (item.id === dependencia.id ? saved : item)));
  }
 




  async function deleteEdificio(edificio: Dependencia) {
    const deletedEdificioId = await DependenciaEndpoint.delete(edificio);
    if (deletedEdificioId) {
      setDependencias(dependencias.filter((t) => t.id != deletedEdificioId));
    }
  }
  async function setSelecEdificio(id?: Number) {
    console.log("setSelecEdificio El id seleccionado en "+ id);
    if(id){
      console.log(EdificioEndpoint.findById(Number(id)));
      createForm.setFieldValue("edificio",await EdificioEndpoint.findById(Number(id)));
    }
  }
  
  return (
    <>
      <div className="m-m flex items-baseline gap-m">
        <TextField
          name="nombre"
          label="nombre"
          value={createForm.values.nombre}
          onChange={createForm.handleChange}
          onBlur={createForm.handleChange}
        />
         <TextField
          name="domicilio"
          label="domicilio"
          value={createForm.values.domicilio}
          onChange={createForm.handleChange}
          onBlur={createForm.handleChange}
        />

        <ComboBox
            name ='edificio'
            label='Edificio'
            itemLabelPath='nombre'
            itemValuePath='id'
            items={edificios}
            onSelectedItemChanged={e => setSelecEdificio(e.detail.value?.id)}
          />

        
      
        <Button theme="primary" disabled={createForm.isSubmitting} onClick={createForm.submitForm}>
          Add
        </Button>
      </div>

      <div className="m-m flex flex-col items-stretch gap-s">
        {dependencias.map((dependencia) => (
          <div key={dependencia.id}>
            <TextField
              name="nombre"
              value={dependencia.nombre}
              onBlur={(e: any) => updateNombre(dependencia, e.target.value)}
            />
            <TextField
              name="domicilio"
              value={dependencia.domicilio}
              onBlur={(e: any) => updateDomicilio(dependencia, e.target.value)}
            />

             <TextField
              name="edificio"
              value={dependencia.edificio?.nombre}
              onBlur={(e: any) => updateEdificio(dependencia, e.target.value)}
            />

          
            
           


            <Button onClick={() => deleteEdificio(dependencia)}>X</Button>
          </div>
        ))}
      </div>
    </>
  );
}