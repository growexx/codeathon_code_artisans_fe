# **Setup redux-form**

1. npm install redux-form --save
2. Update app/reducers.js for following

   ```
        //... Other imports
        import { reducer as reduxFormReducer } from 'redux-form';

            const rootReducer = combineReducers({
                //...Other variables
                form: reduxFormReducer,
            });
   ```

3. redux-form's field will need Component wrapper

   ```
   import { Input } from 'antd';

   const makeField = Component => ({
     input,
     meta,
     children,
     hasFeedback,
     label,
     ...rest
   }) => {
     const hasError = meta.touched && meta.invalid;
     return (
       <FormItem
         {...formItemLayout}
         label={label}
         validateStatus={hasError ? 'error' : 'success'}
         hasFeedback={hasFeedback && hasError}
         help={hasError && meta.error}
       >
         <Component {...input} {...rest}>
           {children}
         </Component>
       </FormItem>
     );
   };

   export const AInput = makeField(Input);
   ```

4. Integration with react-redux and react-reselect

   ```
     //... Other imports
      import { Field, reduxForm, change } from  'redux-form';
      import  useInjectSaga  from  'utils/injectSaga';
      import  useInjectReducer  from  'utils/injectReducer';

   export  class  SampleForm  extends  PureComponent {
     render () {
         return  <Form
             //...props >
           // Field is imported from redux-form which need component, so we have used ant-design's components
   	        <Field
   	          label="Project Name"
   	          name="name"
   	          component={AInput}
   	          placeholder="Project Name"
   	          onChange={e => updateField(e.target.name, e.target.value)}
   	          hasFeedback
   	        />
             //...Other Fields
   	    </Form>
     }
   }

   const  withReducer = useInjectReducer({key:  FORM_KEY, reducer});
   const  withSaga = useInjectSaga({ key:  FORM_KEY, saga });

   const  mapStateToProps = createStructuredSelector({
   	reducerStore:  makeSelectStore(),
   });

   const  mapDispatchToProps = dispatch  => ({
   	updateField: (key, value) =>  dispatch(actions.updateField(key, value)),
   });
   const  withConnect = connect(mapStateToProps, mapDispatchToProps);

   export  default  compose(
   withReducer,
   withSaga,
   withConnect,
   reduxForm({
   	form:  FORM_KEY,
   	fields: [],
   	validate:  formValidations.createValidator({}),
   }),
   )(SampleForm);
   ```
