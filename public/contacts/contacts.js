'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$http', function($scope, $http) {

  function getContacts() {
    $http.get('/api/contacts').then(res => {
    $scope.contacts = res.data;
    console.log(res.data);
    })
  }
  getContacts();

	// Show Add Form
	$scope.showAddForm = function(){
		$scope.addFormShow = true;
	}

	// Show Edit Form
	$scope.showEditForm = function(contact){
		$scope.editFormShow = true;

		$scope.id = contact._id;
		$scope.name	= contact.name;
		$scope.surname = contact.surname;
    $scope.age = contact.age;
		$scope.email = contact.email;
		$scope.gender	= contact.gender;

    console.log($scope.id)
	}

	// Hide Forms
	$scope.hide = function(){
		$scope.addFormShow = false;
		$scope.contactShow = false;
    $scope.editFormShow = false;
	}


  // Submit Contact
  $scope.addFormSubmit = function(){
	   console.log('Adding Contact...');

    // Assign Values
    const data = {
      id: $scope.id,
      name: $scope.name,
      surname: $scope.surname,
      age: $scope.age,
      email: $scope.email,
      gender: $scope.gender
    };

    $http.post('/api/contacts', data).then((res) => {
      getContacts();
    });


  	// Clear Form
  	clearFields();

  	// Hide Form
  	$scope.addFormShow = false;

  	// Send Message
  	$scope.msg = "Contact Added";
  }


	$scope.editFormSubmit = function(){
		console.log('Updating Contact...');

    // Assign Values
    const data = {
     id: $scope.id,
     name: $scope.name,
     surname: $scope.surname,
     age: $scope.age,
     email: $scope.email,
     gender: $scope.gender
    };

		// Get Record
		$http.post('/api/contact-update', data).then((res) => {
      getContacts();
    });

		clearFields();

		// Hide Form
		$scope.editFormShow = false;

		$scope.msg = "Contact Updated";
	}

	$scope.showContact = function(contact){
		console.log('Getting Contact...');

    $scope.id = contact._id;
		$scope.name	= contact.name;
		$scope.surname = contact.surname;
    $scope.age = contact.age;
		$scope.email = contact.email;
		$scope.gender	= contact.gender;

		$scope.contactShow = true;
	}


	$scope.removeContact = function(contact){
		console.log('Removing Contact');

		$http.post('/api/contact-delete', contact).then((res) => {
      getContacts();
    });

		$scope.msg=`Contact Removed. Bye-bye, ${contact.name}!`;

    setTimeout(() => {
      $scope.msg = '';
    }, 500);
	}

	// Clear $scope Fields
	function clearFields(){
		console.log('Clearing All Fields...');

		$scope.name = '';
		$scope.surname = '';
		$scope.age = '';
		$scope.email = '';
		$scope.gender = '';
	}

  //Terminate by age function
  //doesn't take into account when there are equal ages
  $scope.terminateByAge = () => {
    timer();
    $scope.sortByAge();

    //starts the countdown
    let countdown = setInterval(function() {
      setTimeout(() => {
        $scope.sortByAge();
      }, 500);

      let oldest = $scope.contacts[0];
      timer();

      $scope.contacts.forEach(contact => {
        if(contact.age > oldest.age) {
          oldest = contact;
        }
      })
      console.log(oldest);
      $scope.removeContact(oldest);
      if (!$scope.contacts) {
        clearInterval(countdown);
      }
    }, 120 * 1000);
  };

  //timer script

  function timer() {
    let countdown;
    let seconds = 120;
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    $scope.display = displayTimeLeft(seconds);

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft < 0) {
        clearInterval(countdown);
        return;
      }
        console.log($scope.display);
        $scope.display = displayTimeLeft(secondsLeft);
        $scope.$apply();
    }, 1000);
  }

  function displayTimeLeft(seconds) {
    const min = Math.floor(seconds/60);
    const remSec = seconds%60;
    return `${min}:${remSec < 10 ? '0' + remSec : remSec}`;
  }

  //sorting the contacts scope by age(desc)
  $scope.sortByAge = () => {
    $scope.contacts = $scope.contacts.sort(function(a, b) {
      return parseFloat(b.age) - parseFloat(a.age);
    });
  };

}]);
