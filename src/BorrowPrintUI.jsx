import React from "react";


class BorrowPrint extends React.Component{

    state = {
        amount :0,
        description:""
    }
    render(){
        const { dt , addAMount } = this.props
        return(
            <>

           
     <div key={dt.Name} className="col">
            <div className="card h-100">
                <img src="https://i.redd.it/b3esnz5ra34y.jpg" className="card-img-top card_image" alt="..."/>
                    <div className="card-body">
                        <h3 className="card-title">{dt.Name}</h3>
                        <input onChange={(g)=>this.setState({description:g.target.value})} type="text" name={dt.Name} className="form-control borrow_input_color" placeholder="Description" />
                        <input onChange={(g)=>this.setState({amount:g.target.value})} type="number" name={dt.Name} className="form-control borrow_input_color" placeholder="Amount" />
                        <button onClick={()=>addAMount(dt._id,this.state.description,this.state.amount)}className={"btn btn-dark add_btn mt-3 form-control"}>Add</button>
                    </div>
            </div>  
            </div> 
           
            </>
        )
    }
}



  
    
  
 


export default BorrowPrint
