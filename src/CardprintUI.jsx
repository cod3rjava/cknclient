import React from "react";

class Cardprint extends React.Component{

    state = {
        cost :0
    }
    render(){
        const { dt , addCost } = this.props
        return(
            <>
            <div key={dt.Name} className="col ">
            <div className="card h-100">
                <img  src="https://i.redd.it/b3esnz5ra34y.jpg" className="card-img-top card_image" alt="..."/>
                    <div className="card-body">
                        <h3 className="card-title">{dt.Name}</h3>
                        <input id="addinput" onChange={(g)=>this.setState({cost:g.target.value})} type="number" name={dt.Name} className="form-control input_color" />
                        <button type="button" onClick={()=>addCost(dt.Name,this.state.cost)}  className={"btn btn-dark add_btn mt-3 form-control"}>Add</button>
                    </div>
            </div>
            </div>
            </>
        )
    }
}

// export default Cardprint





export default Cardprint
 