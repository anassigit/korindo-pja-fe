import React, { useState, useEffect } from "react";
import MetaTags from 'react-meta-tags';
import '../../config';
import RootPageCustom from '../../common/RootPageCustom';
import BootstrapTable from "react-bootstrap-table-next";
import {
  Container,
} from "reactstrap";

const Dashboard = () => {

  return (
    <RootPageCustom msgStateGet={null} msgStateSet={null}
      componentJsx={
        <>
          <React.Fragment>
            <MetaTags>
              <title>Korindo App</title>
            </MetaTags>
            <Container fluid={true}>
              <h4>Dashboard</h4>
              <br /><br />
            </Container>
          </React.Fragment>
        </>
      }
    />
  );

};

export default Dashboard;
