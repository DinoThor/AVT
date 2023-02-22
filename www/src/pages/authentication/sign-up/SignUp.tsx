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
  DatePicker,
  InputPicker,
  Modal
} from 'rsuite';

const SignIn = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
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
        header={<h3>Nuevo usuario</h3>}
        bordered
        style={{ background: '#fff', width: 400 }}
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
            <Form.Control
              name="gender"
              placeholder='Seleccione'
              accepter={InputPicker}
              data={['Hombre', 'Mujer'].map(i => ({ label: i, value: i }))}
              block
            />
          </Form.Group>

          <Form.Group>
            <Stack style={{ marginLeft: -10 }}>
              <Checkbox>Acepto el uso continuado de la cámara</Checkbox>
            </Stack>
          </Form.Group>

          <Form.Group>
            <Button 
            appearance="primary" 
            onClick={handleOpen}
            block>Registrarse</Button>
          </Form.Group>
        </Form>
      </Panel>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Usuario creado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>El usuario ha sido creado correctamente</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Continuar
          </Button>

        </Modal.Footer>
      </Modal>
    </Stack>
  );
};

export default SignIn;
