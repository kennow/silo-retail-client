import './Payment.styl';

import Stats from '../../components/stats';
import PieChart from '../../components/piechart';
import DateNavigator from '../../components/datenavigator';
import Table from '../../components/table';
import actions from '../../app/actions';
import store from '../../app/store';
import {getStoreList, getStoreChartReport, getStoreStats, getStoreOffset} from '../../services/store';
import {getDateBefore, genTableRows, genStatsData} from '../../utils';
import locale from '../../locale';

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
      date: new Date(),
      storeName: '',
      statsData: [],
      chartData: {},
      tableRows: []
    };

    this.currStore = {};
    this.offset = getStoreOffset();

    this.tableFields = [
      {
        field: 'name',
        name: locale.settleWay,
        align: 'left',
        formatter: function (value, index) {
          return (index + 1) + " " + value
        }
      },
      {
        field: 'count',
        name: locale.singularQuantity
      },
      {
        field: 'money',
        name: `${locale.amount}(${locale.yuan})`
      }
    ];
  }

  setData(statsData, charts) {
    this.setState({
      isDataLoaded: true,
      chartData: charts,
      storeName: this.currStore.name,
      date: getDateBefore(this.offset),
      tableRows: genTableRows(charts.series),
      statsData: genStatsData(statsData)
    });
  }

  componentDidMount() {
    //获得门店列表的数据
    getStoreList().then((storeList) => {
      //取第一家店铺的storeId
      this.currStore = storeList[0];
      this.doQuery();
    });

    store.emitter.on("setSelectedStore", this._selectHandler, this);
    store.emitter.on("refresh", this.doQuery, this);

  }

  componentWillUnmount() {
    store.emitter.off("setSelectedStore", this._selectHandler);
    store.emitter.off("refresh", this.doQuery);
  }

  _selectHandler(storeList) {

    actions.hideStoreSelector();

    if (storeList.length == 0) return;

    this.currStore = storeList[0];
    //this.offset = 0;
    this.doQuery();
  }

  doQuery() {
    let storeId = this.currStore.storeId;
    Promise.all([
      getStoreStats(storeId, this.offset, this.offset, ['pay', 'promo']),
      getStoreChartReport(storeId, this.offset, 'retail.trade.payment.mode')
    ]).then((values) => {
      this.setData(values[0].data, values[1]);
      this.refs.charts.refresh();
    }).finally(() => {
      actions.hideP2R();
    });
  }

  queryPrev() {
    this.offset += 1;
    this.doQuery();
  }

  queryNext() {
    if (this.offset == 0) {
      return;
    }
    this.offset = Math.max(0, --this.offset);
    this.doQuery();
  }

  render() {
    let {isDataLoaded, statsData, chartData, date, tableRows, storeName} = this.state;
    return (
      isDataLoaded &&
      <div>
        <Stats data={statsData}/>
        <DateNavigator
          date={date}
          nextDisabled={this.offset == 0}
          storeName={storeName}
          onPrev={this.queryPrev.bind(this)}
          onNext={this.queryNext.bind(this)}
        >
        </DateNavigator>
        <PieChart ref="charts"
                  chartName={locale.payments}
                  chartData={chartData}
                  center={['50%', '50%']}
                  showLegend={false}
                  visible={chartData.series.length > 0}
        >
        </PieChart>
        <Table fields={this.tableFields} rows={tableRows}/>
      </div>
    )

  }
}

module.exports = Page;