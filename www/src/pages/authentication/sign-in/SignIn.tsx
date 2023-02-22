import React from 'react';
import { Panel, IconButton, Stack, Divider, Modal, Button } from 'rsuite';
import Avatar from 'rsuite/Avatar';

const SignUp = () => {
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
        bordered
        style={{ background: '#fff', width: 500 }}
        header={<h3>Cambiar de usuario</h3>}
      >
        <Divider />

        <IconButton
          appearance='subtle'
          icon={<Avatar size='lg' src="https://avatars.githubusercontent.com/u/12592949" />}
          onClick={handleOpen}
          block>
          <h3>Carlos</h3>
        </IconButton>
        <IconButton
          appearance='subtle'
          icon={<Avatar size='lg' src="https://images.generated.photos/xXpm8H5F4Lyye9-Hqr9lsJ3N_h_OVHm4a41ejvlQtag/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODM1MjAwLmpwZw.jpg" />}
          onClick={handleOpen}
          block>
          <h3>Julio</h3>
        </IconButton>
        <IconButton
          appearance='subtle'
          icon={<Avatar size='lg' src="https://static.vecteezy.com/system/resources/thumbnails/001/546/003/small/indian-woman-s-face-avatar-free-vector.jpg" />}
          onClick={handleOpen}
          block>
          <h3>María</h3>
        </IconButton>
        <IconButton
          appearance='subtle'
          icon={<Avatar size='lg' src="https://pbs.twimg.com/profile_images/606488041943736321/03xM7ged_400x400.jpg" />}
          onClick={handleOpen}
          block>
          <h3>José</h3>
        </IconButton>
        <IconButton
          appearance='subtle'
          icon={<Avatar size='lg' src="https://img.freepik.com/premium-vector/young-black-man-face-with-beard-male-portrait-avatar-flat-style-front-view_497399-251.jpg?w=360" />}
          onClick={handleOpen}
          block>
          <h3>Pedro</h3>
        </IconButton>

      </Panel>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Usuario cambiado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>El usuario ha sido cambiado. ¡Bienvenido!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Stack>
  );
};

export default SignUp;
