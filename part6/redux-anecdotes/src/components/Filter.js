import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/reducer";

const Filter = () => {
    const dispatch = useDispatch();
    const handleChange = (event) => {
        dispatch(setFilter(event.target.value.toUpperCase()));
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter