import React from "react";

class AddborrowUI extends React.Component{
  
    render(){
        
        const {condition,btnDelete,falseEdit,saveInput,editCategory,dt ,changeInput} = this.props
        return(
            <>
            <table className="table table-hover tbl-data table-responsive ">
            <tbody>
                 <tr>
                    <td key={dt.Name}>
                        <input className="tbl_input" 
                        onChange={(e)=>changeInput(e.target.value)}
                        onBlur={(m)=>saveInput(dt._id,m.target.value,dt)} 
                        disabled={dt.Condition} 
                        style={(dt.Condition === true?{border:"none"}:{border:""})} 
                        defaultValue={dt.Name}/>
                        <span onClick={()=>falseEdit(dt)}>✏️</span>
                    </td>
                     <td><button className="dlt_btn" onClick={()=>btnDelete(dt._id)}>Delete</button></td>
                 </tr>
            </tbody>
          </table>
          </>
        )
    }
}
export default AddborrowUI