import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import { Field, Form as FinalForm } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import Avatar from 'components/EditableAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserId } from 'store/auth';
import { selectUserById, updateUserNickname } from 'store/users';
import './EditProfile.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Errors from 'components/FormErrors';

const TextInput = ({ input, meta, ...rest }) => {
	return <TextField {...rest} {...input} />;
};

export default function EditProfile() {
	const history = useHistory();
	const userId = useSelector(selectCurrentUserId);
	const profile = useSelector(selectUserById(userId));
	const dispatch = useDispatch();

	const submitForm = useCallback(
		async (values) =>
			dispatch(updateUserNickname(userId, values.nickname)).catch(({ response, status }) => {
				if (status === 401) history.replace('/login');
				return {
					[FORM_ERROR]: response.data,
				};
			}),
		[dispatch, userId, history]
	);

	return (
		<div className="profile-screen">
			<div className="profile-form">
				<div className="profile-form__avatar">
					<Avatar src={profile?.avatar} userId={userId} />
				</div>
				<div className="profile-form__form">
					<FinalForm
						initialValues={profile}
						onSubmit={submitForm}
						render={({ submitError, handleSubmit, form, submitting, pristine }) => (
							<form onSubmit={handleSubmit}>
								<Field
									name="nickname"
									component={TextInput}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="nickname"
									label="Nickname"
								/>
								{submitError && <Errors errors={submitError} />}

								<button type="submit" className="btn" disabled={submitting || pristine}>
									Save
								</button>

								<button
									type="submit"
									className="btn transparent"
									disabled={submitting || pristine}
									onClick={form.reset}
								>
									Reset
								</button>
							</form>
						)}
					/>
				</div>
			</div>
		</div>
	);
}
