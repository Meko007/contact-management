export const random = (): string => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 12; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

export const isEmail = (email: string) =>
	(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email);

export const checkName = (name: string): boolean => 
	(/[\d!@#$%^&*()_+={}[\]:;<>,.?~\\\/]+/).test(name); // Checking if a name contains stuff besides letters

export const capitalizeName = (name: string): string => {
	return name
		.split(/\s+/)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
};

// Validate phone number
export const validPhone = (phoneNum: string): boolean => /^\+?[0-9]+$/.test(phoneNum);