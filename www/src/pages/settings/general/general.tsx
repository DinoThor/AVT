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
  Radio,
  RadioGroup,
  InputPicker,
  Modal
} from 'rsuite';
const GeneralSettings = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const styles = {
    radioGroupLabel: {
      padding: '8px 12px',
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  };

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
          <h3>Parámetros</h3>
        }
        bordered
        style={{ background: '#fff', width: 600 }}
      >

        <Divider />
        <Form fluid>
          <Form.Group>
            <Form.ControlLabel>Intervalo de muestreo</Form.ControlLabel>
            <Form.Control
              name="intervalData"
              placeholder='Seleccione'
              accepter={InputPicker}
              data={[5, 10, 15, 30, 60].map(i => ({ label: i, value: i }))}
              block
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Correo del administrador</Form.ControlLabel>
            <InputGroup>
              <InputGroup.Addon> @</InputGroup.Addon>
              <Form.Control name="input-group" />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <RadioGroup appearance="picker" inline>
              <span style={styles.radioGroupLabel}>Medio de comunicación preferente </span>
              <Radio value="email" >Email</Radio>
              <Radio value="call">Llamada</Radio>
            </RadioGroup>
          </Form.Group>
          <Form.Group>
            <Button
              appearance="primary"
              onClick={handleOpen}
              block>Guardar</Button>
          </Form.Group>
        </Form>
      </Panel>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Cambios guardados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Los cambios han sido almacenados correctamente</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Stack>
  );
}
export default GeneralSettings;