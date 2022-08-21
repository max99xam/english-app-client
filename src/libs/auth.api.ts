import axios from 'axios';
import { AUTH_ME_URL, LOGOUT_URL, SIGN_IN_URL } from 'constants/url';
import { IUser } from 'types/types';

interface SignInDto {
	email: string;
	password: string;
}

interface SignUpDto extends SignInDto {
	name: string;
}

export const signIn = async (signInDto: SignInDto) => {
	try {
		const res = await axios.post(
			SIGN_IN_URL,
			signInDto,
			{ withCredentials: true }
		);
		return { accessToken: res.data.accessToken };
	} catch (error) {
		if (error instanceof Error) {
			return { error: error.message }
		}
		return {}
	}
};

export const signUp = async (signUpDto: SignUpDto) => {
	try {
		const res = await axios.post(
			SIGN_IN_URL,
			signUpDto,
			{ withCredentials: true }
		);
		return { user: res.data };
	} catch (error) {
		if (error instanceof Error) {
			return { error: error.message }
		}

		return {}
	}

};

export const getUser = async () => {
	try {
		let res = await axios.get(AUTH_ME_URL, { withCredentials: true });

		return res.data as IUser;
	} catch (error) {
		// console.log(error);
		throw error;
	}
};

export const logout = async () => {
	try {
		await axios.delete(LOGOUT_URL, { withCredentials: true });
	} catch (error) {
		console.log(error);
	}
};
