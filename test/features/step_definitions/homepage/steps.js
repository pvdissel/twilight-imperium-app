var support = require('../support');

var steps = function() {

  this.Given(/^I am on the homepage$/, function(callback) {
    support.get(this, 'http://localhost:9000', function(result){
      setTimeout(callback, 1000);
    });
  });

  this.Then(/^I should see a field to enter my name$/, function(callback) {
//  I should see a field to enter my name
    support.isElementPresentByClass(this, "ng-pristine", function(result){
      result.should.equal(true);
//	  expect(result);
      setTimeout(callback, 1000);
    });
  });

};

module.exports = steps;