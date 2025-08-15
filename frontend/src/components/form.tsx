import type React from "react"

interface FormInput {
    value: string | File | undefined,
    setValue: (value: any) => void,
    type: string,
    text: string,
    required: boolean,
    disabled: boolean
}

export const FormComponent = (state: {
    handler: (e: React.FormEvent) => void,
    buttonName: string,
    inputs: FormInput[]
}) => {
    const handler = state.handler
    const inputs = state.inputs
    const buttonName = state.buttonName

    return (
        <form onSubmit={handler} className="space-y-4">
            {inputs.map((input, index) => (
                <div key={index}>
                    <label className="block text-gray-700 font-medium mb-1">
                        {input.text}
                    </label>
                    <input
                        type={input.type}
                        required={input.required}
                        disabled={input.disabled}
                        className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${input.disabled ? 'bg-gray-100' : ''}`}
                        value={input.type !== 'file' ? (input.value as string) : undefined}
                        onChange={(e) => {
                            if (input.type === 'file') {
                                input.setValue(e.target.files?.item(0) ?? undefined)
                            } else {
                                input.setValue(e.target.value)
                            }
                        }}
                    />
                </div>
            ))}


            <button
                type="submit"
                className="w-full bg-emerald-700 text-white py-2 rounded-lg font-semibold hover:bg-emerald-800 transition"
            >
                {buttonName}
            </button>
        </form>
    )
}