import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Field, Form as FinalForm } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { register } from 'store/auth';
import { useHistory } from 'react-router-dom';
import FormLayout from 'components/FormLayout';
import Errors from 'components/FormErrors';
import { FORM_ERROR } from 'final-form';

const TextInput = ({ input, meta, ...rest }) => {
	return <TextField {...rest} {...input} />;
};

export default function SignInSide() {
	const dispatch = useDispatch();
	const history = useHistory();

	const submitForm = useCallback(
		async (values) =>
			dispatch(register(values))
				.then(() => history.replace('/'))
				.catch(({ response }) => {
					console.log(response);
					return {
						[FORM_ERROR]: response.data,
					};
				}),
		[dispatch, history]
	);

	return (
		<div className="login-screen">
			<FormLayout header="Sign Up">
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
							<Field
								name="password2"
								component={TextInput}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="password2"
								label="Confirm Password"
								type="password"
							/>

							{submitError && (
								<Typography gutterBottom variant="subtitle1" color="error">
									<Errors errors={submitError} />
								</Typography>
							)}
							<button type="submit" className="btn" disabled={submitting}>
								Sign Up
							</button>
						</form>
					)}
				/>
				<Link to="/login" className="btn transparent">
					I am already a member
				</Link>
			</FormLayout>
		</div>
	);
}
