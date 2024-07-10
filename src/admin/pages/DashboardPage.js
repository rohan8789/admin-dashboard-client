import React from "react";
import LoadingState from "../../shared/UIElements/LoadingState";

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-xl-3 col-sm-6 mb-3">Hello</div>
        </div>
      </>
    );
  }
}

export default LoadingState(DashboardPage);
