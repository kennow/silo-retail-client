import './HeatMap.styl';

import DateNavigator from '../../components/datenavigator';
import PassFlowHeatMap from "../../components/passflowheatmap";

class HeatMap extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="responsive">
        <DateNavigator dateSwitchable={false} className="heatmap-navigator"/>
        <PassFlowHeatMap/>
      </div>
    )
  }
}

export default HeatMap;