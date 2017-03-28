import './GoodsInfo.styl';

import GoodsInfoStats from '../../components/goodsInfoStats';
import DateNavigator from '../../components/datenavigator';
import Top10Tab from '../../components/top10Tab';
import GoodsInfoPieChart from '../../components/goodsInfoPieChart';
import GoodsBarChart from '../../components/goodsInfoBarChart';

class GoodsInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <GoodsInfoStats/>
        <DateNavigator/>
        <Top10Tab/>
        <GoodsInfoPieChart/>
        <GoodsBarChart/>
      </div>
    )

  }
}

module.exports = GoodsInfo;