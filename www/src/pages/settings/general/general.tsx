import React from 'react';

import {
  Form,
  Button,
  Panel,
  InputGroup,
  Stack,
  Checkbox,
  Divider,
  MaskedInput,
  DatePicker
} from 'rsuite';
const GeneralSettings = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{
        height: '100vh'
      }}
    >
      <Panel
        header={
          <>
            <h3>Parámetros</h3>
            <h5>General</h5>
          </>
        }
        bordered
        style={{ background: '#fff', width: 600 }}
      >

        <Divider />

        <Form fluid>
          <Form.Group>
            <Form.ControlLabel>Nombre</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Fecha de cumpleaños</Form.ControlLabel>
            <DatePicker placeholder="Seleccione la fecha" block />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Email</Form.ControlLabel>
            <InputGroup>
              <InputGroup.Addon> @</InputGroup.Addon>
              <Form.Control name="input-group" />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId='phone'>
            <Form.ControlLabel>Teléfono</Form.ControlLabel>
            <Form.Control
              name="phone"
              accepter={MaskedInput}
              placeholder="123 - 45 - 67 - 89"
              mask={[
                /\d/,
                /\d/,
                /\d/,
                ' ',
                '-',
                ' ',
                /\d/,
                /\d/,
                ' ',
                '-',
                ' ',
                /\d/,
                /\d/,
                ' ',
                '-',
                ' ',
                /\d/,
                /\d/
              ]}
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Género</Form.ControlLabel>
            <Form.Control name="confirm-password" type="password" />
          </Form.Group>

          <Form.Group>
            <Stack style={{ marginLeft: -10 }}>
              <Checkbox>Acepto el uso continuado de la cámara</Checkbox>
            </Stack>
          </Form.Group>

          <Form.Group>
            <Button appearance="primary" block>Registrarse</Button>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
  );
}
export default GeneralSettings;