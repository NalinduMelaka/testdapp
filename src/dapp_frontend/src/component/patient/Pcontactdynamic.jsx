import React from "react";
import { useParams } from "react-router-dom";
const Pcontactdynamic = () => {
  let { id } = useParams();
  return <div>id is {id}</div>;
};

export default Pcontactdynamic;
