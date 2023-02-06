const withProvider = (Provider) => (Component) => (props) => (
    <Provider>
        <Component {...props} />
    </Provider>
);
export default withProvider;
