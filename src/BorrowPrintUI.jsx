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
            <div key={dt.Name} className="col borrow_card">
                <div className="card h-100">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTl729YLKHsaDiYJ4omBiS1boX8XsbRX6X-w&usqp=CAU" className="card-img-top card_image" alt="..."/>
                    <div className="card-body">
                        <h3 className="card-title">{dt.Name}</h3>
                        <input id="decription" onChange={(g)=>this.setState({description:g.target.value})} type="text" name={dt.Name} className="form-control borrow_input_color" placeholder="Description" />
                        <input onChange={(g)=>this.setState({amount:g.target.value})} type="number" name={dt.Name} className="form-control borrow_input_color" placeholder="Amount" />
                        <p>{dt.Amount}</p>
                        <button onClick={()=>addAMount(dt._id,this.state.description,this.state.amount)}className={"btn btn-dark add_btn mt-3 form-control"}>Add</button>
                    </div>
                </div>  
            </div> 
            </>
        )
    }
}



  
    
  
 


export default BorrowPrint
