import { FieldValue } from "firebase/firestore";
import { FormSchema } from "../validations/form-validation";

export interface Credential extends FormSchema {
  user: string;
  createdAt: FieldValue;
}
