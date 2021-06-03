//Feature 1
    class Election {   
        electorateLocation;
        partyCount = 0;
        numberOfVotes;
        maxVotes = 4;
        listOfParties : Party[];
        votedParties : Party[];
        localStore : any;
        targetParty : any;
        //Feature 11
        constructor(location: string){
            this.electorateLocation = location
            this.listOfParties = [];
            this.votedParties = [];
            //Feature 13
            this.numberOfVotes = 0;
            this.maxVotes = 4;
            this.targetParty = null;
            this.localStore = new LocalStoring('electionAppJess')
            
        }
    
        //Feature 2
        addParty(name :string, logo: any){
            this.partyCount++;
            const newParty = new Party(name, logo);
            this.listOfParties.push(newParty);
        }
        //Feature 3
        sortParties () {
            this.listOfParties.sort(function (a, b) {
              if (a.partyName < b.partyName) {
                return -1
              }
              if (a.partyName > b.partyName) {
                return 1
              }
              // a must be equal to b
              return 0
            })
        }
        //Feature 14
        findParty(searchName: string){
            var string = searchName.charAt(0).toUpperCase() + searchName.slice(1);
            for(var i = 0; i < this.listOfParties.length; ++i) {
                //if the name is what we are looking for return it
                if (this.listOfParties[i].partyName === string || this.listOfParties[i].partyName.lastIndexOf(string, 0) == 0) {
                    
                    return this.listOfParties[i]!;
                }
            }
            return;
        }
    
        findPartiesInCurrentVotes(searchName: string){
            for(var i = 0; i < this.votedParties.length; ++i) {
                //if the name is what we are looking for return it
                if(this.votedParties[i].partyName === searchName)
                    return this.votedParties[i];
            }
            return;
        }
        //Feature 12
        //Feature 4
        findCurrentVotedParties(){
            return this.listOfParties.filter(party => party.voteFor);
        }
        //Feature 5
        hideParty(targetPartyName: string){
            const index = this.listOfParties.findIndex(party => party.partyName === targetPartyName)
            console.log(index);
            this.listOfParties.splice(index, 1)
            this.partyCount--;
        }
        //Feature 8
        voteForParty(targetPartyName: string){
            //Feature 10
            if(this.findPartiesInCurrentVotes(targetPartyName) == null){
                if(this.numberOfVotes < this.maxVotes){
                    this.targetParty = this.findParty(targetPartyName);
                    this.targetParty.voteFor = true;
                    this.votedParties.push(this.targetParty)
                    this.numberOfVotes++;
                    this.localStore.clear();
                    this.localStore.save(this);
                }
                console.log(this.checkIfCanVote())
            }        
        }
    
        //Feature 9
        revertPartyVote(){
                this.targetParty = this.votedParties.pop();
                this.targetParty.voteFor = false;
                this.numberOfVotes--;
        }
        //Feature 15
        getElection(){
            return this;
        }
    
        load(){
            this.votedParties = this.localStore.load();
            
        }
    
        checkIfCanVote(){
                return((this.numberOfVotes == this.maxVotes) ? "Max votes allowed!" : "Keep Voting")
            
        }
    
        toString(){
            this.sortParties()
            let result = `The Election has ${this.partyCount} parties:${View.NEWLINE()}`
            this.listOfParties.forEach(party => {
                result += View.TAB() + party + View.NEWLINE()
            });
            return result
        }    
    }
