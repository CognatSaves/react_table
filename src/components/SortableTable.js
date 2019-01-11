import React from 'react';
import './SortableTable.css';
import { connect } from 'react-redux'

const SortableHeader = (props) => {
  const { columns, onClick } = props;
  function getColor(element) {
    if(element.sort == 'asc'){
      return 'green';
    }
    if(element.sort == 'desc'){
      return 'red';
    }
    else{
      return 'black';
    }
  }
  function getArrow(element){
    if(element.sort == 'asc'){
      return '\u25B2';
    }
    if(element.sort == 'desc'){
      return '\u25BC';
    }
    else{
      return "";
    }
  }
  return(
    <thead align="center">
    <tr>

      {columns.map((element, index) =>
        <th
          key={index}
          style={{color:getColor(element)}}
          onClick={() => onClick(index, element.sort)}
        >
          {element.label+getArrow(element)}
        </th>

      )}
    </tr>
    </thead>
  );
}

const SortableBody = (props) => {
  const { data , changeData, deleteElem} = props;
  let isEditableArray = Array(data[0].length).fill("true");
  isEditableArray[isEditableArray.length-1]="false";
  return(
    <tbody align="center">
    {data.map((element, index) =>
      <tr key={index}>

        {element.map((item, i) =>
          <td key={i}>
            <div suppressContentEditableWarning="true" contentEditable={isEditableArray[i]}
                 onClick={()=>{
                   if(i==element.length-1)
                   {
                     deleteElem(index)
                   }
                 }
                 }
                 onBlur={changeData.bind(this, index, i)
            }
            >
            {item}
            </div>
            </td>
        )}
      </tr>
    )}
    </tbody>
  );
}

class SortableTableClass extends React.Component {

  constructor(props) {
    super(props);
    this.changeData=this.changeData.bind(this);
    this.deleteElem=this.deleteElem.bind(this);
  }
  changeData(line, index,e){
    this.props.changeData(line,index,e.target.innerText);
  }
  deleteElem(index){
    this.props.removeDataLine(index);
  }

  render() {
    return (
      <div>
        <h1 align="center" className="headerText">Work with Table</h1>
        <button className="btn btn-info" style={{top:"0px",height:"50px", width:"150px", textAlign:"center",position:"absolute"}} onClick={()=>this.addNewStringFunc()}>Add new string</button>

        <table className="table" border="1">
          <SortableHeader columns={this.props.storeState.columns} onClick={this.sortTableFunc} />
          <SortableBody data={this.props.storeState.data} changeData={this.changeData} deleteElem={this.deleteElem}/>
        </table>
      </div>
    );
  }

  sortTableFunc = (id, sortMethod) => {
    this.props.getSortedData(id,sortMethod);
  }
  addNewStringFunc(){
    alert("Новая строка появится в самом верху вне зависимости от выбранной сейчас сортировки");
    this.props.addNewDataString();
  }
}

const SortableTable = connect(
  (state) =>({
    storeState: state.TableReduser
  }),
  (dispatch) => ({
    getSortedData:(id,sortMethod)=>dispatch({type:"GET_SORTED_DATA",id:id,sortMethod:sortMethod}),
    addNewDataString:()=>dispatch({type:"ADD_NEW_DATA_STRING"}),
    changeData:(line,index,text)=>dispatch({type:"CHANGE_DATA",line:line,index:index,text:text}),
    removeDataLine:(index)=>dispatch({type:"REMOVE_DATA_LINE",index:index})
  })
)(SortableTableClass);

export default SortableTable;
