import { useCallback, useState } from "react";
import { InputProps } from "../../components/Form/Input/models";
import { removeAllStrSpaces } from "../../utils/common";
import { ValidationItems, ValidationArrayItems, ValidationInitArrayItems } from "./validationTypes";
import { isValidForm } from "./validationUtils";

const init = (initValues: ValidationInitArrayItems) => {
	const keys: Array<ValidationItems["id"]> = Object.keys(initValues);
	const validationObj = keys.reduce<ValidationArrayItems>((acc, key) => {
		acc[key] = {
			id: key,
			name: key,
			value: initValues[key].defaultValue,
			wasTouched: false,
			isValid: {
				isValid: false,
				message: "Default Message",
			},
			validCheckFnList: initValues[key].validCheckFnList,
			compareTargetID: initValues[key].compareTargetID,
		};
		return acc;
	}, {});
	return validationObj;
};

const useFormValidation = (initValues: ValidationInitArrayItems) => {
	const [validationObj, setValidationObj] = useState<ValidationArrayItems>(init(initValues));
	const [isRequesting, setIsRequesting] = useState<boolean>(false);

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		const targetID = target.id;
		let eneteredInput = target.value;

		setValidationObj((prevObj) => {
			if (prevObj) {
				const targetObj = prevObj[targetID];
				if (targetObj.wasTouched) {
					return {
						...prevObj,
						[targetID]: {
							...targetObj,
							value: eneteredInput,
							isValid: isValidForm(
								targetObj.validCheckFnList,
								eneteredInput,
								targetObj.compareTargetID ? prevObj[targetObj.compareTargetID].value : undefined,
							),
						},
					};
				}
				return {
					...prevObj,
					[targetID]: {
						...targetObj,
						value: eneteredInput,
					},
				};
			} else return prevObj;
		});
	}, []);

	const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
		const target = event.target;
		const targetID = event.target.id;

		setValidationObj((prevObj) => {
			if (prevObj) {
				const targetObj = prevObj[targetID];
				let eneteredInput = targetObj.value;

				if (target.type === "email") {
					eneteredInput = removeAllStrSpaces(targetObj.value as string);
				}

				return {
					...prevObj,
					[targetID]: {
						...targetObj,
						value: eneteredInput,
						wasTouched: true,
						isValid: isValidForm(
							targetObj.validCheckFnList,
							eneteredInput,
							targetObj.compareTargetID ? prevObj[targetObj.compareTargetID].value : undefined,
						),
					},
				};
			} else return prevObj;
		});
	}, []);

	const handleSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>, callbackFunction: Function) => {
			event.preventDefault();
			const checkedValidList: Array<{ id: string; isValid: boolean }> = [];
			const newValidateObj = { ...validationObj };

			for (const key in newValidateObj) {
				const vObj = newValidateObj[key];
				vObj.wasTouched = true;
				vObj.isValid = isValidForm(
					vObj.validCheckFnList,
					vObj.value,
					vObj.compareTargetID ? newValidateObj[vObj.compareTargetID].value : undefined,
				);
				checkedValidList.push({ id: vObj.id, isValid: vObj.isValid.isValid });
			}

			const hasInvalidInput = checkedValidList.find(
				(checkedValid) => checkedValid.isValid === false,
			);
			if (hasInvalidInput) {
				const inputElement = document.getElementById(hasInvalidInput.id);
				inputElement?.focus();
			} else {
				callbackFunction();
			}

			setValidationObj(newValidateObj);
		},
		[validationObj],
	);

	const getValidationObj = (
		value: ValidationItems,
		showValidationFeedback: boolean = true,
	): InputProps => {
		if (value) {
			return {
				id: value.id,
				name: value.name,
				value: value.value,
				wasTouched: value.wasTouched,
				isValid: value.isValid.isValid,
				invalidFeedback: value.isValid.message,
				showValidationFeedback: showValidationFeedback,
				onChange: handleChange,
				onBlur: handleBlur,
			};
		} else return {};
	};

	// useEffect(() => {
	// 	console.log(validationObj);
	// }, [validationObj]);

	return {
		validationObj,
		setValidationObj,
		getValidationObj,
		handleSubmit,
		isRequesting,
		setIsRequesting,
	};
};

export default useFormValidation;
