import styled from '@emotion/styled';
import DeleteIcon from './../assets/deleteIcon.svg?react';
import colors from '../styles/colors';

const StyleDeleteIcon = styled(DeleteIcon)`
	width: 30px;
	height: 30px;
	color: ${({ iscompleted }) =>
		iscompleted === 'true'
			? colors.button.primaryIcon
			: colors.button.primaryIconOff};
	border-radius: 50%;
	padding: 5px;

	&:hover {
		cursor: pointer;
		fill: ${colors.general.white};
		background-color: ${colors.button.primaryIcon};
	}
`;

export default function ButtonDelete({ onClick, isCompleted }) {
	return (
		<>
			<StyleDeleteIcon
				onClick={onClick}
				iscompleted={isCompleted.toString()}
			/>
		</>
	);
}
