export class AuthModel{
    constructor(
    private authToken:string,
    private tokenExpirationDate:Date,
    public userEmail:string,
    private userId:number,
    public userName:string,
    public level:number
    ){}
    
    
    get token() {
        if(!this.tokenExpirationDate && new Date()>this.tokenExpirationDate){
            return null;
        }
        return this.authToken;    
    }
    
}

