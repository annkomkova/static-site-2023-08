// import './S_MenuBar.scss'
import React from "react";

import M_LandingPostTeaser from "../M_LandingPostTeaser/M_LandingPostTeaser.jsx";

export default class O_LandingCategory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, posts } = this.props;

    const postElements = [];
    posts.forEach((post, i) => {
      postElements.push(<M_LandingPostTeaser key={i} {...post} />);
    });

    return (
      <div className="O_LandingCategory">
        <h2>{name}</h2>

        <div class="W_LandingPostElements">{postElements}</div>
      </div>
    );
  }
}
