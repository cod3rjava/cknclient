import React from "react";

class Cardprint extends React.Component{

    state = {
        cost :0
    }
    render(){

        const { dt , addCost } = this.props

        return(
            <>
            <div key={dt.Name} className="col">
            <div className="card h-100">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6szqA0z8YUR6Uw-fDTIibo-eQZG8Q5W33Jg&usqp=CAU" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h3 className="card-title">{dt.Name}</h3>
                        <input id="addinput" onChange={(g)=>this.setState({cost:g.target.value})} type="number" name={dt.Name} className="form-control" />
                        <button onClick={()=>addCost(dt.Name,this.state.cost)}  className={"btn btn-success mt-3 form-control"}>Add</button>
                    </div>
            </div>
            </div>
            </>
        )
    }
}

// export default Cardprint





export default Cardprint
