import React from 'react';
import { Button, Header, Label, SemanticCOLORS, Table } from 'semantic-ui-react';
import { WordStudyStatus } from 'types/types';
import { DeleteButtonWithModal } from './DeleteButtonWithModal';
import { EditButtonWithModal } from './EditButtonWithModal';

import { RowProps } from './Row.props';

const labelColors: Record<WordStudyStatus, SemanticCOLORS> = {
	[WordStudyStatus.KNOW]: 'green',
	[WordStudyStatus.LEARN]: 'yellow',
	[WordStudyStatus.UNKNOWN]: 'red',
}

export const Row = ({ rowData, rowId }: RowProps) => {
	const [isExamplesOpen, setIsExamplesOpen] = React.useState(false);

	const handleOpenExamplesButton = () => {
		setIsExamplesOpen((open) => !open);
	};

	return (
		<>
			<Table.Row textAlign='center' verticalAlign='middle'>
				<Table.Cell width={1}>{rowId}</Table.Cell>
				<Table.Cell>
					<Header as='h1'>
						{rowData.word}
						<Header.Subheader>
							{rowData.transcription}
						</Header.Subheader>
					</Header>
					{/* {rowData.word} <br /> {rowData.transcription} */}
				</Table.Cell>
				<Table.Cell verticalAlign='middle'>
					{rowData.translations.map((translation, index) => {
						return (
							<React.Fragment key={translation + index}>
								<Header style={{ margin: '0.35rem 0' }} size='small'>{translation}</Header>
							</React.Fragment>
						);
					})
					}</Table.Cell>
				<Table.Cell>
					<Label color={labelColors[rowData.studyStatus]} size="big" >
						{rowData.studyStatus}
					</Label>
				</Table.Cell>
				<Table.Cell>
					<EditButtonWithModal rowData={rowData} />
					<DeleteButtonWithModal wordId={rowData.id} />
					<Button basic icon={`chevron ${isExamplesOpen ? 'up' : 'down'}`} size='large' onClick={handleOpenExamplesButton} />
				</Table.Cell>
			</Table.Row>
			{isExamplesOpen &&
				rowData.usageExamples.map((exampleRow) => (
					<Table.Row key={exampleRow.sentence} >
						<Table.Cell></Table.Cell>
						<Table.Cell colspan={5}>{exampleRow.sentence}</Table.Cell>
						{/* <Table.Cell></Table.Cell>
						<Table.Cell>{exampleRow.translation}</Table.Cell> */}
					</Table.Row>
				))}



		</>
	);
};
