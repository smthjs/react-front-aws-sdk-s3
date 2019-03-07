import React from "react";
import {node} from "prop-types";
import createActions from "./actions";

const GlobalStoreContext = React.createContext({});

export default class GlobalStore extends React.Component {
  static propTypes = {
    children: node,
  };
  
  state = {
    rootDirectiory: "",
    directories: [],
    objects: [],
    selectedDirectory: "",
    newDirectory: "",
    finalDirectory: "",
    loading: false,
  };

  constructor(props) {
    super(props);

    this.changeState = this.changeState.bind(this);
  }
  
  changeState(newState) {
    this.setState({...newState});
  }

  render() {
    const {state, changeState} = this;

    return (
      <GlobalStoreContext.Provider
        value={{
          ...state,
          changeState,
        }}
      >
        {this.props.children}
      </GlobalStoreContext.Provider>
    );
  }
}

export const withGlobalStore = (Component, mapStateToProps, mapActionToProps) => (props) => (
  <GlobalStoreContext.Consumer>
    {store => {
      const mappedState =
        typeof mapStateToProps === "function"
          ? mapStateToProps(store)
          : store;

      const actions = createActions(store);

      const mappedActions =
        typeof mapActionToProps === "function"
          ? mapActionToProps(actions)
          : actions;

      return <Component {...props} {...mappedState} {...mappedActions} />;
    }}
  </GlobalStoreContext.Consumer>
);
