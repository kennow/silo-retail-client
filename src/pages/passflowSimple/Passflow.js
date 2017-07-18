import './Passflow.styl';

import PassFlowStatsSimple from '../../components/passflowstatsSimple';
import DateNavigator from '../../components/datenavigator';
import PassFlowDiffer from '../../components/passflowdiffer';
import PassFlowWeatherCharts from '../../components/passflowweathercharts';

class Passflow extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="responsive">
        <PassFlowStatsSimple/>
        <DateNavigator/>
        <PassFlowDiffer/>
        <PassFlowWeatherCharts/>
      </div>
    )
  }
}

export default Passflow;