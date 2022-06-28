import React from "react";

class Progressbar extends React.Component{
    state = {
        bar:25
    }
    render(){
        const {bar}=this.state;

        const backBtn = ()=>{
            if(bar > 25 ) {
                this.setState({bar:bar-25})
            }  
        }

        const nextBtn = ()=>{
            if(bar < 100){
           this.setState({bar:bar+25})
        }
        }

      

        return(
            <>
               <div className="total_progress">
                    <div className="'progress_header">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{width: `${bar}%`}} aria-valuemax="100em"></div>
                    </div>
                    <div style={{display:(bar === 25)?"block":"none"}} className="mt-5">
                        <input type="text" placeholder="Name" className="form-control"/>
                        <input type="text" placeholder="Name" className="form-control"/>
                        <input type="text" placeholder="Name" className="form-control"/>
                        <input type="text" placeholder="Name" className="form-control"/>
                    </div>

                    <div style={{display:(bar === 50)?"block":"none"}} className="mt-5">
                        <input type="text" placeholder="Surname" className="form-control"/>
                        <input type="text" placeholder="Surname" className="form-control"/>
                        <input type="text" placeholder="Surname" className="form-control"/>
                        <input type="text" placeholder="Surname" className="form-control"/>
                    </div>  
                    
                    <div style={{display:(bar === 75)?"block":"none"}} className="mt-5">
                        <input type="text" placeholder="Password" className="form-control"/>
                        <input type="text" placeholder="Password" className="form-control"/>
                        <input type="text" placeholder="Password" className="form-control"/>
                        <input type="text" placeholder="Password" className="form-control"/>
                    </div>

                    <div style={{display:(bar === 100)?"block":"none"}} className="mt-5">
                        <input type="text" placeholder="Address" className="form-control"/>
                        <input type="text" placeholder="Address" className="form-control"/>
                        <input type="text" placeholder="Address" className="form-control"/>
                        <input type="text" placeholder="Address" className="form-control"/>
                    </div>

                    </div>
                    <div className="progress_footer m-1">
                        <button style={{display:(bar === 25)?"none":"block"}}  onClick={backBtn} className="btn btn-dark m-1">Back</button>
                        <button onClick={nextBtn} className="btn btn-success m-1">Next</button>
                    </div>
                </div>        
            </>
        )
    }
}
export default Progressbar