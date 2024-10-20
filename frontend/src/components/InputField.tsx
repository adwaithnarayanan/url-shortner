type InputFieldPropType = {
  type: "text" | "email" | "password" | "url";
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

const InputField = (inputParameters: InputFieldPropType) => {
  return (
    <input
      {...inputParameters}
      className="border mb-3 px-3 py-1 bg-transparent shadow-lg focus:outline-2 focus:outline-three w-full"
      required
    />
  );
};

export default InputField;
