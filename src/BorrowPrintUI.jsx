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
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6szqA0z8YUR6Uw-fDTIibo-eQZG8Q5W33Jg&usqp=CAU" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h3 className="card-title">{dt.Name}</h3>
                        <input onChange={(g)=>this.setState({description:g.target.value})} type="text" name={dt.Name} className="form-control" placeholder="Description" />
                        <input onChange={(g)=>this.setState({amount:g.target.value})} type="number" name={dt.Name} className="form-control" placeholder="Amount" />
                        <button onClick={()=>addAMount(dt._id,this.state.description,this.state.amount)}className={"btn btn-success mt-3 form-control"}>Add</button>
                    </div>
            </div>  
            </div>
            </>
        )
    }
}


export default BorrowPrint
