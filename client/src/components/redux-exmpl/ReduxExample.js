
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setExampleValue } from "./store/exampleActions";
export const ReduxExample = () => {
  const store = useSelector((state) => ({
    data: state.changeExampleData.data,
    persistedData: state.changeExampleDataPersisted.data
  }));
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submit");
  };

  const handleChange = (event) => {
    dispatch(setExampleValue(event.target.value));
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <div>Data: {store.data}</div>
        <div>Persisted Data: {store.persistedData}</div>
        <form onSubmit={handleSubmit}>
          <label>
            Text To Change:
            <input type="text" name="name" onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        
      </div>
    </>
  );
};

export default ReduxExample;