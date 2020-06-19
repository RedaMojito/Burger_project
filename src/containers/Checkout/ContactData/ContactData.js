import React, { Component } from "react";

import Button from "../../UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";
import Select from "../../UI/Select/Select";
class ContactData extends Component {
  state = {
    orderForm: {
        name: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Your Name", 
            },
            value: "",
            validation :{
              requiered: true
            },
            valid: false,
            touched: false  
          },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street", 
        },
        value: "", 
        validation :{
          requiered: true
        },
        valid: false,
        touched: false   
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation :{
          requiered: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false   
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation :{
          requiered: true
        },
        valid: false,
        touched: false   
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        validation :{
          requiered: true
        },
        valid: false,
        touched: false   
      },
    deliveryMethod: {
            elementType: "select",
            elementConfig: {
            options: [
                { optionValue: "fastest", displayValue: "Fastest" },
                { optionValue: "cheapest", displayValue: "Cheapest" },
                { optionValue: "slowest", displayValue: "Slowest" }
            ],
            },
            value: "fastest",
            validation: {},
            valid: true
        }
    },
    loading: false,
    formIsValid: false
  };

  /*componentDidMount() {
    console.log(
        this.state.orderForm.deliveryMethod.elementConfig.options
    );
    console.log(this.state.orderForm.country.elementConfig.placeholder);
  }*/


  checkValidity(rules, value){
    let isValid = true;
      if(rules.requiered){
            isValid = value.trim() !== '' && isValid;
          
    }
    
    
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler= (e, inputIdentifier) =>{
    const updatedOrderForm ={
        ...this.state.orderForm
    };
    const updatedFormElement ={
       ...updatedOrderForm[inputIdentifier] 
    };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.validation, updatedFormElement.value);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formisValid = true;
    for(let inputIdentifier in updatedOrderForm){
      formisValid = updatedOrderForm[inputIdentifier].valid && formisValid;
    }
    this.setState({orderForm : updatedOrderForm, formisValid: formisValid});
  }

  orderHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for(let formDataIdentifier in this.state.orderForm){
        formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value;
    }
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderForm: formData
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
        console.log(this.props.ingredients);
        console.log(this.state.orderForm);
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    //  const firstOptionValue = this.state.orderForm.deliveryMethod.elementConfig.options[1].optionValue;
    // const firstDisplayValue = this.state.orderForm.deliveryMethod.elementConfig.options[0].displayValue;
    const elementFormArray = [];
    for (let key in this.state.orderForm) {
      elementFormArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
   // const optionList = this.state.orderForm.deliveryMethod.elementConfig.options;
    let form = (
      <form onSubmit={this.orderHandler}>
        {elementFormArray.map((elementForm) => (
          <Input
            key={elementForm.id}
            elementType={elementForm.config.elementType}
            elementConfig={elementForm.config.elementConfig}
            value={elementForm.config.value}
            invalid={!elementForm.config.valid}
            changed={(e)=> this.inputChangedHandler(e, elementForm.id)}
            shouldValidat={elementForm.config.validation}
            touched={elementForm.config.touched}
            //   optionValues={firstOptionValue}
            //      optionDisplay={firstDisplayValue}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter you Contact Data</h4>

        {form}
      </div>
    );
  }
}

export default ContactData;
