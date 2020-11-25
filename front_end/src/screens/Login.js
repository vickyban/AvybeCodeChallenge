import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import { Field, Form as FinalForm } from 'react-final-form';
import FormLayout from 'components/FormLayout';
import { Link } from 'react-router-dom';
import { logIn } from 'store/auth';
import { FORM_ERROR } from 'final-form';
import { useDispatch } from 'react-redux';
import Errors from 'components/FormErrors';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const TextInput = ({ input, meta, ...rest }) => {
	return <TextField {...rest} {...input} />;
};

export default function LoginScreen(props) {
	const history = useHistory();
	const dispatch = useDispatch();

	const submitForm = useCallback(
		async (values) =>
			dispatch(logIn(values))
				.then(() => {
					history.push('/');
				})
				.catch(({ response }) => {
					let errors = {};
					if (response?.data.non_field_errors) {
						errors.err = response?.data.non_field_errors[0];
					}
					return {
						[FORM_ERROR]: errors,
					};
				}),
		[dispatch, history]
	);

	return (
		<div className="login-screen">
			<FormLayout header="Log In">
				<FinalForm
					subscription={{ submitting: true, pristine: true }}
					onSubmit={submitForm}
					render={({ submitError, handleSubmit, submitting }) => (
						<form onSubmit={handleSubmit}>
							<Field
								name="username"
								component={TextInput}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								autoFocus
							/>
							<Field
								name="password"
								component={TextInput}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="password"
								label="Password"
								type="password"
							/>

							{submitError && (
								<Typography gutterBottom variant="subtitle1" color="error">
									<Errors errors={submitError} />
								</Typography>
							)}
							<button disabled={submitting} type="submit" className="btn">
								Sign In
							</button>
						</form>
					)}
				/>
				<Link to="/register" className="btn transparent">
					New here? Sign Up instead
				</Link>
			</FormLayout>
		</div>
	);
}
