import React from "react";
import axios from "axios";
import Cardprint from "./CardprintUI";

class Home extends React.Component{
    state ={
        totalcategory : [],
        cost : "",
        mg : ""
    }
    categoryCall = ()=>{debugger
        axios.get("http://127.0.0.1:8888/getCategory")
        .then(res=>{
            var totalcategory = res.data;
            this.setState({totalcategory : totalcategory})
        })
    }
    componentDidMount(){debugger
        this.categoryCall()
    }
    
    addCost =(name,value)=>{debugger
        axios.get("http://127.0.0.1:8888/getDailyExpenseByDate")
        .then(res=>{debugger
            var nll = (value === null || value === undefined) ? 0 : value
            var old = res.data[0]
            var id = old._id
            var date = old.Date.replaceAll("/","-") 
            var oldAmount = old[name]
            var newAmount = parseInt(nll)
            var data = { 
               [name] : newAmount + oldAmount
            }

            debugger
            axios.put(`http://127.0.0.1:8888/updateDailyExpenseByDate/${date}`,data)
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
            <div className="row row-cols-1 row-cols-md-5 g-2 mt-5">
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