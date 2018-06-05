import { Project } from './project';
import { Message } from './message';
export class ExportUser {
    constructor(
        public User_type: string,
        public First_name?: string,
        public Last_name?: string,
        public User_id?: string,
        public Email?: string,
        public Password?: string,
        public Birthday?: string,
        public English_First_name?: string,
        public English_Last_Name?: string,
        public Phone_number?: string,
        public Another_Phone_Number?: string,
        public Gender?: string,
        public City?: string,
        public Street?: string,
        public Appartment?: string,
        public School_name?: string,
        public School_city?: string,
        public Teacher?: string
    ) { }
}
