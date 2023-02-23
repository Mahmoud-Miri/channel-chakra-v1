import React, { ComponentType, FunctionComponent } from "react";
import Nav from "../../components/Nav";

const withNavbar =
  (WrappedComponent: ComponentType): FunctionComponent =>
  (props) =>
    (
      <>
        <Nav />
        <WrappedComponent {...props} />
      </>
    );

export default withNavbar;
