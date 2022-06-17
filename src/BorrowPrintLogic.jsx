import React from "react";
import axios from "axios";
import BorrowPrint from "./BorrowPrintUI";
// import Input from '@mui/material/Input';

class BorrowPrintLogic extends React.Component{
    state ={
        totalborow : [],
        cost : "",
        mg : ""
    }
    
    borrowCall = ()=>{debugger
        axios.get("http://127.0.0.1:8888/getBorrower")
        .then(res=>{
            var totalborow = res.data;
            this.setState({totalborow : totalborow})
        })
    }
    componentDidMount(){
        this.borrowCall()
    }
    addAMount =(id,discription,value)=>{debugger

        console.log(id,discription,value)
        axios.get(`http://127.0.0.1:8888/getBorrowById/${id}`)
        .then(res=>{debugger
            var old = res.data[0]
            var oldAmount = old.Amount;
            var oldDicription = old.Description;
            var data = { 
               Amount : parseInt(value) + parseInt(oldAmount),
               Description : oldDicription  + discription + ",",
            }
            debugger
            axios.put(`http://127.0.0.1:8888/updateBorrowAmountById/${id}`,data)
            .then(res=>{debugger
                console.log("New Amount add")
                console.log(res.data)
                this.borrowCall() 
                document.getElementById("decription").value=""
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
                        />
                )}
                {/* <Input/> */}
                 </div>
          

           </>
        )
    }
}
export default  BorrowPrintLogic