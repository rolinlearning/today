import styled from '@emotion/styled';
import EditIcon from './../assets/editIcon.svg?react';
import colors from '../styles/colors';

const StyleEditIcon = styled(EditIcon)`
	width: 30px;
	height: 30px;
	fill: ${colors.button.primaryIconOff};
	border-radius: 50%;
	padding: 5px;

	&:hover {
		cursor: ${(props) =>
			props.iscompleted === 'true' ? 'default' : 'pointer'};
		fill: ${({ iscompleted }) =>
			iscompleted === 'true' ? '' : colors.general.white};
		background-color: ${(props) =>
			props.iscompleted === 'true' ? '' : colors.button.primaryIcon};
	}
`;

export default function ButtonEdit({ onClick, isCompleted }) {
	return (
		<>
			<StyleEditIcon
				iscompleted={isCompleted.toString()}
				onClick={isCompleted ? undefined : onClick}
			/>
		</>
	);
}
