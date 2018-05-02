export class User {
    constructor(
        public loggedIn: boolean,
        public type: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public password?: string,
        public birthday?: string,
        public engFname?: string,
        public engLname?: string,
        public uid?: string,
        public phone?: string,
        public anotherPhone?: string,
        public gender?: string,
        public city?: string,
        public street?: string,
        public appartment?: string,
        public schoolName?: string,
        public schoolCity?: string,
        public docId?: string
    ) { }
}
