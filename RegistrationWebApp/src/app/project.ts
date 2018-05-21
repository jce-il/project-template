import { FileUpload } from './fileupload';

export class Project {
    constructor(
        public user1mail?: string,
        public user2mail?: string,
        public user3mail?: string,
        public project_name?: string,
        public school_contact_mail?: string,
        public project_field?: string,
        public location?: string,
        public type?: string,
        public target?: string,
        public background?: string,
        public status?: string,
        public description?: string,
        public scope?: string,
        public inovetion?: string,
        public advantages?: string,
        public retrospective?: string,
        public project_file?: FileUpload,
        public recommendation_file?: FileUpload
    ) { }

}
