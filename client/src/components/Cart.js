import React, {Component} from 'react';
import {Table, Button} from 'element-react';
import { loadMultipleCourses,removeCourseFromCart } from '../redux/action/CartAction';
import { saveUserTransaction } from '../redux/action/TransactionAction';
import {hoc} from '../components/hoc/hoc';
import renderHTML from 'react-render-html';
import Paypal from '../components/util/paypal';
import HomeLayout from './HomeLayout';
class Cart extends Component {
    constructor(props) {
     
        super(props);
        let me=this;
        this.state = { 
            total : 0,
            showSuccess:false,
            message:'ok',
            columns: [
                {
                  label: "Course",
                  prop: "course_title",
                  width: 500,
                  align: 'center',
                  render: function(data){
                    return (
                    <span>
                      <span style={{marginLeft: '0px',textAlign:'left'}}>{data.course_title}</span>
                    </span>)
                  }
                },
                {
                  label: "Price ($)",
                  prop: "price",
                  width: 100,
                  align: 'center',
                },
                {
                  label: "Quantity",
                  prop: "quantity",
                  width: 100,
                  align: 'center',
                },
                {
                  label: "Subtotal($)",
                  prop: "subTotal",
                  width: 200,
                  align: 'right',
                },
                {
                  label: "Action",
                  prop: "course_id",
                  width: 100,
                  align: 'center',
                  render: function(data){
                    const courseId = data.course_id;
                    if(courseId=='') {
                      return (
                        <span>
                         
                        </span>)
                      }
                    else {
                      return (
                        <span>
                          <Button onClick={()=>me.removeCartItem({data})} style={{marginBottom:'10px'}}  size="small" type="success">Remove</Button>
                        </span>
                        )
                    }
                  }
                },
              ],
              data: [],
              dataForSave:[],
              item_list:{}
         }
    }

    removeCartItem = (data) => {
      //console.log(data);
      const courseID = data.data.course_id;
      //alert('delete course with id:'+courseID);
      this.props.removeCourseFromCart(courseID);
    }
    componentWillReceiveProps(nextProps) {
      //console.log('componentWillReceiveProps');
      //console.log(nextProps);
      const cartDetail = nextProps.cartDetail;
      let data=[];
      let total=0;
      let item_list_array=[];
      //course_title: 'React - The Complete Guide (including Hooks, Redux, React Router)',
      //          price: 29,
      //          quantity: 1,
      //          subTotal: 29
      cartDetail.forEach(item=>{
        data.push({
          course_id: item.id,
          course_title: item.title,
          price: item.fee,
          quantity: item.quantity,
          subTotal: item.fee*item.quantity 
        });

        item_list_array.push({
          name: item.title,
          description: item.title,
          quantity: item.quantity,
          price: item.fee,
          tax:'0.00',
          sku: item.id,
          currency: 'USD'
        });

        total+= item.fee*item.quantity;
      })

      let item_list_object = 
      {
        items: item_list_array,
      };

      let dataForSave = [...data];

      const totalHtml = renderHTML('<strong>Total</strong> : $' + total );
      data.push({
        course_id: '',
        course_title: '',
        price: '',
        quantity: '',
        subTotal: totalHtml
      });

      this.setState({data,total,dataForSave,item_list:item_list_object});
    }
    componentDidMount(){
      //alert(window.location.href);
      //console.log('component did mount....');
      //console.log(this.props.user);
      let courseIDArray = [];
      const cart = this.props.user.cart;
      cart.forEach(item => {
        courseIDArray.push(item.id);
      });

      //console.log(courseIDArray);
      this.props.loadMultipleCourses(courseIDArray, cart);
    }

    transactionError = (data) => {

    }

    transactionCanceled = (data) => {

    }

    transactionSuccess = (data) => {
      console.log('user info');
      console.log(this.props.users);
      console.log(data);

      const userTransactionObj = {
        id: data.transactionID,
        transaction_id: data.transactionID,
        transaction_date: data.transactionDate,
        user_id: this.props.users.user.id,
        user_name: this.props.users.user.email,
        payer_id: data.payerID,
        payer_email: data.email,
        payer_name: data.payerName,
        total_amount: this.state.total,
        currency_code: 'USD',
        order_details: this.state.dataForSave,
        transaction_details: this.state.dataForSave,
        status: data.paymentStatus
      }

      console.log('transaction detail......................');
      console.log(userTransactionObj);
      this.props.saveUserTransaction(userTransactionObj);
      this.setState({
        showSuccess: true,
        message: 'Congratulation! You have successfully enrolled in these courses. You can take these courses now.'
        
      })
    }

    render() { 
        return ( 
          <HomeLayout {...this.props}>
            <React.Fragment>
                <h1>Your shoppping cart:</h1>
                <Table
                   style={{width: '1005px', margin: '20px auto'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    stripe={true}
                />
                <Paypal 
                  total={this.state.total}
                  item_list={this.state.item_list}
                  transactionError={(data)=>this.transactionError(data)}  
                  transactionCanceled={(data)=>this.transactionCanceled(data)}  
                  onSuccess={(data)=>this.transactionSuccess(data)}>  
                </Paypal>
                <div style={{display:this.state.showSuccess===true?'block':'none'}}>
                      {this.state.message}
                </div>
            </React.Fragment>
          </HomeLayout>
        );
    }
}
 
const mapStateToProps = state => {
  //console.log('mapStateToProps in cart');
  //console.log(state.carts);
  return {
    loginSuccess : state.users.loginSuccess,
    users: state.users,
    cartDetail: state.carts.cartDetail
  };
}

const mapDispatchToProps = dispatch => ({
  loadMultipleCourses: (courseIDArray,userCart) => dispatch(loadMultipleCourses(courseIDArray,userCart)),
  removeCourseFromCart: (courseID) => dispatch(removeCourseFromCart(courseID)),
  saveUserTransaction: (transaction) => dispatch(saveUserTransaction(transaction))
});

export default hoc(Cart,mapStateToProps,mapDispatchToProps);