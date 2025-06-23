import type {StepperItemType} from "$lib/types/components/stepper/stepper";

export const newCustomerStepperItems: StepperItemType[] = [
	{
		position: 1,
		label: () => "Zákazník",
		isFinished: false,
		isActive: true,
		isLast: false,
	},
	{
		position: 2,
		label: () => "Doručovací adresa",
		isFinished: false,
		isActive: false,
		isLast: true,
	}
]
