export class User {
    constructor(
        public type   : string,
        public firstName   : string,
        public lastName: string,
        public email: string,
        public password : string,
        public birthday : string,
        public engFname? : string,
        public engLname? : string
){}
}
