import { Header, Button, FlexboxGrid } from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';


function Titlebar() {
  return (
    <Header style={{ margin: '' }}>
      <FlexboxGrid align='end' style={{ marginBottom: 20 }}>
        <Button color='red' appearance='subtle'>
          <CloseIcon />
        </Button>
      </FlexboxGrid>
    </Header>
  );
}

export default Titlebar;