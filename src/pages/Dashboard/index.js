import React from "react"
import MetaTags from 'react-meta-tags'
import '../../config'
import RootPageCustom from '../../common/RootPageCustom'
import { Container } from "reactstrap"

const Dashboard = () => {

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    <MetaTags>
                        <title>DMLS</title>
                    </MetaTags>
                    <Container fluid="true">
                        <h4>Dashboard</h4>
                        <br /><br />
                    </Container>
                </React.Fragment>
            }
        />
    )

}

export default Dashboard