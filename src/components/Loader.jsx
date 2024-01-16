import React from "react";

import { Grid } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Grid
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
       
    />
);
};

export default Loader;
