import React, {
    useState,
    Fragment,
    useRef,
    useMemo,
    useContext,
    useCallback
} from "react";
import { Link } from "react-router-dom";
import hoistNonReactStatics from "hoist-non-react-statics";
import Switch from "../components/Switch";

const ToggleContext = React.createContext(null);

/********************* TOGGLE COMPONENTS *********************/

const Toggle = ({ title, children }) => {
    const [on, setOn] = useState(false);

    const toggle = useCallback(() => setOn(on => !on), [setOn]);

    const context = useMemo(() => ({ on, title, toggle }), [on, title, toggle]);

    return (
        <ToggleContext.Provider value={context}>{children}</ToggleContext.Provider>
    );
};

/********************* HOC WITH_TOGGLE COMPONENTS *********************/

const getDisplayName = WrappedComponent =>
    WrappedComponent.displayName || WrappedComponent.name || "ToggleChild";

const withToggle = Component => {
    const Wrapper = props => {
        const context = useContext(ToggleContext);

        return <Component {...context} {...props} />;
    };

    Wrapper.displayName = `withHOC(${getDisplayName(Component)})`;

    hoistNonReactStatics(Wrapper, Component);

    return Wrapper;
};

/********************* TOGGLE CHILDREN COMPONENTS *********************/

function ToggleTitle({ title }) {
    const ref = useRef(null);
    return (
        <h1 ref={ref}>
            <Link to="/">{title}</Link>
        </h1>
    );
}

ToggleTitle.StaticMethod = () => (
    <span className="big-font" aria-label="Static component" role="img">
      🐱😼😹🙀😾😻😺😸
    </span>
);

const ToggleTitleWithToggle = withToggle(ToggleTitle);

const ToggleOn = withToggle(({ children, on }) =>
    on ? <h2>{children}</h2> : null
);

const ToggleOff = withToggle(({ children, on }) =>
    on ? null : <h2>{children}</h2>
);

const ToggleButton = withToggle(({ on, toggle }) => (
    <button onClick={toggle} className="toggle-button">
        {on ? "on" : "off"}
    </button>
));

const ToggleSwitch = withToggle(({ on, toggle }) => (
    <Switch on={on} onClick={toggle} />
));

/********************* PARENT COMPONENT *********************/

const Parent = props => {
    return (
        <Toggle {...props}>
            <Fragment>
                <ToggleTitleWithToggle />
                <ToggleTitleWithToggle.StaticMethod />
            </Fragment>
            <ToggleOn>The button is on</ToggleOn>
            <ToggleOff>The button is off</ToggleOff>
            <div>
                <ToggleSwitch />
                <ToggleButton />
            </div>
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

