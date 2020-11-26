const required = (value: any) => (value ? undefined : 'This value is required');

const notEmpty = (value: string | any[]) =>
	value && value.length !== 0 ? undefined : 'You need to select at least one';

const notBlank = (value: string) => (value && !!value.trim() ? undefined : 'Cannot be blank');
export default { required, notEmpty, notBlank };
