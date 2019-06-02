import React from 'react';
import Header from './Header';
import Footer from './Footer';
import  { Layout } from 'element-react';

const HomeLayout = (props) => {
    return ( 
        <div>
            <Header {...props} />
            <Layout.Row className="tac">
            <Layout.Col xs="24" sm="24" md="24" lg="24">
                {props.children}
            </Layout.Col>
            </Layout.Row>
            <Footer />
        </div>
    );
}
 
export default HomeLayout;