import React from 'react';

function FormErrors({ errors }) {
	return (
		<ul style={{ listStyle: 'none' }}>
			{Object.values(errors).map((value) => (
				<li key={value}>{value}</li>
			))}
		</ul>
	);
}

export default FormErrors;
