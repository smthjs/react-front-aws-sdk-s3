# ReactJS SPA for Amazon Cloud Service (aws-sdk)

Used packages and frameworks:
1. [AWS-SDK](https://github.com/aws/aws-sdk-js)
2. [ReactJS](https://github.com/reactjs)
3. [Webpack](https://github.com/webpack)
4. [NodeJS](https://github.com/nodejs)
5. [PostCSS](https://github.com/postcss)
6. [Less](https://github.com/less)
7. [Ant.Design](https://github.com/ant-design)

# Design
<br/>
<img src="https://github.com/smthjs/react-front-aws-sdk-s3/blob/master/Design.png" />
<br/>

# You must configure the aws client
Go to the file 'backend/app/config/s3.config'
```
   module.exports = {
      s3Client: new AWS.S3({
         accessKeyId: 'some key',
         secretAccessKey: 'some secret key',
         region : 'some region', //'ru-msk',
         endpoint: 'some endpoint', //'hb.bizmrg.com',
      }),
      bucket: 'some bucket',
   };
```

# To run the application
1. clone [repository](https://github.com/smthjs/react-front-aws-sdk-s3.git)
2. open this project in your favorite IDE
3. cd frontend && npm install
4. npm run build
5. cd backend && npm install
6. npm start
7. server will start on http://localhost:9001/

# The idea of a global state
As a global state management I use React.createContext();

```
   const GlobalStoreContext = React.createContext({});
```

created component GlobalState which contains all global variables described in state={...} and the changeState method


```
   <GlobalStoreContext.Provider
        value={{
          ...state,
          changeState,
        }}
      >
        {this.props.children}
   </GlobalStoreContext.Provider>
```

or when the child component with the component of the highest order written method

```
   const withGlobalStore = (Component, mapStateToProps, mapActionToProps) => (props) => (
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
  ```

for Example


```
   const mapStateToProps = state => ({
        anyField: state.anyField,
        ...
    });

    const mapActionsToProps = actions => ({
        anyAction: actions.anyAction,
        ...
    });

    export default withGlobalStore(SomeComponent, mapStateToProps, mapActionsToProps);
```
