import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'rsuite'
import { Stack } from 'rsuite';

const Brand = props => {
  return (
    <Stack className="brand" {...props}>
      <Avatar circle style={{margin: 15}}>🙂</Avatar>
      {/* <Logo height={26} style={{ marginTop: 6 }} /> */}
      <Link to="/">dev</Link>
    </Stack>
  );
};

export default Brand;
