import React, {createContext} from "react";

export const AppContext = createContext({});

export default Component => props => (
    <AppContext.Consumer>
        {context => <Component {...props} context={context}/>}
    </AppContext.Consumer>
);
