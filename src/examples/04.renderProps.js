import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Switch from "../components/Switch";

const Toggle = ({ children, title = "" }) => {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  return children({ on, toggle, title });
};

const Parent = props => {
  return (
    <Toggle {...props}>
      {({ on, toggle, title }) => (
        <Fragment>
          <h1>
            <Link to="/">{title}</Link>
          </h1>
          <h2>{on ? "The button is on" : "The button is off"}</h2>
          <Switch on={on} onClick={toggle} />
          <button
            aria-label="custom-button"
            onClick={toggle}
            className="toggle-button"
          >
            {on ? "on" : "off"}
          </button>
        </Fragment>
      )}
    </Toggle>
  );
};

export default Parent;

// import React, { Component } from 'react';
// import { render } from 'react-dom';
//
// // 1. HoC Toggle Wrapper Component Factory
// const withToggle = (WrappedComponent) => {
//   class Toggle extends Component {
//     constructor(props) {
//       super(props);
//       this.state = { isActive: false };
//       this.onToggle = this.onToggle.bind(this);
//     }
//
//     render() {
//       return (
//         <WrappedComponent
//           isActive={this.state.isActive}
//           onToggle={this.onToggle}
//         />
//       );
//     }
//
//     onToggle() {
//       this.setState({
//         isActive: !this.state.isActive
//       });
//     }
//   }
//
//   Toggle.displayName = (WrappedComponent.displayName || WrappedComponent.name) + 'WithToggle';
//
//   return Toggle;
// }
//
// // 2. Content helper Component
// const Title = ({ onClick }) => (
//   <h2 onClick={onClick}>Click me</h2>
// );
//
// // 3. Content helper Component
// const Content = () => (
//   <p>Random Content</p>
// );
//
// // 4. The Component We Are going To Wrap
// const ToggleContent = ({ isActive, onToggle }) => (
//   <div>
//     <Title onClick={onToggle} />
//     <p>Foo Desc</p>
//     { isActive && <Content /> }
//   </div>
// );
//
// // 5. Wrapped Comopnent (the one we would like to use)
// const ToggleComponent = withToggle(ToggleContent);
//
// // It could be also written like this so we can merge thr 4th and 5th components in one
//
// // const ToggleComponent = withToggle(({ isActive, onToggle }) => (
// //   <div>
// //     <Title onClick={onToggle} />
// //     <p>Foo Desc</p>
// //     { isActive && <Content /> }
// //   </div>
// // ));
//
// render(<ToggleComponent />, document.getElementById('root'));

import React from "react";

const Cat = ({mouse}) => {
  return (
      <img
          src="/cat.png"
          alt="cat"
          style={{ position: "absolute", left: mouse.x, top: mouse.y }}
      />
  );
};

const Mouse = (props) => {
  const [state, setState] = React.useState();

  const handleMouseMove = (event) => {
    setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  return (
      <div style={{ height: "100vh" }} onMouseMove={handleMouseMove}>
        {props.render(state)}
      </div>
  );
};

const MouseTracker = () => {
  return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={(mouse) => <Cat mouse={mouse} />} />
      </div>
  );
};

export const App = () => {
  return (
      <div className="App">
        <MouseTracker />
      </div>
  );
}


import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Renderer(props) {
  return (
      props.children()
  );
}

function App() {
  return (
      <div className="App">
        <Renderer>
          {() => {
            return (
                <h1>I am being rendered by Renderer</h1>
            );
          }}
        </Renderer>
      </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);