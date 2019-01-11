import React, { Component } from 'react';
import './App.css';
import SortableTable from './components/SortableTable.js'
import { connect } from 'react-redux'

class AppClass extends Component {
  constructor(props){
    super(props);
    this.setNewState=this.setNewState.bind(this);
    this.getStartData=this.getStartData.bind(this);
  }
  setNewState(newData, newColumns){
    this.props.setAll(newData,newColumns);
  }
  getStartData(){
    function getData(func){
      var answer_promise = new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();
        function cleanUp() {
          oReq.removeEventListener('load', handler);
        }
        function handler() {
          function createColumnsArray(elem){
            var keys = Object.keys(elem);
            var res=[];
            keys.forEach(function(item, i, keys) {
              res[i]={label:item,sort:'default'};
            })
            return res;
          }
          function getDataArray(text){
            var keys = Object.keys(text[0]);
            var res=[];
            text.forEach(function(item,i,text) {
              var fragment = [];
              keys.forEach(function(key_item, j, keys) {
                fragment[j]=item[key_item];
              })
              res[i]=fragment;
            })
            return res;
          }
          var text = JSON.parse(this.responseText);

          var newColumns = createColumnsArray(text[0]);
          var newData = getDataArray(text);
          func(newData,newColumns);

          cleanUp();
        }

        oReq.addEventListener('load', handler);

        oReq.open('GET', 'https://jsonplaceholder.typicode.com/posts');

        oReq.send();
      });
    }
    getData(this.setNewState);
  }
  render() {
    //will draw only one sentence (look below) before 1 load
    if(!this.props.storeState.loaded){
      this.getStartData();
      return(
        <div>Try to load</div>
      )
    }
    else {
      return (
        <div>
          <SortableTable/>
        </div>
      );
    }
  }
}

const App = connect(
  (state) =>({
    storeState: state.TableReduser
  }),
  (dispatch) => ({
    setAll:(data,columns) => dispatch({type:"SET_ALL",data:data,columns:columns})
  })
)(AppClass);

export default App;
