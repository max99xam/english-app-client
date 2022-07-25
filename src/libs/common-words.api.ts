import axios from 'axios';
import { GET_COMMON_WORDS} from 'constants/url';
import { Word } from 'types/types';

export const getCommonWords = async (skip: number, limit: number) => {
	try {
		const res = await axios.get(
			GET_COMMON_WORDS,
	
			{ withCredentials: true }
		);
		return res.data as Word[];
	} catch (error) {
		console.log(error);
	}

	return null;
};