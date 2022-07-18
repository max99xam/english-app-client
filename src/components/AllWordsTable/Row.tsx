import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Button, Icon, Input, Label, Menu, Table } from 'semantic-ui-react';
import { Word } from 'types/types';
import { RowType } from './AllWordsTable';

export interface RowProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	rowData: Word;
	toggleIsEditingNow: () => void;
}

export const Row = ({ rowData, toggleIsEditingNow }: RowProps) => {
	const [isExamplesOpen, setIsExamplesOpen] = React.useState(false);

	const handleOpenExamplesButton = () => {
		setIsExamplesOpen((open) => !open);
	};

	return (
		<>
			<Table.Row textAlign='center'>
				<Table.Cell>{rowData.id}</Table.Cell>
				<Table.Cell>{rowData.word}</Table.Cell>
				<Table.Cell>{rowData.transcription}</Table.Cell>
				<Table.Cell>{rowData.translation}</Table.Cell>
				<Table.Cell>
					<Label color={'green'} size="large" >
						{rowData.studyStatus}
					</Label>
				</Table.Cell>
				<Table.Cell>
					<Button icon size="medium" onClick={toggleIsEditingNow}>
						<Icon name="edit" size='large'/>
					</Button>
					<Button icon size="medium">
						<Icon name="trash alternate" size='large'/>
					</Button>
					<Button icon size="medium" onClick={handleOpenExamplesButton}>
						<Icon name={`chevron ${isExamplesOpen ? 'up' : 'down'}`} size='large'/>
					</Button>
				</Table.Cell>
			</Table.Row>
			{isExamplesOpen &&
				rowData.usageExamples.map((exampleRow) => (
					<Table.Row key={exampleRow.sentence}>
						<Table.Cell></Table.Cell>
						<Table.Cell>{exampleRow.sentence}</Table.Cell>
						<Table.Cell></Table.Cell>
						<Table.Cell>{exampleRow.translation}</Table.Cell>
					</Table.Row>
				))}
		</>
	);
};
