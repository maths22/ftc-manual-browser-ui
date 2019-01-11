import React from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'query'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const renderTextField = ({
                           input,
                           label,
                           meta: { touched, error },
                           ...custom
                         }) => (
    <TextField
        label={label}
        error={touched && !!error}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    width: '100%',
  }
});



const SearchForm = props => {
  const { handleSubmit, pristine, submitting, invalid, error, classes, fetchData } = props;

  const onSubmit = (values, dispatch) => {
    return fetchData(Object.assign({}, values, {page: 0})).then((resp) => {
      if(resp.error) {
        throw new SubmissionError({_error: resp.payload.response.errors});
      }
      return true;
    });
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={24} justify="center">
          <Grid item xs={8}>
            <Field name="query" component={renderTextField} label="Query" className={classes.input} />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" type="submit" color="primary" disabled={pristine || submitting || invalid} className={classes.button}>
              Search
            </Button>
          </Grid>
          {error && <Grid item xs={12}>
            <Typography color="error">{error.join(', ')}</Typography>
          </Grid> }
        </Grid>
      </form>
  );
};

export default reduxForm({
  form: 'SearchForm', // a unique identifier for this form
  validate,
  // asyncValidate,
  // onSubmit
})(withStyles(styles)(SearchForm));