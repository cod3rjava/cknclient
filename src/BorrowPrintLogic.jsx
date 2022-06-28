import React from "react";
import axios from "axios";
import BorrowPrint from "./BorrowPrintUI";
// import Input from '@mui/material/Input';

class BorrowPrintLogic extends React.Component{
    state ={
        totalborow : [],
        cost : "",
        mg : "",
        creditAmount :0,
        debitAmount:0,
        description:""
    }
    borrowCall = ()=>{
        axios.get("http://127.0.0.1:8888/getBorrower")
        .then(res=>{
            var totalborow = res.data;
            this.setState({totalborow : totalborow})
        })
    }
    componentDidMount(){
        this.borrowCall()
    }
    setCredit = (value)=>{
        this.setState({creditAmount : value})
    }
    setDebit = (value)=>{
        this.setState({debitAmount : value})
    }




    addAMount =(id)=>{

        
        axios.get(`http://127.0.0.1:8888/getBorrowById/${id}`)
        .then(res=>{

            var oldData = res.data[0]
            var debitAmount = "debitAmount";
            var creditAmount = "creditAmount";
            var totalAmount = "totalAmount";
            var descriptionName = "description";
            var newDebitAmount = this.state.debitAmount;
            var newCreditAmount = this.state.creditAmount;
            var  descriptionValue = this.state.description;

            var newTotalData = {
                [debitAmount]: parseInt(newDebitAmount) + oldData[debitAmount],
                [creditAmount]: parseInt(newCreditAmount) + oldData[creditAmount],
                [totalAmount]:(parseInt(newCreditAmount)+oldData[creditAmount]) - (parseInt(newDebitAmount) + oldData[debitAmount]),
                [descriptionName]:oldData[descriptionName]
            }
            let newDescription = {
                [descriptionName]:descriptionValue,
                currentDebitAmount : parseInt(newDebitAmount),
                currentCreditAmount:parseInt(newCreditAmount),
                date: new Date().toLocaleDateString()
            }
            newTotalData[descriptionName].push(newDescription)
                
            axios.put(`http://127.0.0.1:8888/updateBorrowAmountById/${id}`,newTotalData)
            .then(res=>{
                console.log("New Amount add")
                console.log(res.data)
                this.borrowCall() 
                this.setState({debit:0,
                    credit:0
                })
            }) 
        })
    }
    render(){
        return(
           <>
            <div className="row row-cols-2 row-cols-md-6 g-1 mt-5">
                {this.state.totalborow.map(dt=>
                        <BorrowPrint
                        dt={dt}
                        addAMount={this.addAMount}
                        setCredit={this.setCredit}
                        setDebit={this.setDebit}
                        />
                )}
                {/* <Input/> */}
                 </div>
          

           </>
        )
    }
}
export default  BorrowPrintLogic