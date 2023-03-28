import { EndpointValidationError } from '@hilla/frontend';
import { Button } from '@hilla/react-components/Button.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { TextField } from '@hilla/react-components/TextField.js';

import Edificio from 'Frontend/generated/com/example/application/Edificio';
import { EdificioEndpoint } from 'Frontend/generated/endpoints';
import { useEffect, useState } from 'react';

import { FormikErrors, useFormik } from 'formik';

export default function EdificioView() {
  const empty: Edificio = { nombre: '', domicilio: '' };
  const [edificios, setEdificios] = useState(Array<Edificio>());

  useEffect(() => {
    (async () => {
      setEdificios(await EdificioEndpoint.findAll());
    })();

    return () => {};
  }, []);

  const createForm = useFormik({
    initialValues: empty,
    onSubmit: async (value: Edificio, { setSubmitting, setErrors }) => {
      try {
        const saved = (await EdificioEndpoint.save(value)) ?? value;
        setEdificios([...edificios, saved]);
        createForm.resetForm();
      } catch (e: unknown) {
        if (e instanceof EndpointValidationError) {
          const errors: FormikErrors<Edificio> = {};
          for (const error of e.validationErrorData) {
            if (typeof error.parameterName === 'string' && error.parameterName in empty) {
              const key = error.parameterName as string & keyof Edificio;
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

  async function updateNombre(edificio: Edificio, nombre: Edificio['nombre']) {
    if (edificio.nombre == nombre) return;

    const newEdificio = { ...edificio, nombre };
    const saved = (await EdificioEndpoint.save(newEdificio)) ?? newEdificio;
    setEdificios(edificios.map((item) => (item.id === edificio.id ? saved : item)));
  }

  async function updateDomicilio(edificio: Edificio, domicilio: Edificio['domicilio']) {
    if (edificio.domicilio == domicilio) return;

    const newEdificio = { ...edificio, domicilio };
    const saved = (await EdificioEndpoint.save(newEdificio)) ?? newEdificio;
    setEdificios(edificios.map((item) => (item.id === edificio.id ? saved : item)));
  }

  async function deleteEdificio(edificio: Edificio) {
    const deletedEdificioId = await EdificioEndpoint.delete(edificio);
    if (deletedEdificioId) {
      setEdificios(edificios.filter((t) => t.id != deletedEdificioId));
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
        <Button theme="primary" disabled={createForm.isSubmitting} onClick={createForm.submitForm}>
          Add
        </Button>
      </div>

      <div className="m-m flex flex-col items-stretch gap-s">
        {edificios.map((edificio) => (
          <div key={edificio.id}>
            <TextField
              name="nombre"
              value={edificio.nombre}
              onBlur={(e: any) => updateNombre(edificio, e.target.value)}
            />
            <TextField
              name="domicilio"
              value={edificio.domicilio}
              onBlur={(e: any) => updateDomicilio(edificio, e.target.value)}
            />
            <Button onClick={() => deleteEdificio(edificio)}>X</Button>
          </div>
        ))}
      </div>
    </>
  );
}
