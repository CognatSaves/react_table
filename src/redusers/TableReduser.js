import sortMultidimensionalArrayFunc from 'sort-multidimensional-array-func';

const initialState = {
  data : [
    ['Alexander', 345345, 887423111111111111111,13,'kek'],
    ['Paul', 2347, 76323,14,'kek'],
    ['Larisa', 745, 54234,15,'kek'],
  ],
  columns : [
    {
      label: 'Name',
      sort: 'default',
    },
    {
      label: 'ID',
      sort: 'default',
    },
    {
      label: 'Count',
      sort: 'default',
    },
    {
      label: 'New',
      sort: 'default'
    }
  ],
  loaded: false,
};

export const TableReduser = (state=initialState,action) =>{

  switch(action.type){

    case "SET_ALL":
      let newStateD = JSON.parse(JSON.stringify(state));
      newStateD.data = action.data;
      newStateD.data.forEach(function(item,i,newData){
        item[item.length]='\u274C';
      })
      newStateD.columns=action.columns;
      newStateD.loaded=true;
      return newStateD;

    case "GET_SORTED_DATA":
      let currentSortMethod = 'default';
      switch (action.sortMethod) {
        case 'default':
          currentSortMethod = 'asc';
          break;
        case 'asc':
          currentSortMethod = 'desc';
          break;
        case 'desc':
          currentSortMethod = 'asc';
          break;
        default:
          currentSortMethod = 'asc';
      }
      const changeColumn = state.columns.map((e, i) =>
        ({ ...e, sort: i == action.id ? currentSortMethod : 'default' })
      );
      const sortData = sortMultidimensionalArrayFunc(state.data, action.id, currentSortMethod);

      let newStateE = JSON.parse(JSON.stringify(state));
      newStateE.data=sortData;
      newStateE.columns=changeColumn;
      return newStateE;

    case "ADD_NEW_DATA_STRING":
      let newStateF = JSON.parse(JSON.stringify(state));
      let newData = [Array(state.columns.length).fill(0)];
      newData[0][newData[0].length]='\u274C';
      newStateF.data=newData.concat(newStateF.data);
      return newStateF;

    case "CHANGE_DATA":
      let newStateG = JSON.parse(JSON.stringify(state));
      newStateG.data[action.line][action.index]=action.text;
      return newStateG;

    case "REMOVE_DATA_LINE":
      let newStateH = JSON.parse(JSON.stringify(state));
      newStateH.data.splice(action.index,1);
      return newStateH;

  }
  return state;
}
