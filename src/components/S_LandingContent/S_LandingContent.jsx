// import './S_MenuBar.scss'
import React from "react";

import O_LandingCategory from "../O_LandingCategory/O_LandingCategory.jsx";

export default class S_LandingContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const categoryElements = [];
    this.props.categories.forEach((category, i) => {
      categoryElements.push(<O_LandingCategory key={i} {...category} />);
    });

    return <div className="S_LandingContent">{categoryElements}</div>;
  }
}
