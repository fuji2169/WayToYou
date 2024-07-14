import "./DestinationMapStyle.css";
import DestinationMapData from "./DestinationMapData";

const DestinationMap = ({isAuthenticated, user}) => {
  return (
    <div className="destination-map" id="destination-map">
      <h1>Choose your starting and end point</h1>
      <DestinationMapData isAuthenticated={isAuthenticated} user={user} />
    </div>
  );
};
export default DestinationMap;
