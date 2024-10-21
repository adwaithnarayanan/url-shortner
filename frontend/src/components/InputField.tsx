type InputFieldPropType = {
  type: "text" | "email" | "password" | "url";
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  name?: string;
  onBlur?: any;
  error?: string;
  touched?: boolean;
};

const InputField = ({
  error,
  touched,
  ...inputParameters
}: InputFieldPropType) => {
  return (
    <span className="w-full flex flex-col min-h-[55px] relative">
      <input
        {...inputParameters}
        className={`border px-3 py-1 bg-transparent shadow-lg focus:outline-2 focus:outline-three w-full rounded-sm ${
          error && touched && "border-red-500 "
        } `}
      />
      {error && touched && (
        <span className="abosulte text-red-700 text-xs w-full text-end bottom-0">
          {error}
        </span>
      )}
    </span>
  );
};

export default InputField;
