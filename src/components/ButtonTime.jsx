import styled from '@emotion/styled';
import colors from './../styles/colors';

const StyledButtonTime = styled.button`
	height: 40px;
	width: 100%;
	max-width: 130px;
	background-color: ${(props) =>
		props.isclicked
			? colors.button.secondaryIcon
			: colors.button.secondaryIconOff};
	color: ${(props) =>
		props.isclicked ? colors.text.primary : colors.text.secondary};
	border: none;
	border-radius: 20px;
	cursor: pointer;
	font-size: 14px;
	transition: background-color 0.4s ease;
	outline: none;

	&:hover {
		background-color: ${colors.button
			.primary}; /* Un efecto visual al pasar sobre el botón */
		color: ${colors.text
			.primary}; /* Texto en color primario al hacer hover */
	}

	@media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
		min-width: 90px;
		font-size: 13px;
		height: 38px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		min-width: 80px;
		font-size: 12px;
		height: 36px;
	}
`;

export default function ({
	isClicked,
	onClick,
	titleButton,
	handleViewChange,
}) {
	const handleClicked = () => {
		onClick();
		handleViewChange(titleButton === 'Hoy' ? 'today' : 'tomorrow');
	};
	return (
		<>
			<StyledButtonTime isclicked={isClicked} onClick={handleClicked}>
				{titleButton}
			</StyledButtonTime>
		</>
	);
}
