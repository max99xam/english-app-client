import React from 'react';
import { WORDS_MODE } from 'libs/constants/names.storage';
import { useLocalStorage, useUser } from 'libs/hooks';
import { Header, Label, Loader, Segment, SemanticCOLORS, Table } from 'semantic-ui-react';
import { Role, WordsMode, WordStudyStatus } from 'libs/types/types';
import { DeleteButtonWithModal } from '../ButtonsWithModal/DeleteButtonWithModal';
import { WordMoreInfoModal } from '../ButtonsWithModal/WordMoreInfoModal';
import { RowProps } from './Row.props';
import { EditButtonModal } from '../ButtonsWithModal/EditButtonModal';
import styles from './Row.module.scss';

const labelColors: Record<WordStudyStatus, SemanticCOLORS> = {
	[WordStudyStatus.KNOW]: 'green',
	[WordStudyStatus.LEARN]: 'yellow',
	[WordStudyStatus.UNKNOWN]: 'red',
}

export const Row = ({ rowData, rowId }: RowProps) => {
	const { isUserLoading, user } = useUser();
	const [wordsMode] = useLocalStorage<WordsMode>(WORDS_MODE, 'userWords');

	if (isUserLoading) {
		return (
			<Segment>
				<Loader size='massive' active inline='centered' />
			</Segment>
		);
	}

	return (
		<>
			<Table.Row textAlign='center' verticalAlign='middle'>
				<Table.Cell width={1}>{rowId}</Table.Cell>
				<Table.Cell width={8}>
					<Header as='h2'>
						{rowData.word}
						{rowData.transcription &&
							<Header.Subheader>
								{rowData.transcription}
							</Header.Subheader>
						}
					</Header>
				</Table.Cell>
				<Table.Cell width={4}>
					<Label color={labelColors[rowData.studyStatus]} size="big" className={styles.studyStatus}>
						{rowData.studyStatus}
					</Label>
				</Table.Cell>
				{wordsMode == 'userWords'
					? <>
						<Table.Cell width={3} >
							<div className={styles.iconButtons}>
								<WordMoreInfoModal word={rowData} />
								<EditButtonModal word={rowData} />
								<DeleteButtonWithModal wordId={rowData.id} />
							</div>
						</Table.Cell>
					</>
					: user && user.role == Role.ADMIN
						? <>
							<Table.Cell width={6}>
								<WordMoreInfoModal word={rowData} />
								<EditButtonModal word={rowData} />
								<DeleteButtonWithModal wordId={rowData.id} />
							</Table.Cell>
						</>
						: <Table.Cell width={6}><WordMoreInfoModal word={rowData} /></Table.Cell>
				}
			</Table.Row>
		</>
	);
};
