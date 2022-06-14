import React from "react";
import axios from "axios";
import BorrowPrint from "./BorrowPrintUI";


class BorrowPrintLogic extends React.Component{
    state ={
        totalborow : [],
        cost : "",
        mg : ""
    }
    borrowCall = ()=>{
        axios.get("http://127.0.0.1:8888/getBorrow")
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
            // console.log(old)
            // var id = old._id ;
            var oldAmount = old.Amount;
            var oldDicription = old.Description;
            // console.log(id,oldAmount,oldDicription)

            // var newAmount = parseInt(nll)

            var data = { 
               Amount : value + oldAmount,
               Description : oldDicription + "," + discription,
            }
            debugger
            axios.put(`http://127.0.0.1:8888/updateBorrowAmount/${id}`,data)
            .then(res=>{debugger
                console.log("New Amount add")
                console.log(res.data)
            })              
        })
    }
    render(){
        return(
           <>
            <div className="row row-cols-1 row-cols-md-5 g-1">
                {this.state.totalborow.map(dt=>
                        <BorrowPrint
                        dt={dt}
                        addAMount={this.addAMount}
                        />
                )}
                 </div>
          

           </>
        )
    }
}
export default  BorrowPrintLogic