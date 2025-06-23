import type {StepperItemType} from "$lib/types/components/stepper/stepper";

export const newCustomerAddressStepperItems: StepperItemType[] = [
	{
		position: 1,
		label: () => "Zákazník",
		isFinished: true,
		isActive: false,
		isLast: false,
	},
	{
		position: 2,
		label: () => "Doručovací adresa",
		isFinished: false,
		isActive: true,
		isLast: true,
	}
]
