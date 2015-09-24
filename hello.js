if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.darkChecker.events({
    'click button': function () {
      new Audio('/start.mp3').play();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
