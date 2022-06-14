import React from "react";
import axios from "axios";
import Cardprint from "./CardprintUI";

class Home extends React.Component{
    state ={
        totalcategory : [],
        cost : "",
        mg : ""
    }
    categoryCall = ()=>{
        axios.get("http://127.0.0.1:8888/getcategory")
        .then(res=>{
            var totalcategory = res.data;
            this.setState({totalcategory : totalcategory})
        })
    }
    componentDidMount(){
        this.categoryCall()
    }
    
    addCost =(name,value)=>{debugger
        axios.get("http://127.0.0.1:8888/getLastRecord")
        .then(res=>{debugger
            var nll = (value === null || value === undefined) ? 0 : value
            var old = res.data[0]
            var id = old._id 
            var oldAmount = old[name]
            var newAmount = parseInt(nll)
            var data = { 
               [name] : newAmount + oldAmount
            }

            debugger
            axios.put(`http://127.0.0.1:8888/updateLastRecord/${id}`,data)
            .then(res=>{debugger
                console.log("update success")
                console.log(res.data)
                this.setState({cost:0})
            })              
        })
    }
    render(){
        return(
           <>
            <div className="row row-cols-1 row-cols-md-5 g-1">
                {this.state.totalcategory.map(dt=>
                        <Cardprint
                        dt={dt}
                        addCost={this.addCost}
                        />
                        
                )}

                 </div>
          

           </>
        )
    }
}
export default Home