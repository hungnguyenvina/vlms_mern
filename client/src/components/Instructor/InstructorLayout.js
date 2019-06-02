import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LeftMenu from './LeftMenu';
import  { Layout } from 'element-react';

const InstructorLayout = (props) => {
    return ( 
        <div>
            <Header {...props} />
            <Layout.Row className="tac">
                <Layout.Col xs="24" sm="24" md="24" lg="4">
                    <LeftMenu {...props}  />
                </Layout.Col>
            <Layout.Col xs="24" sm="24" md="24" lg="20">
                {props.children}
            </Layout.Col>
            </Layout.Row>
            <Footer />
        </div>
    );
}
 
export default InstructorLayout;