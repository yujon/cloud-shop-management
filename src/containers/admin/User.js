import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class User extends React.Component{

 	render(){
       return(
       		<div>user</div>
       )
 	}
}


const mapStateToProps = (state) => {
  const {} = state;
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({}, dispatch);
  return {
    ...actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);