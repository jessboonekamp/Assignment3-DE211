class Party implements IParty{
    partyName: string
    partyLogo: null
    voteFor = false;
    showParty = true;
    
    constructor(name: string, logo: any){
        this.partyName = name;
        this.partyLogo = logo;
    }

    toString(): string{
        return "The " + this.partyName + " party: " + this.voteFor;
    }
}
