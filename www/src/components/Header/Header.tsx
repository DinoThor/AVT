import React from 'react';
import { Stack, Button, } from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';

const Header = () => {
  return (
    <Stack className="header">
      <Button color='red' appearance='subtle'>
        <CloseIcon />
      </Button>
    </Stack>
  );
};

export default Header;
