import React from "react";

class ChildComp extends React.Component {
  constructor(props) {
    console.log("\nchild cons()");
    super(props); // must if manual constructor implemented
    console.log("props " + JSON.stringify(props));
    // should be initialized inside cons(), so only own component data will be ready to use
    this.state = {
      num: 10,
      num2: 20,
      num3: 30,
    };
    //console.log("child cons executed");
  }

  // works but not a correct place
  // state = {
  //   num: 10,
  // };

  static getDerivedStateFromProps(nextProps, nextState) {
    console.log("\ngetDerivedStateFromProps() lifecycle - child");
    console.log("props " + JSON.stringify(nextProps));
    //console.log("componentprops " + JSON.stringify(this.props));
    console.log("state " + JSON.stringify(nextState));
    //console.log("componentstate " + JSON.stringify(this.state));

    // return {
    //   num: nextState.num + nextProps.number
    // }
    return null;
  }

  handleClick() {
    console.log("\nhandle click - child");
    console.log(
      "before num" + this.state.num + "hc changing state num - child"
    );

    this.setState((state) => ({ ...state, num: state.num + 10 }));
    //this.setState({ num: 10});
    //this.state.comment += 'Hello'; //no error, no state update
    //this.props.number += 10; //error
    console.log("after num" + this.state.num + "hc changing state num - child");
  }

  componentDidMount() {
    console.log("\ncomponentDidMount() lifecycle-child");
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = true;

    console.log("\nshouldComponentUpdate() lifecycle-child");
    console.log("nextprops " + JSON.stringify(nextProps));
    console.log("componentprops " + JSON.stringify(this.props));
    console.log("nextState " + JSON.stringify(nextState));
    console.log("componentstate " + JSON.stringify(this.state));

    // if (nextState.num === this.state.num + 10) {
    //   shouldUpdate = false;
    // }

    return shouldUpdate;
  }

  render() {
    console.log("\nrender() lifecycle-child");
    console.log("componentprops " + JSON.stringify(this.props));
    console.log("componentstate " + JSON.stringify(this.state));
    return (
      <div>
        <h1>
          {" "}
          child - from parent {this.props.number}
          times{" "}
        </h1>{" "}
        <button onClick={this.handleClick.bind(this)}>
          child - Change child state{" "}
        </button>{" "}
        <h1>
          {" "}
          child - from child {this.state.num}
          times{" "}
        </h1>{" "}
      </div>
    );
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("\ngetSnapshotBeforeUpdate() lifecycle - child");
    console.log("prevProps " + JSON.stringify(prevProps));
    console.log("componentprops " + JSON.stringify(this.props));
    console.log("prevState " + JSON.stringify(prevState));
    console.log("componentstate " + JSON.stringify(this.state));

    return "hi1";
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("\ncomponentDidUpdate() lifecycle - child");
    console.log("prevProps " + JSON.stringify(prevProps));
    console.log("componentprops " + JSON.stringify(this.props));
    console.log("prevState " + JSON.stringify(prevState));
    console.log("snapshot " + JSON.stringify(snapshot));
    console.log("componentstate " + JSON.stringify(this.state));
    //console.log("cdu changing state hello to hi - parent");
    // Trigger update
    //this.setState({title: "hi1" });

    // if (this.state.num === prevState.num  + 10) {
    //   this.setState({ num: this.state.num + 10 });
    // }
  }

  componentWillUnmount() {
    console.log("\ncomponentWillUnmount() lifecycle - child");
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "hello",
      num: 1,
    };
    console.log("parent cons executed");
  }

  handleClick() {
    console.log("\nhandle click - parent");
    console.log(
      "before num" + this.state.num + "hc changing state num - parent"
    );
    this.setState((state) => ({ num: state.num + 1 }));
    console.log(
      "after num" + this.state.num + "hc changing state num - parent"
    );
  }

  componentDidMount() {
    console.log("\ncomponentDidMount() lifecycle - parent");
    console.log("cdm changing state hello to hi - parent");

    // Trigger update
    this.setState({ title: "hi" });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = true;

    console.log("\nshouldComponentUpdate() lifecycle-parent");
    console.log("nextprops " + JSON.stringify(nextProps));
    console.log("componentprops " + JSON.stringify(this.props));
    console.log("nextState " + JSON.stringify(nextState));
    console.log("componentstate " + JSON.stringify(this.state));

    // if (nextState.num === this.state.num + 10) {
    //   shouldUpdate = false;
    // }

    return shouldUpdate;
  }

  render() {
    console.log("\nRender lifecycle - parent");
    console.log(
      "after num" + this.state.num + "hc changing state num - parent"
    );
    //key = {this.state.num}
    return (
      <div>
        <h1> parent {this.state.title} </h1>{" "}
        <button onClick={this.handleClick.bind(this)}>
          parent - Change child props{" "}
        </button>{" "}
        <ChildComp number={this.state.num} />{" "}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("\ncomponentDidUpdate() lifecycle - parent");
    console.log("prevProps " + JSON.stringify(prevProps));
    console.log("prevState " + JSON.stringify(prevState));
    console.log("snapshot " + JSON.stringify(snapshot));
    //console.log("cdu changing state hello to hi - parent");
    // Trigger update
    //this.setState({title: "hi1" });
  }
}

export default App;
