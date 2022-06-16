import React from "react";   
import axios from "axios" 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CategoryUI from "./CategoryUI"



class CategoryLogic extends React.Component{

    state = {
        category : [],
        newcategory :"",
        inputname : "", 
        
    }
    categoryCall = ()=>{
        axios.get("http://127.0.0.1:8888/getcategory")
        .then(res=>{
            var totalcategory = res.data;
            this.setState({category : totalcategory})
        })
    }
    componentDidMount(){
        this.categoryCall()
    }

    addClick = ()=>{
        var addCat = {
            Name : this.state.newcategory,
            Condition: true,
        }
        axios.post("http://127.0.0.1:8888/addcategory",addCat)
        .then(res=>{
            debugger
            console.log(res.data)
            console.log("Category Add Success");
            this.categoryCall();
        })
        this.setState({newcategory:""})
    }  

    btnDelete=(id)=>{
        axios.delete(`http://127.0.0.1:8888/detetecategory/${id}`)
        .then(res=>{
            console.log("Delete Success")
            console.log(res.data)
            this.categoryCall();
        })
    } 
    
    falseEdit = (dt)=>{debugger
      console.log(dt)
      var allcategory = [...this.state.category]
      var index = allcategory.indexOf(dt)
        allcategory[index].Condition = false
        this.setState({category : allcategory})
    }

    changeInput =()=>{
    }

    saveInput = (id,val,obj)=>{debugger
        var data = {
            Name : val
        }
        axios.put(`http://127.0.0.1:8888/changeborder/${id}`,data)
        .then(res=>{debugger
            console.log("Change Border Success")
            console.log(res.data)
            this.categoryCall();
        })
        var allcategory = [...this.state.category]
        var index = allcategory.indexOf(obj)
          allcategory[index].Condition = true
          this.setState({category : allcategory})
      }

      editCategory = (m)=>{
        this.setState({newcategory:m})
        // alert(m)
      } 
    render(){
        
        return(
            <>
            <div style={{marginTop:"100px"}}>
            {this.state.category.map(dt=>
            <CategoryUI
            addClick={this.addClick}
            btnDelete={this.btnDelete}
            falseEdit={this.falseEdit}
            saveInput={this.saveInput}
            editCategory={this.editCategory}
            dt={dt}
            />

            )}
            </div>
            <div className="addcategory">
            <h2>Add Category</h2>
          <input className="add_input"  onBlur={(m)=>this.editCategory(m.target.value)} ></input> 
          <button onClick={this.addClick} className={"glow-on-hover"} type="button">Add</button>
          </div> 
            </>
        )
    }
}
export default CategoryLogic