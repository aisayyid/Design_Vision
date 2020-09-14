import React from "react";
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class AwesomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    render() {
        return (
            <div className="sweet-loading">
                <PacmanLoader


                    css={override}
                    size={15}
                    color={"#123abc"}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

export default AwesomeComponent;