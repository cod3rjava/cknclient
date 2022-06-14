import React from "react";

class CategoryUI extends React.Component{
    render(){
        const {addClick,btnDelete,falseEdit,saveInput,editCategory,dt ,changeInput} = this.props
        return(
            <>
            <table className="table  table-hover table-primary table-responsive">
            
            <tbody>
        
                 <tr>
                    <td key={dt.Name}>
                        <input onChange={(e)=>changeInput(e.target.value)}
                        onBlur={(m)=>saveInput(dt._id,m.target.value,dt)} 
                        disabled={dt.Condition} 
                        style={(dt.Condition === true?{border:"none"}:{border:""})} 
                        defaultValue={dt.Name}/>
                        <span onClick={()=>falseEdit(dt)}>✏️</span>
                    </td>
                     <td><button className="btn btn-danger" onClick={()=>btnDelete(dt._id)}>Delete</button></td>
                 </tr>
            
            </tbody>
          </table>
        
          </>
           
        )
    }
}
export default CategoryUI