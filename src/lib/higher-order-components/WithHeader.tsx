import React, { ComponentType, FunctionComponent } from "react";
import { Box } from "@chakra-ui/react";

const withHeader =
  (WrappedComponent: ComponentType): FunctionComponent =>
  (props) =>
    (
      <>
        <Box bg="red.500" color="white" p={4} />
        <WrappedComponent {...props} />
      </>
    );

export default withHeader;
