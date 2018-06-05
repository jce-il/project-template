import { FileUpload } from './fileupload';
import { Mentor } from './mentor';

export class ExportProject {
    constructor(
        public First_student_email?: string,
        public Second_student_email?: string,
        public Third_student_email?: string,
        public Project_name?: string,
        public School_representative_email?: string,
        public Field?: string,
        public Facility?: string,
        public Type?: string,
        public target?: string,
        public Background?: string,
        public Status?: string,
        public Description?: string,
        public Scope?: string,
        public Inovetion?: string,
        public Advantages?: string,
        public Retrospective?: string,
        public mentor1?: Mentor,
        public mentor2?: Mentor,
        public mentor3?: Mentor,
        public Checkers_email? : boolean,
        public Checker_comments? : string,
        public Research_status? : string,
        public Model_status? : string,
        public Products? : string,
    ) { }

}
