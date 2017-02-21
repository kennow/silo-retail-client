require('../pollyfill/');
require('../services/auth').signIn();
require('./app.styl');

// 插入 demo svg
let TingleIconSymbolsDemo = require('./../images/tingle-icon-symbols.svg');
let symbols = document.createElement('div');
ReactDOM.render(<TingleIconSymbolsDemo/>, symbols);
symbols.className = 't-hide';
(document.body || document.documentElement).appendChild(symbols);

/*const PageHome = require('../pages/home');
const PageButton = require('../pages/button');
const PageList = require('../pages/list');
const PageForm = require('../pages/form');
const PageIcon = require('../pages/icon');
const PageDialog = require('../pages/dialog');
const PageGallery = require('../pages/gallery');
const PageScene = require('../pages/scene');*/
const DataView = require('../pages/dataView');
if (__LOCAL__ && window.chrome && window.chrome.webstore) { // This is a Chrome only hack
  // see https://github.com/livereload/livereload-extensions/issues/26
  setInterval(function() {
    document.body.focus();
  }, 200);
}

// bind fastclick
window.FastClick && FastClick.attach(document.body);

const { Router, Route, IndexRoute, Link, hashHistory } = ReactRouter;

class App extends React.Component {
  render() {
    return (
        <div className="page-content">
          {this.props.children}
        </div>
    );
  }
}

ReactDOM.render(
    <Router history={hashHistory}>
      <Route name="app" path="/" component={App}>
        {<IndexRoute component={DataView}/>}
       {/* <Route path="button" component={PageButton}/>
        <Route path="list" component={PageList}/>
        <Route path="form" component={PageForm}/>
        <Route path="icon" component={PageIcon}/>
        <Route path="dialog" component={PageDialog}/>
        <Route path="scene" component={PageScene}/>*/}
        {/*<Route path="saleDataView" component={PageHome}/>*/}
      </Route>
    </Router>, document.getElementById('App')
);
