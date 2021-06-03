var assert = chai.assert;
var expect = chai.expect;
describe('Election', function() {
  var theElection: Election;
  
  
    beforeEach(function() {
      theElection = new Election('')
    })
  
  
    describe('An empty election', function() {
      beforeEach(function() {
        theElection = new Election("New Zealand")
      })

      it('should have a listOfParties property', function() {
        assert.property(theElection, 'listOfParties')
      })

      it('should have an array for the listOfParties ', function() {
        assert.typeOf(theElection.listOfParties, 'array')
      })
      
      it('should have a party count of 0', function() {
        const count = theElection.partyCount;
        expect(count).to.equal(0)
      })
  
      it('should have a maxVotes value of 4', function() {
        const output = theElection.maxVotes;
        expect(output).to.equal(4)
      })
      
     it('should return a string saying it has 0 parties', function() {
        const output = theElection.toString()
        expect(output).to.equal("The Election has 0 parties:" + View.NEWLINE())
      })
    })

    describe('an election with one party', function() {
        beforeEach(function() {
          theElection.addParty('National', null)
        })
    
        it('should have a party count of 1', function() {
          const count = theElection.partyCount;
          expect(count).to.equal(1)
        })
        
        it('should have one entry in the listOfParties array', function() {
            const arraySize = theElection.listOfParties.length 
            expect(arraySize).to.equal(1)
        })
    
        it('should have a Party in the listOfParties array', function() {
          const aParty = theElection.listOfParties[0] 
          expect(aParty instanceof Party).to.equal(true)
        })
        
        it('should have a Party with name : National', function() {
          const aParty = theElection.listOfParties[0] 
          expect(aParty.partyName).to.equal('National')
        })

        describe('The National party: false', function() {
            var aParty : Party
            beforeEach(function() {
              aParty = theElection.listOfParties[0] 
            })
            it('should have a .partyName property', function() {
              expect(aParty.partyName).to.exist
            })      
            it('should have a .partyLogo property', function() {
              assert.property(aParty, 'partyLogo')
            })       
            it('should have a .voteFor property', function() {
              expect(aParty.voteFor).to.exist
            })  
            it('should have a .partyName of "National"', function() {
              var theValue = aParty.partyName
              expect(theValue).to.equal("National")
            })
            it('should have a .partyLogo of Null', function() {
                var theValue = aParty.partyLogo
                expect(theValue).to.equal(null)
              })              
            it('should have a .voteFor false', function() {
              var theValue = aParty.voteFor
              expect(theValue).to.equal(false)
            })   
           it('should return the correct String', function() {
              var theString = aParty.toString()
              expect(theString).to.equal('The National party: false')
            })  
            
        })
    })
    
    describe('an Election with 4 parties in it', function() {
        beforeEach(function() {
          theElection.addParty('Labour', null)
          theElection.addParty('Green', null)
          theElection.addParty('Active', null)
          theElection.addParty('Blue', null)
        })
    
        it('should have a Party count of 4', function() {
          const count = theElection.partyCount
          expect(count).to.equal(4)
        })
        
        it('should have three entries in the listOfParties array', function() {
          const arraySize = theElection.listOfParties.length 
          expect(arraySize).to.equal(4)
        })
    
        it('should return the right string', function() {
          const output = theElection.toString() 
          expect(output).to.equal('The Election has 4 parties:<br>&nbsp;&nbsp;&nbsp;&nbsp;The Active party: false<br>&nbsp;&nbsp;&nbsp;&nbsp;The Blue party: false<br>&nbsp;&nbsp;&nbsp;&nbsp;The Green party: false<br>&nbsp;&nbsp;&nbsp;&nbsp;The Labour party: false<br>')
        })
      })
      
      describe('an Election with 4 parties in it removing 1', function() {
        beforeEach(function() {
          theElection.addParty('Labour', null)
          theElection.addParty('Green', null)
          theElection.addParty('Active', null)
          theElection.addParty('Blue', null)
          theElection.hideParty('Green')
        })
    
        it('should have a Party count of 3', function() {
          const count = theElection.partyCount
          expect(count).to.equal(3)
        })
    
        it('should have a listOfParties length of 3', function() {
          const count = theElection.listOfParties.length
          expect(count).to.equal(3)
        })
      })

      describe('an Election with 1 vote', function() {
        beforeEach(function() {
          theElection.addParty('Labour', null)
          theElection.addParty('Green', null)
          theElection.addParty('Active', null)
          theElection.addParty('Blue', null)
          theElection.voteForParty('Labour')
        })
    
        it('Labour should have a .voteFor of true', function() {
          const aParty = theElection.findParty("Labour")
          assert.equal(aParty!.voteFor, true)
        })
    
        it('should have a .votedParties list with one party contained', function() {
          const count = theElection.votedParties.length
          assert.equal(count, 1)
        })
    
        it('the voted Parties should be just labour', function() {
          const aParty = theElection.findCurrentVotedParties()
          assert.equal(aParty[0].partyName, 'Labour')
        })
    
        
        it('should return the right string', function() {
          const output = theElection.toString() 
          expect(output).to.equal('The Election has 4 parties:<br>&nbsp;&nbsp;&nbsp;&nbsp;The Active party: false<br>&nbsp;&nbsp;&nbsp;&nbsp;The Blue party: false<br>&nbsp;&nbsp;&nbsp;&nbsp;The Green party: false<br>&nbsp;&nbsp;&nbsp;&nbsp;The Labour party: true<br>')
        })
      })
      describe('an Election with 1 vote then reverted', function() {
        beforeEach(function() {
          theElection.addParty('Labour', null)
          theElection.addParty('Green', null)
          theElection.addParty('Active', null)
          theElection.addParty('Blue', null)
          theElection.voteForParty('Labour')
          theElection.revertPartyVote();
        })
    
        it('should have a .votedParties list with no party contained', function() {
          const count = theElection.votedParties.length
          assert.equal(count, 0)
        })
    
        it('Labour should have a .voteFor of false', function() {
          const aParty = theElection.findParty("Labour")
          assert.equal(aParty!.voteFor, false)
        })
    
        it('should return the right string', function() {
          const output = theElection.toString() 
          expect(output).to.equal('The Election has 4 parties:<br>&nbsp;&nbsp;&nbsp;&nbsp;The Active party: false<br>&nbsp;&nbsp;&nbsp;&nbsp;The Blue party: false<br>&nbsp;&nbsp;&nbsp;&nbsp;The Green party: false<br>&nbsp;&nbsp;&nbsp;&nbsp;The Labour party: false<br>')
        })
      })

      describe('an Election with 4 votes reverting 2', function() {
        beforeEach(function() {
          theElection.addParty('Labour', null)
          theElection.addParty('Green', null)
          theElection.addParty('Active', null)
          theElection.addParty('Blue', null)
          theElection.voteForParty('Labour')
          theElection.voteForParty('Green')
          theElection.voteForParty('Active')
          theElection.voteForParty('Blue')
          theElection.revertPartyVote();
          theElection.revertPartyVote();
        })
    
        it('should have a .votedParties list with 2 parties contained', function() {
          const count = theElection.votedParties.length
          assert.equal(count, 2)
        })
    
        it('should have .voteFor of True for Labour, Green', function() {
          var aParty = theElection.findParty("Labour")
          expect(aParty).to.not.be.null;
          assert.equal(aParty!.voteFor, true)
          aParty = theElection.findParty("Green")
          assert.equal(aParty!.voteFor, true)
          aParty = theElection.findParty("Active")
          assert.equal(aParty!.voteFor, false)
          aParty = theElection.findParty("Blue")
          assert.equal(aParty!.voteFor, false)
        })
    
        it('should have .voteFor of False for Active and Blue', function() {
          var aParty = theElection.findParty("Active")
          assert.equal(aParty!.voteFor, false)
          aParty = theElection.findParty("Blue")
          assert.equal(aParty!.voteFor, false)
        })
      })

      describe('an Election with 6 votes(Max Votes of 4)', function() {
        beforeEach(function() {
          theElection.addParty('Labour', null)
          theElection.addParty('Green', null)
          theElection.addParty('Active', null)
          theElection.addParty('Blue', null)
          theElection.addParty('Devil', null)
          theElection.addParty('Morning', null)
          theElection.addParty('Constant', null)
          theElection.addParty('Excel', null)
          theElection.voteForParty('Labour')
          theElection.voteForParty('Green')
          theElection.voteForParty('Active')
          theElection.voteForParty('Blue')
          theElection.voteForParty('Constant')
          theElection.voteForParty('Excel')
        })
    
        it('should have a .votedParties list with 4 parties contained', function() {
          const count = theElection.votedParties.length
          assert.equal(count, 4)
        })
    
        it('should have .voteFor of True for Labour, Green, Active', function() {
          var aParty = theElection.findParty("Labour")
          assert.equal(aParty!.voteFor, true)
          aParty = theElection.findParty("Green")
          assert.equal(aParty!.voteFor, true)
          aParty = theElection.findParty("Active")
          assert.equal(aParty!.voteFor, true)
          aParty = theElection.findParty("Blue")
          assert.equal(aParty!.voteFor, true)
        })
      })
    
      describe('an Election with 2 of the same votes', function() {
        beforeEach(function() {
          theElection.addParty('Labour', null)
          theElection.addParty('Green', null)
          theElection.addParty('Active', null)
          theElection.voteForParty('Labour')
          theElection.voteForParty('Labour')
        })
    
        it('should have a .numberOfVotes count of 1', function() {
          const count = theElection.numberOfVotes
          assert.equal(count, 1)
        })
    
        it('should have a .votedParties list with 1 parties contained', function() {
          const count = theElection.votedParties.length
          assert.equal(count, 1)
        })
    
        it('should have .voteFor of True for Labour', function() {
          var aParty = theElection.findParty("Labour")
          assert.equal(aParty!.voteFor, true)
        })
      })
    
      describe('an Election with 2 of the same votes then a vote revert', function() {
        beforeEach(function() {
          theElection.addParty('Labour', null)
          theElection.addParty('Green', null)
          theElection.addParty('Active', null)
          theElection.voteForParty('Labour')
          theElection.voteForParty('Labour')
          theElection.revertPartyVote();
        })
    
        it('should have a .numberOfVotes count of 0', function() {
          const count = theElection.numberOfVotes
          assert.equal(count, 0)
        })
    
        it('should have a .votedParties list with 0 parties contained', function() {
          const count = theElection.votedParties.length
          assert.equal(count, 0)
        })
    
        it('should have .voteFor of False for Labour', function() {
          var aParty = theElection.findParty("Labour")
          assert.equal(aParty!.voteFor, false)
        })
      })
    
      describe('an Election with 2 votes should save to storage correctly', function() {
        beforeEach(function() {
          theElection.addParty('Labour', null)
          theElection.addParty('Green', null)
          theElection.addParty('Active', null)
          theElection.voteForParty('Labour')
          theElection.voteForParty('Green')
          theElection.localStore.save(theElection);
        })
    
        it('should have a localStorage of length 1', function() {
          const count = localStorage.length
          assert.equal(count, 1)
        })
      })
    
      describe('an Election with 2 votes then votes are reverted should load correctly', function() {
        beforeEach(function() {
          theElection.addParty('Labour', null)
          theElection.addParty('Green', null)
          theElection.addParty('Active', null)
          theElection.voteForParty('Labour')
          theElection.voteForParty('Green')
          theElection.localStore.save(theElection);
          theElection.revertPartyVote();
          theElection.revertPartyVote();
          theElection.load();
        })
    
        it('should have a votedParties of count 2', function() {
          const count = theElection.votedParties.length;
          assert.equal(count, 2)
        })
      })
    
      describe('Find Party', function() {
        beforeEach(function() {
          theElection.addParty('Labour', null)
        })
    
        it('should find the correct party', function() {
          const aParty = theElection.findParty('Labour')
          assert.equal(aParty!.partyName, 'Labour')
        })
    
        it('should find the correct party with a lowerCase partyName', function() {
          const aParty = theElection.findParty('labour')
          assert.equal(aParty!.partyName, 'Labour')
        })
    
        it('should find the correct party with a partial partyName. I.e La', function() {
          const aParty = theElection.findParty('la')
          assert.equal(aParty!.partyName, 'Labour')
        })
      })
    
      describe('an Election should return the correct WHOLE', function() {
        beforeEach(function() {
          theElection.addParty('Labour', null)
          theElection.addParty('Green', null)
          theElection.addParty('Active', null)
          theElection.voteForParty('Labour')
          theElection.voteForParty('Green')
          theElection.revertPartyVote();
          theElection.revertPartyVote();
        })
    
        it('should return the whole election', function() {
          const output = theElection;
          assert.equal(output, theElection.getElection())
        })
      })
    
})