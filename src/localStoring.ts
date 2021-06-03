class LocalStoring {
    STORAGE_KEY : any

    constructor(key: any){
        this.STORAGE_KEY = key;
    }
    //Feature 6
    save(anElection: Election): void{
        try{
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(anElection.votedParties));
        }catch(error){
            console.log(error)
        }


    }
    //Feature 7
    load(): string | null{
        const loader = localStorage.getItem(this.STORAGE_KEY);
        return loader;
        
    }
    
    clear(): void{
        localStorage.clear();
    }
}