export class Message {

    constructor(public subj?: string,
                public content?: string, 
                public email?: string,
                public name?: string,
                public last_name?: string,
                public date?: Date){}
}
