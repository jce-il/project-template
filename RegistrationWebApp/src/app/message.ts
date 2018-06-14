export class Message {

    constructor(public subj?: string,
                public content?: string,
                public date?: Date, 
                public email?: string,
                public name?: string,
                public last_name?: string){}
}
