export interface StepperItemType {
	label: () => string,
	position: number,
	isFinished: boolean,
	isActive: boolean,
	isLast: boolean,
	onclick?: () => void,
}
