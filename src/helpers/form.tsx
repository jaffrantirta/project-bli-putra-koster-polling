import React from "react";

export function useForm(initialState: any) {
  const [values, setValues] = React.useState(initialState);

  const setValue = (name: string, value: any) => {
    setValues((prevValues: any) => {
      const nameParts = name.split(".");

      const newValues = { ...prevValues };

      let nestedObject = newValues;
      for (let i = 0; i < nameParts.length - 1; i++) {
        const key = nameParts[i];
        if (!nestedObject[key]) {
          nestedObject[key] = {};
        }
        nestedObject = nestedObject[key];
      }

      nestedObject[nameParts[nameParts.length - 1]] = value;

      return newValues;
    });
  };

  const reset = () => {
    setValues(initialState);
  };

  const toFormData = (): FormData => {
    const formData = new FormData();

    const buildFormData = (data: any, parentKey?: string) => {
      if (
        data &&
        typeof data === "object" &&
        !(data instanceof Date) &&
        !(data instanceof File)
      ) {
        // If data is an object and not a Date or File, serialize it to JSON
        if (parentKey) {
          formData.append(parentKey, JSON.stringify(data));
        } else {
          // For the root level, iterate through keys to handle nested objects
          Object.keys(data).forEach((key) => {
            buildFormData(data[key], key);
          });
        }
      } else if (parentKey) {
        formData.append(parentKey, data);
      }
    };

    buildFormData(values);

    return formData;
  };

  return {
    values,
    setValue,
    reset,
    toFormData,
  };
}
