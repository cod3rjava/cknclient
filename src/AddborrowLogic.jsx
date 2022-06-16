import React from "react";   
import axios from "axios" 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddborrowUI from "./AddborrowUI"



class AddborrowLogic extends React.Component{

    state = {
        borrow : [],
        newborrow :"",
        inputname : "", 
        
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
        }
        axios.post("http://127.0.0.1:8888/addBorrower",addborrow)
        .then(res=>{
            debugger
            console.log(res.data)
            console.log("Category Add Success");
            this.borrowCall();
        })
    }  
    btnDelete=(id)=>{debugger
        axios.delete(`http://127.0.0.1:8888/deleteBorrowerById/${id}`)
        .then(res=>{
            console.log("Delete Success")
            console.log(res.data)
            this.borrowCall();
        })
    } 
    falseEdit = (dt)=>{
      console.log(dt)
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
    saveInput=(id,val,ind)=>{debugger
        var allcategory = [...this.state.borrow]
        var index = allcategory.indexOf(ind)
          allcategory[index].Condition = true
          this.setState({borrow : allcategory})

          var data = {
              Name : val
          }
    
    axios.put(`http://127.0.0.1:8888/updateBorrowName/${id}`,data)
    .then(res=>{debugger
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
            /> 
             )}
             </div>
              <h3 style={{color:"white"}}>Add Category</h3>
          <input className="add_input" onBlur={(m)=>this.editborrow(m.target.value)} ></input> 
          <button onClick={this.addClick} className={"glow-on-hover"}>Add</button>
                
            </>
        )
    }
}
export default AddborrowLogic