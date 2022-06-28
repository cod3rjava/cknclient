import React from "react";   
import axios from "axios" 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddborrowUI from "./AddborrowUI"



class AddborrowLogic extends React.Component{

    state = {
        borrow : [],
        newborrow :"",
        inputname : "", 
        condition: true
        
    }
   borrowCall = ()=>{
        axios.get("http://127.0.0.1:8888/getBorrower")
        .then(res=>{
            var totalborrow = res.data;
            this.setState({borrow : totalborrow})
        })
    }
    componentDidMount(){
        this.borrowCall()
    }
    addClick = ()=>{
        var addborrow = {
            Name : this.state.newborrow,
            Condition: true,
            creditAmount:0,
            debitAmount:0,
            totalAmount:0,
            description:[],
        }
        axios.post("http://127.0.0.1:8888/addBorrower",addborrow)
        .then(res=>{
            
            console.log(res.data)
            console.log("Category Add Success");
            this.borrowCall();
        })
    }  
    btnDelete=(id)=>{
        axios.delete(`http://127.0.0.1:8888/deleteBorrowerById/${id}`)
        .then(res=>{
            console.log("Delete Success")
            console.log(res.data)
            this.borrowCall();
        })
    } 
    falseEdit = (dt)=>{
        
        // var cd = this.state.condition === true? false : true
        // this.setState({condition : cd})

    //   console.log(dt)
      var allcategory = [...this.state.borrow]
      var index = allcategory.indexOf(dt)
        allcategory[index].Condition = false
        this.setState({borrow : allcategory})
    }
    changeInput =()=>{
    }
    editborrow = (m)=>{
        this.setState({newborrow:m})
    }
    saveInput=(id,val,ind)=>{
        var allcategory = [...this.state.borrow]
        var index = allcategory.indexOf(ind)
          allcategory[index].Condition = true
          this.setState({borrow : allcategory})

          var data = {
              Name : val
          }
    
    axios.put(`http://127.0.0.1:8888/updateBorrowName/${id}`,data)
    .then(res=>{
        console.log("Change Border Success")
        console.log(res.data)
        this.categoryCall();
    })
}
    render(){
        
        return(
            <>
            <div style={{marginTop:"100px"}}>
            {this.state.borrow.map(dt=>
            <AddborrowUI
            btnDelete={this.btnDelete}
            falseEdit={this.falseEdit}
            saveInput={this.saveInput}
            editCategory={this.editCategory}
            dt={dt}
            condition={this.state.condition}
            /> 
             )}
             </div>
              <h3 style={{color:"black"}}>Add Category</h3>
          <input className="add_input" onBlur={(m)=>this.editborrow(m.target.value)} ></input> 
          <button onClick={this.addClick} className={"glow-on-hover"}>Add</button>
                
            </>
        )
    }
}
export default AddborrowLogic