import React, {Component} from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
class Paypal extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        const onSuccess = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was successed!', data);
            this.props.onSuccess(data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }
        
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }
        
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let total = this.props.total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        let item_list = this.props.item_list;
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
        
        const client = {
            sandbox:    'AaVy_UGD0Klh6vWcSv5N5vy2XgcteVg4x9o5IbFRbtYX-LgP-P3_ASa28RsemZ_T-ge11vDabf_j94Ra',
            production: 'YOUR-PRODUCTION-APP-ID',
        }

        return ( 
            <div>
                <PaypalExpressBtn 
                    env={env} 
                    item_list={item_list}
                    client={client} 
                    currency={currency} 
                    total={total} 
                    onError={onError} 
                    onSuccess={onSuccess} 
                    onCancel={onCancel} 
                    style={{
                        size:'large',
                        color:'blue',
                        shape:'rect',
                        label: ''
                    }}
                    />
            </div>
        );
    }
}
 
export default Paypal;