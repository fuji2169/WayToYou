import "./DestinationMapStyle.css";
import DestinationMapData from "./DestinationMapData";

const DestinationMap = () => {
  return (
    <div className="destination-map" id="destination-map">
      <h1>Choose your starting and end point</h1>
      <DestinationMapData />
    </div>
  );
};
export default DestinationMap;
