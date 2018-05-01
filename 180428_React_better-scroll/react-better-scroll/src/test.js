var React = require('react'),
    ReactIScroll = require('react-iscroll'),
    iScroll = require('iscroll');

class Test extends React.Component {
  constructor() {
    super();
    this.onScrollStart = this.onScrollStart.bind(this);
  }
  getDefaultProps() {
    return ({
      options: {
        mouseWheel: true,
        scrollbars: true
      }
    })
  }
  onScrollStart() {
    console.log("iScroll starts scrolling")
  }
  render() {
    var i = 0, len = 1000, listOfLi = [];
 
    for(i; i < len; i++) {
      listOfLi.push(<li key={i}>Row {i+1}</li>)
    }
 
    return (
      <div style="height: 100vh">
        <h1>Example of scrollable list</h1>
        <ReactIScroll iScroll={iScroll}
                      options={this.props.options}
                      onScrollStart={this.onScrollStart}>
          <ul>
            {listOfLi}
          </ul>
        </ReactIScroll>
      </div>
    )
  }
}

export default Test;
