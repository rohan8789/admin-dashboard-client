import React from "react";
import LoadingState from "../../shared/UIElements/LoadingState";

class AdminBlankPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <p>Content here..</p>
      </>
    );
  }
}

export default LoadingState(AdminBlankPage);
