import { connect } from "react-redux";
import { setFilter } from "../reducers/reducer";

const Filter = (props) => {
    const handleChange = (event) => {
        props.setFilter(event.target.value.toUpperCase());
    }
    const style = {
      marginBottom: 10,
      fontWeight: 'bold'
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  const ConnectedFilter = connect(
    null,
    { setFilter }
  )(Filter)
  
  export default ConnectedFilter