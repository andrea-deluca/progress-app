import { yupSchema } from "solid-form-handler";
import * as yup from "yup";

interface Fields {
    name: string
}

const CreateSchema: yup.SchemaOf<Fields> = yup.object({
    name: yup.string().required('This field is required')
})

export default yupSchema(CreateSchema);